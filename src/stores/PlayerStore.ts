import { Cell } from "@/types/Cell";

import { createStore } from "zustand";

type PlayerStoreState = { player?: Cell, faces: KeyboardDirection};
export type KeyboardDirection =
  | "ArrowUp"
  | "ArrowDown"
  | "ArrowLeft"
  | "ArrowRight";

type PlayerStoreActions = {
  setPlayer: (nextPosition: PlayerStoreState["player"]) => void;
  moveInDirection: (direction: KeyboardDirection) => void;
};

type PlayerStore = PlayerStoreState & PlayerStoreActions;

export const playerStore = createStore<PlayerStore>()((set) => ({
  faces: "ArrowDown",
  player: undefined,
  setPlayer: (player) => {
    set({ player });
  },
  moveInDirection: (dir) => {
    const previousState = playerStore.getState().player;
    if (!previousState) {
      return;
    }
    set({faces: dir})
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
