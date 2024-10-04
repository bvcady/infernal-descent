import { Cell } from "@/types/Cell";
import { distanceFromCenter } from "@/utils/distanceFromCenter";
import { scale } from "@/utils/scale";
import Graph from "node-dijkstra";
import { useEffect, useState } from "react";

import { levelStore } from "@/stores/LevelStore";
import { playerStore } from "@/stores/PlayerStore";
import { runStore } from "@/stores/RunStore";
import { Room } from "@/types/Room";
import { generateNoise, shuffle } from "@/utils/noise";
import Alea from "alea";
import { createNoise2D } from "simplex-noise";
import { useStore } from "zustand";
import { hazardRubble } from "@/resources/hazards/Hazard";

interface Props {
  seed?: string;
}
type Direction = "top" | "bottom" | "left" | "right";

export const useGrid = ({ seed }: Props) => {
  const {
    // setters
    setDimensions,
    setTiles,
    setItems,
    setWalls,
    setExits: setExitCells,
  } = useStore(levelStore);

  const { currentRoom, previousRoom } = useStore(runStore);
  const { setPlayer } = useStore(playerStore);

  const [start, setStart] = useState<Cell>();
  const [exits, setExits] = useState<
    {
      cell: Cell;
      exit: Room | undefined;
      side: Direction;
    }[]
  >();
  const [POI, setPOI] = useState<Cell>();

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

    const density = currentRoom.density ?? 20;
    const emptiness = currentRoom.emptiness ?? 20;

    const noise2D = createNoise2D(r);
    const fillableCells = new Array(height)
      .fill("")
      .map((_, y) =>
        new Array(width).fill("").map((_, x) => {
          const d = distanceFromCenter(x, y, width, height);

          const noisedVal = scale([-1, 1], [0, 1])(noise2D(x / 10, y / 10));

          const insideShape =
            d + scale([0, 1], [-height / 12, height / 12])(noisedVal) <
            (width < height ? width : height) / 3;

          return {
            x,
            y,
            isOutside: !insideShape,
            isAccessible: !insideShape,
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
        return { ...cell };
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
        isWall: containsRock,
        isCollapsed: containsRock || cell.isCollapsed,
      };
    }) as Cell[];

    const edgeCells = [...roomCells]
      .filter((c) => c.isEdge)
      .sort((a, b) => b.n - a.n);

    const hasNeighbours =
      currentRoom?.neighbours !== undefined
        ? Object.keys(currentRoom.neighbours).filter((n) => !!n).length > 0
        : false;

    const exits = hasNeighbours
      ? (Object.keys(currentRoom.neighbours) as Direction[])
          .map((k) => {
            return {
              side: k,
              exit: currentRoom.neighbours[k],
              cell: {
                ...edgeCells.sort((a, b) => {
                  if (k === "top") {
                    return a.y - b.y;
                  }
                  if (k === "bottom") {
                    return b.y - a.y;
                  }
                  if (k === "right") {
                    return b.x - a.x;
                  }
                  if (k === "left") {
                    return a.x - b.x;
                  }
                  return 1;
                })[0],
                isAccessible: true,
                isCollapsed: true,
              },
            };
          })
          .filter((room) => room.exit)
      : [];

    const nonEdgeCells = [...roomCells]
      .filter((c) => !c.isEdge && !c.isOutside && !c.isWall)
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
    const poiId = roomCells.findIndex(
      (c) => c.x === poiCell.x && c.y === poiCell.y
    );

    roomCells[poiId] = {
      ...poiCell,
      item: currentRoom.itemsToPlace[0],
      isCollapsed: true,
      isPath: true,
      isOutside: false,
      isAccessible: true,
      isWall: false,
    };

    const findPath = (startCell: Cell, route: Graph, endCell: Cell) => {
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

    const allPaths = [...exits]
      .map((exit) =>
        [...exits].map((e) => findPath(exit.cell, grid, e.cell)).flat()
      )
      .flat();

    const poiPath = exits?.length ? findPath(exits[0].cell, grid, poiCell) : [];

    if (poiPath?.length) setPOI(poiCell);

    const cellsWithPath = [...roomCells].map((cell) => {
      if (
        exits.find((exit) => exit.cell.x === cell.x && exit.cell.y === cell.y)
      ) {
        return {
          ...cell,
          isPath: false,
          isCollapsed: true,
          isAccessible: true,
          isOutside: false,
          isWall: false,
        };
      }

      const containsPath =
        !!allPaths?.find((p) => p === `${cell.x} - ${cell.y}`) ||
        !!poiPath?.find((p) => p === `${cell.x} - ${cell.y}`);

      const isCollapsed = containsPath || cell.isCollapsed;

      return {
        ...cell,
        isPath: cell.isPath ?? containsPath,
        isOutside: containsPath ? false : cell.isOutside,
        isWall: containsPath || cell.item ? false : cell.isWall,
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
        (dirs.top?.isWall ? 1 : 0) +
        (dirs.bottom?.isWall ? 1 : 0) +
        (dirs.left?.isWall ? 1 : 0) +
        (dirs.right?.isWall ? 1 : 0);

      if (cellType === "rock") {
        current.isWall = true;
        // current.isOutside = false;
      } else {
        current.isWall = false;
        // current.isOutside = false;
        current.isPath = true;
        if (rockCount >= 0) {
          const shouldBeObstacle = generateNoise({ random: r }) < 0.05;
          current.isObstacle = shouldBeObstacle;
          current.item =
            current.item || shouldBeObstacle ? hazardRubble : undefined;
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

      const isClose = allCells
        ?.filter((c) => !c.isOutside)
        .some(
          (c) =>
            Math.sqrt(Math.pow(cell.x - c.x, 2) + Math.pow(cell.y - c.y, 2)) <
            3.5
        );

      return isClose;
    };

    const cellsWithThickenedEdge = [...finalCells].map((cell) => {
      if (cellNeighboursAnEdge(cell, finalCells)) {
        return { ...cell, isWall: true, isOutside: false };
      }
      return cell;
    });

    const cellIsImportant = (cell: Cell) => {
      if (
        exits.find((exit) => exit.cell.x === cell.x && exit.cell.y === cell.y)
      )
        return true;
      if (poiCell.x === cell.x && poiCell.y === cell.y) return true;
      return false;
    };

    const withEmptiedCells = [...cellsWithThickenedEdge]
      .map((cell) => {
        if (!cell.isPath) {
          return cell;
        }
        const distFromExit = (c: Cell) => {
          return exits.some((exit) => {
            const dist = Math.sqrt(
              Math.pow(exit.cell.x - c.x, 2) + Math.pow(exit.cell.y - c.y, 2)
            );

            return dist < 3.5 ? true : false;
          });
        };

        if (distFromExit(cell)) {
          return cell;
        }
        const emptyPath =
          cell.isPath &&
          scale([0, 1], [0, 100])(generateNoise({ random: r })) < emptiness &&
          !cellIsImportant(cell)
            ? true
            : cell.isOutside;
        return {
          ...cell,
          isOutside: emptyPath,
          isPath: cell.isPath ? !emptyPath : cell.isPath,
        };
      })
      .map((c) => {
        const possibleExit = exits.find(
          (e) => e.cell.x === c.x && e.cell.y === c.y
        );
        if (possibleExit) {
          return { ...c, exit: possibleExit.exit, isCollapsed: true };
        }
        return c;
      })
      .map((c) => {
        if (!c.isPath) {
          return c;
        }
        const isRightNextToExit = exits.some((exit) => {
          if (!exit?.exit?.isBossRoom) {
            return false;
          }
          const dist = Math.sqrt(
            Math.pow(exit.cell.x - c.x, 2) + Math.pow(exit.cell.y - c.y, 2)
          );

          return dist === 1 ? true : false;
        });
        if (isRightNextToExit) {
          return { ...c, skull: true };
        }
        return c;
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

    const exitsWithNeighbours = [...exits]
      .map((exit) => {
        const wn = withNeighbours.find(
          (c) => c.x === exit.cell.x && c.y === exit.cell.y
        );
        if (!wn) {
          return exit;
        }
        return {
          ...exit,
          cell: wn,
        };
      })
      .filter((c) => !!c);

    setExits(exitsWithNeighbours);

    if (!previousRoom) {
      setStart(
        shuffle(
          withNeighbours?.filter((n) => n.isPath),
          r
        )[0]
      );
    }
    if (previousRoom) {
      if (previousRoom.x < currentRoom.x) {
        setStart(
          exitsWithNeighbours.sort((a, b) => a.cell.x - b.cell.x)[0].cell
        );
      } else if (previousRoom.x > currentRoom.x) {
        setStart(
          exitsWithNeighbours.sort((a, b) => b.cell.x - a.cell.x)[0].cell
        );
      } else if (previousRoom.y < currentRoom.y) {
        setStart(
          exitsWithNeighbours.sort((a, b) => a.cell.y - b.cell.y)[0].cell
        );
      } else if (previousRoom.y > currentRoom.y) {
        setStart(
          exitsWithNeighbours.sort((a, b) => b.cell.y - a.cell.y)[0].cell
        );
      }
    }

    setCells([...withNeighbours]);
  };

  useEffect(() => {
    // at the start of a floor / level, first check if there is something stored in the localstorage for that seed-floor combination
    // then set the cells to the wall and floor cells from the storage (no need to include n-values and isComplete)

    if (currentRoom) resetGrid();
  }, [seed, currentRoom]);

  useEffect(() => {
    setWalls(currentRoom?.walls ?? [...cells].filter((c) => c.isWall));
    setTiles(
      currentRoom?.tiles ?? [...cells].filter((c) => c.isPath || c.isObstacle)
    );
    // @ts-expect-error Typemismatch while work in progress
    setItems(currentRoom?.items ?? [...cells.filter((c) => c.item)]);
    setExitCells((exits || [])?.map((exit) => exit.cell));

    setPlayer(start);
  }, [cells]);

  return { trigger: resetGrid, cells, start, exits, POI };
};
