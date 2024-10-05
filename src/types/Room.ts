import { Cell } from "./Cell";

import { Item } from "./Item";

import { RoomRequirement } from "./RoomRequirement";

export type Room = {
  id: string;
  x: number;
  y: number;
  isCollapsed: boolean;
  size: number;
  neighbours: {
    top?: Room;
    bottom?: Room;
    left?: Room;
    right?: Room;
  };
  tbdNeighbours: (
    | { requirements?: RoomRequirement[]; forcedEntry?: RoomRequirement }
    | "to do"
  )[];
  isBossRoom?: boolean;
  tiles?: Cell[];
  walls?: Cell[];
  items?: Item[];
  hazards?: Cell[];
  isVisited?: boolean;
  maxExits: number;
  itemsToPlace: Item[];
  density?: number;
  emptiness?: number;
  entryRequirement?:
    | {
        requirements?: RoomRequirement[];
        forcedEntry?: RoomRequirement;
      }
    | "to do";
  opened?: boolean;
};
