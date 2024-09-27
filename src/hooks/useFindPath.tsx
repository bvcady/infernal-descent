import { Cell } from "@/types/Cell";
import Graph from "node-dijkstra";
import { useEffect, useState } from "react";

interface Props {
  startCell: { x: number; y: number };
  endCell: { x: number; y: number };
  grid: Cell[];
}

export const useFindPath = ({ startCell, endCell, grid = [] }: Props) => {
  const [path, setPath] = useState<string[]>([]);
  useEffect(() => {
    const route = new Graph();
    grid.forEach((item) => {
      const connections = new Map();
      const neighbours = [
        grid.find((g) => g.x === item.x && g.y === item.y - 1),
        grid.find((g) => g.x === item.x && g.y === item.y + 1),
        grid.find((g) => g.x === item.x - 1 && g.y === item.y),
        grid.find((g) => g.x === item.x + 1 && g.y === item.y),
      ]
        .filter((i) => !!i)
        .filter((i) => !i.isRock && !i.isOutside);

      neighbours?.forEach((n) => {
        const index = `${n.x} - ${n.y}`;
        connections.set(index, Math.pow(255 - n.n, 3));
      });

      const c = Object.fromEntries(connections);

      return route.addNode(`${item.x} - ${item.y}`, c);
    });

    setPath(
      route.path(
        `${startCell.x} - ${startCell.y}`,
        `${endCell.x} - ${endCell.y}`
      ) as string[]
    );
  }, [JSON.stringify(grid)]);

  return { path };
};
