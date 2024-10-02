import { Cell } from "@/types/Cell";

import { createStore } from "zustand";

type PlayerStoreState = { player?: Cell};


type PlayerStoreActions = {
  setPlayer: (nextPosition: PlayerStoreState["player"]) => void;
  moveInDirection: ( nextCell: Cell) => void;
};

type PlayerStore = PlayerStoreState & PlayerStoreActions;

export const playerStore = createStore<PlayerStore>()((set) => ({
  player: undefined,
  setPlayer: (player) => {
    set({ player });
  },
  moveInDirection: (nextCell) => {

    if (!nextCell) {
      return;
    }
    set({player: nextCell})
  },
}));
