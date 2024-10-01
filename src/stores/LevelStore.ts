import { Cell } from "@/types/Cell";
import { Item } from "@/types/Item";
import { createStore } from "zustand";

type LevelStoreState = {
  dimensions: { width: number; height: number };
  walls: Cell[];
  tiles: Cell[];
  items: Item[];
  exits: Cell[]
};

type LevelStoreActions = {
  setDimensions: (nextDimensions: LevelStoreState["dimensions"]) => void;
  setWalls: (nextWalls: LevelStoreState["walls"]) => void;
  setTiles: (nextTiles: LevelStoreState["tiles"]) => void;
  setItems: (nextItems: LevelStoreState["items"]) => void;
  setExits: (nextItems: LevelStoreState["exits"]) => void;
};

type LevelStore = LevelStoreState & LevelStoreActions;

export const levelStore = createStore<LevelStore>()((set) => ({
  dimensions: { width: 0, height: 0 },
  walls: [],
  tiles: [],
  items: [],
  exits: [],
  setDimensions: (dimensions) => {
    set({ dimensions });
  },
  setWalls: (walls) => {
    set({ walls });
  },
  setTiles: (tiles) => {
    set({ tiles });
  },
  setItems: (items) => {
    set({ items });
  },
  setExits: (exits) => {
    set({ exits});
  },
}));
