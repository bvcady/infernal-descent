import { Cell } from "@/types/Cell";
import { distanceFromCenter } from "@/utils/distanceFromCenter";
import { scale } from "@/utils/scale";
import { shuffle } from "@/utils/shuffle";
import Graph from "node-dijkstra";
import { useEffect, useState } from "react";
import { useNoise } from "./useNoise";

interface Props {
  width?: number;
  height?: number;
  seed?: string;
  density?: number;
}

const colorScale = scale([-1, 1], [0, 255]);

export const useGrid = ({ width, height, seed, density = 10 }: Props) => {
  const [start, setStart] = useState<Cell>();
  const [exit, setExit] = useState<Cell>();
  const [POI, setPOI] = useState<Cell>();
  const [loading, setLoading] = useState(false);
  const [hasFailure, setHasFailure] = useState(false);
  const [cells, setCells] = useState<Cell[]>([]);
  const { genericNoise } = useNoise({ seed });

  const resetGrid = () => {
    if (!width || !height || !seed) {
      return;
    }
    setLoading(true);
    setCells([]);
    const fillableCells = new Array(height)
      .fill("")
      .map((_, y) =>
        new Array(width).fill("").map((_, x) => {
          const d = distanceFromCenter(x, y, width, height);
          // const insideShape = d < (width < height ? width : height) / 3;
          const insideShape =
            d +
              scale(
                [-1, 1],
                [-height / 12, height / 12]
              )(genericNoise(x / 12, y / 12, 0.2) || 0) <
            (width < height ? width : height) / 3;

          const noiseColor = Math.floor(
            colorScale(genericNoise?.(x / width, y / height) || 0)
          );

          return {
            x,
            y,
            isOutside: !insideShape,
            n: noiseColor,
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
      ...shuffle([...insideCells]).splice(0, insideCells.length / 40),
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

    const randomDirection = shuffle(["x", "y"]);
    const randomSide = shuffle([-1, 1]);

    const dirCombination = shuffle(
      randomDirection
        .map((dir) => {
          return randomSide.map((side) => {
            return { dir: dir as "x" | "y", side };
          });
        })
        .flat()
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
      nonEdgeCells[Math.floor(Math.random() * (nonEdgeCells.length - 1))];

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
          connections.set(index, Math.pow(255 - (n.isOutside ? 0 : n.n), 3));
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

      const options = isCollapsed
        ? []
        : ([
            ...new Array(density).fill("rock"),
            ...new Array(30 - density).fill("path"),
          ] as string[]);

      return {
        ...cell,
        isPath: containsPath,
        isOutside: containsPath ? false : cell.isOutside,
        isRock: containsPath ? false : cell.isRock,
        isCollapsed,
        options,
        entropy: options.length,
      };
    });

    const finalCells = [...cellsWithPath];
    const options = [...cellsWithPath].filter((cell) => !cell.isCollapsed);

    while (options.length) {
      const current = [...options].sort((a, b) => b.entropy - a.entropy)?.[0];
      const optsIndex = options.findIndex(
        (opt) => opt.x === current.x && opt.y === current.y
      );
      const finalIndex = finalCells.findIndex(
        (opt) => opt.x === current.x && opt.y === current.y
      );
      const cellType = shuffle(current.options)[0];

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
      } else if (rockCount >= 0) {
        if (scale([0, 1], [0, rockCount])(Math.random()) > 0.8) {
          current.isLava = true;
          current.isPath = true;
        } else {
          current.isPath = true;
        }
      }
      current.isCollapsed = true;
      current.options = [];

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
        cell.isPath && Math.random() < 0.05 && !cellIsImportant(cell)
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
    setLoading(false);
    setHasFailure(false);
  };

  useEffect(() => {
    resetGrid();
  }, [width, height, seed]);

  useEffect(() => {
    if (hasFailure === true) {
      console.log("had failure");
      setHasFailure(false);
      resetGrid();
    }
  }, [hasFailure]);

  return { trigger: resetGrid, cells, loading, start, exit, POI };
};
