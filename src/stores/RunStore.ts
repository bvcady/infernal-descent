import { Room } from "@/types/Room";
import { createStore } from "zustand";

type RunStoreState = {
  rooms: Room[];
  currentRoom?: Room;
  previousRoom?: Room;
};

type RunStoreActions = {
  setRooms: (nextRooms: RunStoreState["rooms"]) => void;
  setCurrentRoom: (nextCurrentRoom: RunStoreState["currentRoom"]) => void;
  updateRooms: (nextCurrentRoom: RunStoreState["currentRoom"]) => void;
};

type RunStore = RunStoreState & RunStoreActions;

export const runStore = createStore<RunStore>()((set) => ({
  rooms: [],
  setRooms: (rooms) => set({ rooms }),
  currentRoom: undefined,
  setCurrentRoom: (currentRoom) => set({ currentRoom }),
  previousRoom: undefined,
  updateRooms: (currentRoom) => {
    const oldRoom = runStore.getState().currentRoom;
    set({ previousRoom: oldRoom });
    set({ currentRoom });
  },
}));
