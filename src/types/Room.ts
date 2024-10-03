import { Cell } from "./Cell";

import { Item } from "./Item";
import { ItemType } from "./Obtainable";
import { RoomRequirement } from "./RoomRequirement";

export type Room = {
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
  isBossRoom?: boolean;
  tiles?: Cell[];
  walls?: Cell[];
  items?: Item[];
  hazards?: Cell[];
  isVisited?: boolean;
  maxExits: number;
  itemsToPlace: ItemType[];
  hazardsToPlace: ItemType[];
  density?: number;
  emptiness?: number;
  entryRequirement?: RoomRequirement;
  opened?: boolean;
};
