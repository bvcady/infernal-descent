import { Cell } from "@/types/Cell";
import { Item } from "@/types/Item";

import { createStore } from "zustand";

type PlayerStoreState = {
  player?: Cell;
  inventory: {
    items: Item[];
    tiles: ({ tile: Cell; item?: Item; n: number } | undefined)[];
  };
  canMove: boolean;
  stats: {
    health: number;
    shards: number;
    steps: number;
  };
  futureTile?: {
    position: { x: number; y: number };
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
  addTile: (next: { tile: Cell; item?: Item; n?: number }) => boolean;
  removeTile: (
    n: number
  ) => { tile: Cell; item?: Item; n?: number } | undefined;
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
    tiles: new Array(8).fill(undefined),
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
  addTile: ({ tile, item, n }: { tile: Cell; item?: Item; n?: number }) => {
    if (n === undefined) {
      return false;
    }
    const prevInventory = playerStore.getState().inventory;

    if (prevInventory.tiles.some((t) => t?.n === n)) {
      return false;
    }

    set({
      inventory: {
        ...prevInventory,
        tiles: [...prevInventory.tiles, { tile, item, n }],
      },
    });
    return true;
  },
  setPlaceKeyIsDown: (input: boolean) => {
    return set({ placeKeyIsDown: input });
  },
  setDigKeyIsDown: (input: boolean) => {
    return set({ digKeyIsDown: input });
  },
  removeTile: (n: number) => {
    const previousTile = playerStore
      .getState()
      .inventory.tiles.find((t) => t?.n === n) as
      | { tile: Cell; item?: Item; n: number }
      | undefined;

    set((state) => {
      const prevInventory = state.inventory;
      if (!prevInventory.tiles.find((t) => t?.n === n)) {
        return state;
      }
      return {
        inventory: {
          ...prevInventory,
          tiles: prevInventory?.tiles?.filter((t) => t?.n !== n),
        },
      };
    });

    return previousTile;
  },
  setCanMove: (check: boolean) => {
    set({ canMove: check });
  },
  resetInventory: () => {
    set({ inventory: { items: [], tiles: [] } });
    set({ stats: { health: 6, shards: 5, steps: 0 } });
  },
  heal: (amount: number, over?: boolean) => {
    const stats = playerStore.getState().stats;
    const newVal = over
      ? stats.health + amount
      : Math.min(stats.health + amount, 6);

    return set({ stats: { ...stats, health: newVal } });
  },
  addStep: (amount: number) => {
    const stats = playerStore.getState().stats;
    return set({ stats: { ...stats, steps: stats.steps + amount } });
  },

  updateShards: (amount: number) => {
    const stats = playerStore.getState().stats;
    return set({ stats: { ...stats, shards: stats.shards + amount } });
  },
}));
