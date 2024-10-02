import { Obtainable, Unobtainable } from "./Obtainable";
import { Room } from "./Room";

export type Cell = {
  x: number;
  y: number;
  isEdge?: boolean;
  isWall?: boolean;
  isObstacle?: boolean;
  isOutside?: boolean;
  isPath?: boolean;
  isCollapsed?: boolean;
  n: number;
  options?: string[];
  neighbours?: { top?: Cell; bottom?: Cell; left?: Cell; right?: Cell };
  isAccessible?: boolean;
  exit?: Room;
  skull?: boolean
  item?: Obtainable | Unobtainable
};
