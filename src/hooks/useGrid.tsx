import { Cell } from "@/types/Cell";
import { distanceFromCenter } from "@/utils/distanceFromCenter";
import { scale } from "@/utils/scale";
import Graph from "node-dijkstra";
import { useEffect, useState } from "react";

import { levelStore } from "@/stores/LevelStore";
import { runStore } from "@/stores/RunStore";
import { generateNoise, shuffle } from "@/utils/noise";
import Alea from "alea";
import { useStore } from "zustand";
import { createNoise2D } from "simplex-noise";

interface Props {
  seed?: string;
}

export const useGrid = ({ seed }: Props) => {
  const { setWalls, setFloorTiles, setDimensions } = useStore(levelStore);
  const { currentRoom } = useStore(runStore);

  const [start, setStart] = useState<Cell>();
  const [exit, setExit] = useState<Cell>();
  const [POI, setPOI] = useState<Cell>();

  const [hasFailure, setHasFailure] = useState(false);
  const [cells, setCells] = useState<Cell[]>([]);

  const currentSeed = `${seed} - ${currentRoom?.x} - ${currentRoom?.y}`;

  const resetGrid = () => {
    if (!currentRoom || !seed) {
      return;
    }
    const width = (currentRoom?.size + 1) * 10;
    const height = Math.floor(width * (9 / 16));

    const r = Alea(currentSeed);

    setDimensions({ width, height });

    const densityNoise = generateNoise({ random: r });

    const density = Math.floor(scale([0, 1], [0, 10])(densityNoise));

    setCells([]);

    const noise2D = createNoise2D(r);
    const fillableCells = new Array(height)
      .fill("")
      .map((_, y) =>
        new Array(width).fill("").map((_, x) => {
          const d = distanceFromCenter(x, y, width, height);

          const noisedVal = scale([-1, 1], [0, 1])(noise2D(x / 10, y / 10));
          // console.log({ d, noisedVal, line: height / 3 });
          const insideShape =
            d + scale([0, 1], [-height / 12, height / 12])(noisedVal) <
            (width < height ? width : height) / 3;

          return {
            x,
            y,
            isOutside: !insideShape,
            n: noisedVal,
            isCollapsed: !insideShape,
          };
        })
      )
      .flat();

    const insideCells = [...fillableCells]?.filter((c) => !c.isOutside);

    const rocks = [
      ...[...insideCells]
        .sort((a, b) => a.n - b.n)
        .splice(0, insideCells.length / 6),
      ...shuffle([...insideCells], r).splice(0, insideCells.length / 40),
    ];

    const roomCells = fillableCells.map((cell) => {
      if (cell.isOutside) {
        return { ...cell, isEdge: false, isRock: false };
      }

      const checkIfNeighbourIsOutside = () => {
        if (
          fillableCells.find((c) => c.x === cell.x && c.y === cell.y - 1)
            ?.isOutside
        ) {
          return true;
        }
        if (
          fillableCells.find((c) => c.x === cell.x && c.y === cell.y + 1)
            ?.isOutside
        ) {
          return true;
        }
        if (
          fillableCells.find((c) => c.x === cell.x + 1 && c.y === cell.y)
            ?.isOutside
        ) {
          return true;
        }
        if (
          fillableCells.find((c) => c.x === cell.x - 1 && c.y === cell.y)
            ?.isOutside
        ) {
          return true;
        }
        return false;
      };

      const containsRock = !!(rocks as Cell[]).find(
        (rock) => rock.x === cell.x && rock.y === cell.y
      );
      return {
        ...cell,
        isEdge: checkIfNeighbourIsOutside(),
        isRock: containsRock,
        isCollapsed: containsRock || cell.isCollapsed,
      };
    }) as Cell[];

    const edgeCells = [...roomCells]
      .filter((c) => c.isEdge)
      .sort((a, b) => b.n - a.n);

    const randomDirection = shuffle(["x", "y"], r);
    const randomSide = shuffle([-1, 1], r);

    const dirCombination = shuffle(
      randomDirection
        .map((dir) => {
          return randomSide.map((side) => {
            return { dir: dir as "x" | "y", side };
          });
        })
        .flat(),
      r
    );
    const startPosition = dirCombination[0];
    const endPosition = dirCombination[1];

    const startCell = edgeCells.sort(
      (a, b) =>
        startPosition.side * (a[startPosition.dir] - b[startPosition.dir])
    )[0];

    const exitCell = edgeCells.sort(
      (a, b) => endPosition.side * (a[endPosition.dir] - b[endPosition.dir])
    )[0];

    const nonEdgeCells = [...roomCells]
      .filter((c) => !c.isEdge && !c.isOutside && !c.isRock)
      .sort((a, b) => b.n - a.n);

    const poiCell =
      nonEdgeCells[
        Math.floor(
          scale(
            [0, 1],
            [0, nonEdgeCells.length - 1]
          )(generateNoise({ random: r }))
        )
      ];

    setStart(startCell);
    setExit(exitCell);

    const findPath = (route: Graph, endCell: Cell) => {
      return route.path(
        `${startCell.x} - ${startCell.y}`,
        `${endCell.x} - ${endCell.y}`
      ) as string[];
    };

    const makeGrid = (grid: Cell[]) => {
      const route = new Graph();
      grid.forEach((item) => {
        const connections = new Map();
        const neighbours = [
          grid.find((g) => g.x === item.x && g.y === item.y - 1),
          grid.find((g) => g.x === item.x && g.y === item.y + 1),
          grid.find((g) => g.x === item.x - 1 && g.y === item.y),
          grid.find((g) => g.x === item.x + 1 && g.y === item.y),
        ].filter((i) => !!i);
        // .filter((i) => !i.isOutside);

        neighbours?.forEach((n) => {
          const index = `${n.x} - ${n.y}`;
          connections.set(index, Math.pow(1 - (n.isOutside ? 0 : n.n), 3));
        });

        const c = Object.fromEntries(connections);

        return route.addNode(`${item.x} - ${item.y}`, c);
      });
      return route;
    };

    const grid = makeGrid(roomCells);

    const exitPath = findPath(grid, exitCell);
    const poiPath = findPath(grid, poiCell);

    if (poiPath?.length) setPOI(poiCell);

    const cellsWithPath = [...roomCells].map((cell) => {
      const containsPath =
        !!exitPath?.find((p) => p === `${cell.x} - ${cell.y}`) ||
        !!poiPath?.find((p) => p === `${cell.x} - ${cell.y}`);

      const isCollapsed = containsPath || cell.isCollapsed;

      return {
        ...cell,
        isPath: containsPath,
        isOutside: containsPath ? false : cell.isOutside,
        isRock: containsPath ? false : cell.isRock,
        isCollapsed,
      };
    });

    const finalCells = [...cellsWithPath];

    const options = [...cellsWithPath].filter((cell) => !cell.isCollapsed);

    while (options.length) {
      const current = [...options]?.[0];
      const optsIndex = options.findIndex(
        (opt) => opt.x === current.x && opt.y === current.y
      );
      const finalIndex = finalCells.findIndex(
        (opt) => opt.x === current.x && opt.y === current.y
      );

      const cellType =
        scale(
          [0, 1],
          [0, 100]
        )(
          generateNoise({
            random: r,
          })
        ) < density
          ? "rock"
          : "path";

      const dirs = {
        top: [...finalCells].find(
          (c) => c.x === current.x && c.y === current.y - 1 && !c.isOutside
        ),
        bottom: [...finalCells].find(
          (c) => c.x === current.x && c.y === current.y + 1 && !c.isOutside
        ),
        left: [...finalCells].find(
          (c) => c.x === current.x - 1 && c.y === current.y && !c.isOutside
        ),
        right: [...finalCells].find(
          (c) => c.x === current.x + 1 && c.y === current.y && !c.isOutside
        ),
      };

      const rockCount =
        (dirs.top?.isRock ? 1 : 0) +
        (dirs.bottom?.isRock ? 1 : 0) +
        (dirs.left?.isRock ? 1 : 0) +
        (dirs.right?.isRock ? 1 : 0);

      if (cellType === "rock") {
        current.isRock = true;
        // current.isOutside = false;
      } else {
        current.isRock = false;
        // current.isOutside = false;
        current.isPath = true;
        if (rockCount >= 0) {
          current.isLava = generateNoise({ random: r }) < 0.05;
        }
      }
      current.isCollapsed = true;
      finalCells[finalIndex] = current;

      options.splice(optsIndex, 1);
    }

    const cellNeighboursAnEdge = (cell: Cell, allCells: Cell[]) => {
      if (!cell.isOutside) {
        return false;
      }

      const dirs = {
        top: allCells.find(
          (c) => c.x === cell.x && c.y === cell.y - 2 && !c.isOutside
        ),
        bottom: allCells.find(
          (c) => c.x === cell.x && c.y === cell.y + 2 && !c.isOutside
        ),
        left: allCells.find(
          (c) => c.x === cell.x - 2 && c.y === cell.y && !c.isOutside
        ),
        right: allCells.find(
          (c) => c.x === cell.x + 2 && c.y === cell.y && !c.isOutside
        ),
      };
      if (dirs.top || dirs.bottom || dirs.left || dirs.right) {
        return true;
      }
      return false;
    };

    const cellsWithThickenedEdge = [...finalCells].map((cell) => {
      if (cellNeighboursAnEdge(cell, finalCells)) {
        return { ...cell, isRock: true, isOutside: false };
      }
      return cell;
    });

    const cellIsImportant = (cell: Cell) => {
      if (startCell.x === cell.x && startCell.y === cell.y) return true;
      if (exitCell.x === cell.x && exitCell.y === cell.y) return true;
      if (poiCell.x === cell.x && poiCell.y === cell.y) return true;
      return false;
    };

    const withEmptiedCells = [...cellsWithThickenedEdge].map((cell) => {
      const emptyPath =
        cell.isPath &&
        scale([0, 1], [0, 100])(generateNoise({ random: r })) < density * 2 &&
        !cellIsImportant(cell)
          ? true
          : cell.isOutside;
      return {
        ...cell,
        isOutside: emptyPath,
        isPath: cell.isPath ? !emptyPath : cell.isPath,
      };
    });

    const withNeighbours = [...withEmptiedCells].map((cell) => {
      return {
        ...cell,
        neighbours: {
          top: withEmptiedCells.find(
            (c) => c.x === cell.x && c.y === cell.y - 1
          ),
          bottom: withEmptiedCells.find(
            (c) => c.x === cell.x && c.y === cell.y + 1
          ),
          left: withEmptiedCells.find(
            (c) => c.x === cell.x - 1 && c.y === cell.y
          ),
          right: withEmptiedCells.find(
            (c) => c.x === cell.x + 1 && c.y === cell.y
          ),
        },
      };
    });

    setCells([...withNeighbours]);

    setHasFailure(false);
  };

  useEffect(() => {
    // at the start of a floor / level, first check if there is something stored in the localstorage for that seed-floor combination
    // then set the cells to the wall and floor cells from the storage (no need to include n-values and isComplete)
    resetGrid();
  }, [seed, currentRoom]);

  useEffect(() => {
    // set all walls to a state containing all the (immutable) wall cells;
    setWalls([...cells].filter((c) => c.isRock));
    // set all path (including those that contain items) to a state containing all the mutable floor tiles;
    setFloorTiles([...cells].filter((c) => c.isPath || c.isLava));
  }, [cells]);

  useEffect(() => {
    if (hasFailure === true) {
      console.log("had failure");
      setHasFailure(false);
      resetGrid();
    }
  }, [hasFailure]);

  return { trigger: resetGrid, cells, start, exit, POI };
};
