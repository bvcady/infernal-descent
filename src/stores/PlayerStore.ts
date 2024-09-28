import { Cell } from "@/types/Cell";
import { Item } from "@/types/Item";
import { createStore } from "zustand";

type PlayerStoreState = { player?: Cell, items: Item[] }

type PlayerStoreActions = {
  setPlayer: (nextPosition: PlayerStoreState['player']) => void
}

type PlayerStore = PlayerStoreState & PlayerStoreActions

export const playerStore = createStore<PlayerStore>()((set) => ({
  player: undefined,
  items: [],
  setPlayer: (player) => {
    set({ player })
  },
}))