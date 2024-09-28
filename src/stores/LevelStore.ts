import { Cell } from "@/types/Cell";
import { createStore } from "zustand";

type LevelStoreState = {
  dimensions: { width: number; height: number };
  walls: Cell[];
  floorTiles: Cell[];
};

type LevelStoreActions = {
  setDimensions: (nextDimensions: LevelStoreState['dimensions']) => void;
  setWalls: (nextWalls: LevelStoreState["walls"]) => void;
  setFloorTiles: (nextFloorTiles: LevelStoreState["floorTiles"]) => void;
};

type LevelStore = LevelStoreState & LevelStoreActions;

export const levelStore = createStore<LevelStore>()((set) => ({
  dimensions: {width: 0, height: 0},
  walls: [],
  floorTiles: [],
  setDimensions: (dimensions) => {
    set({ dimensions });
  },
  setWalls: (walls) => {
    set({ walls });
  },
  setFloorTiles: (floorTiles) => {
    set({ floorTiles });
  },
}));
