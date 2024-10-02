import { createStore } from "zustand";

type WindowStoreState = {
  hasLoaded: boolean;
  cellSize: number;
  showXHint: boolean;
  showZHint: boolean;
  showStartHint: boolean;
  showSelectHint: boolean;
};

type WindowStoreActions = {
  setCellSize: (nextPosition: WindowStoreState["cellSize"]) => void;
  setHasLoaded: (next: boolean) => void;
  toggleShowXHint: (nextShowHint: WindowStoreState["showXHint"]) => void;
  toggleShowZHint: (nextShowHint: WindowStoreState["showZHint"]) => void;
  toggleShowStartHint: (
    nextShowHint: WindowStoreState["showStartHint"]
  ) => void;
  toggleShowSelectHint: (
    nextShowHint: WindowStoreState["showSelectHint"]
  ) => void;
};

type WindowStore = WindowStoreState & WindowStoreActions;

export const windowStore = createStore<WindowStore>()((set) => ({
  hasLoaded: false,
  cellSize: 16,
  showXHint: false,
  showZHint: true,
  showStartHint: false,
  showSelectHint: false,
  setHasLoaded: (next: boolean) => {
    return set({hasLoaded: next})
  },
  toggleShowXHint: (next: boolean) => {
    return set({ showXHint: next });
  },
  toggleShowZHint: (next: boolean) => {
    return set({ showZHint: next });
  },
  toggleShowStartHint: (next: boolean) => {
    return set({ showStartHint: next });
  },
  toggleShowSelectHint: (next: boolean) => {
    return set({ showSelectHint: next });
  },
  setCellSize: (cellSize) => {
    set({ cellSize });
  },
}));
