import { createStore } from "zustand";

type WindowStoreState = {
  hasLoaded: boolean;
  cellSize: number;
  showXHint: boolean;
  showZHint: boolean;
  showStartHint: boolean;
  showSelectHint: boolean;
  volume: number;
};

type WindowStoreActions = {
  setVolume: (nextVolume: number) => void;
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
  volume: 0.5,
  setVolume: (num: number) => {
    if (num > 1) {
      return set({ volume: 1 });
    }
    if (num < 0) {
      return set({ volume: 0 });
    }
    set({ volume: num });
  },
  setHasLoaded: (next: boolean) => {
    return set({ hasLoaded: next });
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
