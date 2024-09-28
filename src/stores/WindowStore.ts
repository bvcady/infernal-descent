import { createStore } from "zustand";

type WindowStoreState = { cellSize: number }

type WindowStoreActions = {
  setCellSize: (nextPosition: WindowStoreState['cellSize']) => void
}

type WindowStore = WindowStoreState & WindowStoreActions

export const windowStore = createStore<WindowStore>()((set) => ({
  cellSize: 16,
  setCellSize: (cellSize) => {
    set({ cellSize })
  },
}))