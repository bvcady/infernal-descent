import { Cell } from "@/types/Cell";
import { Hazard } from "@/types/Hazard";
import { Item } from "@/types/Item";

import { createStore } from "zustand";

type PlayerStoreState = {
  player?: Cell;
  inventory: {
    items: Item[];
    tiles: { tile: Cell; item?: Item; hazard?: Hazard }[];
  };
  canMove: boolean;
  stats: {
    health: number;
    shards: number;
    steps: number;
  };
  futureTile?: {
    position: { x: number; y: number };
    tile?: Cell;
    item?: Item;
    hazard?: Hazard;
  };
  digKeyIsDown: boolean,
  placeKeyIsDown: boolean;
  targetDiggingTile?: {x: number, y: number}
};

type PlayerStoreActions = {
  setPlaceKeyIsDown: (input: boolean) => void;
  setDigKeyIsDown: (input: boolean) => void;
  removeItem: (item: Item) => void;
  addItem: (item: Item) => void;
  addTile: (next: { tile: Cell; item?: Item; hazard?: Hazard }) => void;
  removeTile: (next: { tile: Cell; item?: Item; hazard?: Hazard }) => void;
  setPlayer: (nextPosition: PlayerStoreState["player"]) => void;
  moveInDirection: (nextCell: Cell) => void;
  setCanMove: (check: boolean) => void;
  resetInventory: () => void;
  setFutureTile: (ft?: {
    position: { x: number; y: number };
    tile?: Cell;
    item?: Item;
    hazard?: Hazard;
  }) => void;
  setTargetDiggingTile: (tar?: {x: number, y: number}) => void;
};

type PlayerStore = PlayerStoreState & PlayerStoreActions;

export const playerStore = createStore<PlayerStore>()((set) => ({
  digKeyIsDown: false,
  placeKeyIsDown: false,
  stats: { health: 6, steps: 0, shards: 0 },
  canMove: true,
  targetDiggingTile: undefined,
  setTargetDiggingTile: (tar) => {
    set({targetDiggingTile: tar})
  },
  futureTile: undefined,
  setFutureTile: (newTile) => {
    set({ futureTile: newTile });
  },
  inventory: {
    items: [
      {
        item: {
          name: "shard",
          type: "Obtainable",
          canShovel: true,
          value: 1,
          rarity: 0,
        },
      },
    ],
    tiles: [],
  },
  player: undefined,
  setPlayer: (player) => {
    set({ player });
  },
  moveInDirection: (nextCell) => {
    if (!nextCell) {
      return;
    }
    set({
      stats: {
        ...playerStore.getState().stats,
        steps: playerStore.getState().stats.steps + 1,
      },
    });
    set({ player: nextCell });
  },
  removeItem: (item: Item) => {
    const prevInventory = playerStore.getState().inventory;
    set({
      inventory: {
        ...prevInventory,
        items: prevInventory.items?.filter(
          (_item) => _item.x !== item.x && _item.y !== item.y
        ),
      },
    });
  },
  addItem: (item: Item) => {
    const prevInventory = playerStore.getState().inventory;
    set({
      inventory: {
        ...prevInventory,
        items: [...prevInventory.items, item],
      },
    });
  },
  addTile: ({
    tile,
    item,
    hazard,
  }: {
    tile: Cell;
    item?: Item;
    hazard?: Hazard;
  }) => {
    const prevInventory = playerStore.getState().inventory;
    set({
      inventory: {
        ...prevInventory,
        tiles: [...prevInventory.tiles, { tile, item, hazard }],
      },
    });
  },
  setPlaceKeyIsDown: (input: boolean) => {
    return set({ placeKeyIsDown: input });
  },
  setDigKeyIsDown: (input: boolean) => {
    return set({ digKeyIsDown: input });
  },
  removeTile: (tile: { tile: Cell; item?: Item; hazard?: Hazard }) => {
    console.log({tile})
    const prevInventory = playerStore.getState().inventory;
    set({
      inventory: {
        ...prevInventory,
        tiles: prevInventory?.tiles?.filter(
          (t) => !(tile.tile.x === t.tile.x && tile.tile.y === t.tile.y )
        ),
      },
    });
  },
  setCanMove: (check: boolean) => {
    set({ canMove: check });
  },
  resetInventory: () => {
    set({ inventory: { items: [], tiles: [] } });
  },
}));
