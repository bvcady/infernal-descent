import { Cell } from "@/types/Cell";
import { Item } from "@/types/Item";
import { createStore } from "zustand";

type PlayerStoreState = { player?: Cell; items: Item[] };
export type KeyboardDirection = "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight";

type PlayerStoreActions = {
  setPlayer: (nextPosition: PlayerStoreState["player"]) => void;
  moveInDirection: (direction: KeyboardDirection) => void;
};

type PlayerStore = PlayerStoreState & PlayerStoreActions;

export const playerStore = createStore<PlayerStore>()((set) => ({
  player: undefined,
  items: [],
  setPlayer: (player) => {
    set({ player });
  },
  moveInDirection: (dir) => {
    const previousState = playerStore.getState().player;
    if (!previousState) {
      return;
    }
    if (dir === "ArrowUp") {
      set({ player: { ...previousState, y: previousState?.y - 1 } });
    }
    if (dir === "ArrowDown") {
      set({ player: { ...previousState, y: previousState?.y + 1 } });
    }
    if (dir === "ArrowLeft") {
      set({ player: { ...previousState, y: previousState?.x - 1 } });
    }
    if (dir === "ArrowRight") {
      set({ player: { ...previousState, y: previousState?.x + 1 } });
    }
  },
}));
