import { Cell } from "@/types/Cell";
import { Item } from "@/types/Item";

import { createStore } from "zustand";

type PlayerStoreState = {
  player?: Cell;
  inventory: {
    items: Item[];
    tiles: { tile: Cell; item?: Item }[];
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
  };
  digKeyIsDown: boolean;
  placeKeyIsDown: boolean;
  targetDiggingTile?: { x: number; y: number };
};

type PlayerStoreActions = {
  heal: (input: number, over?: boolean) => void;
  updateShards: (input: number) => void;
  addStep: (input: number) => void;
  setPlaceKeyIsDown: (input: boolean) => void;
  setDigKeyIsDown: (input: boolean) => void;
  removeItem: (item: Item) => void;
  addItem: (item: Item) => void;
  addTile: (next: { tile: Cell; item?: Item }) => void;
  removeTile: (next: { tile: Cell; item?: Item }) => void;
  setPlayer: (nextPosition: PlayerStoreState["player"]) => void;
  moveInDirection: (nextCell: Cell) => void;
  setCanMove: (check: boolean) => void;
  resetInventory: () => void;
  setFutureTile: (ft?: {
    position: { x: number; y: number };
    tile?: Cell;
    item?: Item;
  }) => void;
  setTargetDiggingTile: (tar?: { x: number; y: number }) => void;
};

type PlayerStore = PlayerStoreState & PlayerStoreActions;

export const playerStore = createStore<PlayerStore>()((set) => ({
  digKeyIsDown: false,
  placeKeyIsDown: false,
  stats: { health: 6, steps: 0, shards: 5 },
  canMove: true,
  targetDiggingTile: undefined,
  setTargetDiggingTile: (tar) => {
    set({ targetDiggingTile: tar });
  },
  futureTile: undefined,
  setFutureTile: (newTile) => {
    set({ futureTile: newTile });
  },
  inventory: {
    items: [],
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
  }: {
    tile: Cell;
    item?: Item;
  }) => {
    const prevInventory = playerStore.getState().inventory;
    set({
      inventory: {
        ...prevInventory,
        tiles: [...prevInventory.tiles, { tile, item }],
      },
    });
  },
  setPlaceKeyIsDown: (input: boolean) => {
    return set({ placeKeyIsDown: input });
  },
  setDigKeyIsDown: (input: boolean) => {
    return set({ digKeyIsDown: input });
  },
  removeTile: (tile: { tile: Cell; item?: Item }) => {
    const prevInventory = playerStore.getState().inventory;
    set({
      inventory: {
        ...prevInventory,
        tiles: prevInventory?.tiles?.filter(
          (t) => !(tile.tile.x === t.tile.x && tile.tile.y === t.tile.y)
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
  heal: (amount: number, over?: boolean) => {
    const stats = playerStore.getState().stats;
    const newVal = over ? stats.health + amount : Math.min(stats.health + amount, 6);

    return set({stats: {...stats, health: newVal}})
  },
  addStep: (amount: number) => {
    const stats = playerStore.getState().stats;
    return set({stats: {...stats, steps: stats.steps + amount}})
  },
  
  updateShards:(amount: number)=> {
    const stats = playerStore.getState().stats;
    return set({stats: {...stats, shards: stats.shards + amount}})
  }
}));
