import { Cell } from "./Cell";
import { Item } from "./Item";
import { Obtainable, Unobtainable } from "./Obtainable";

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
  hazards?: Cell[],
  isVisited?: boolean
  maxExits: number  
  itemsToPlace: (Obtainable | Unobtainable)[]
  hazardsToPlace: Unobtainable[] ,
  density?: number,
  emptiness?: number,
  entryRequirement?: (Obtainable | Unobtainable) []
  opened?: boolean
};
