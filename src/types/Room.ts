import { Cell } from "./Cell";
import { Item } from "./Item";

export type Room = {
  x: number;
  y: number;
  isCollapsed: boolean;
  size: number;
  neighbours: { top?: Room; bottom?: Room; left?: Room; right?: Room };
  isBossRoom?: boolean, 
  tiles?: Cell[]
  walls?: Cell[]
  items?: Item[]
  isVisited?: boolean
};
