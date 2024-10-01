import { Cell } from "@/types/Cell";
import { Item } from "@/types/Item";
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
  setPreviousRoom: (nextPreviousRoom: RunStoreState["previousRoom"]) => void;
  updateRooms: (
    nextCurrentRoom: RunStoreState["currentRoom"],
    { walls, tiles, items }: { walls: Cell[]; tiles: Cell[]; items: Item[] }
  ) => void;
};

type RunStore = RunStoreState & RunStoreActions;

export const runStore = createStore<RunStore>()((set) => ({
  rooms: [],
  setRooms: (rooms) => set({ rooms }),
  currentRoom: undefined,
  setCurrentRoom: (currentRoom) => set({ currentRoom }),
  previousRoom: undefined,
  setPreviousRoom: (previousRoom) => set({ previousRoom }),
  updateRooms: (currentRoom, { walls, tiles, items }) => {
    const oldRooms = [...runStore.getState().rooms];
    const oldRoom = runStore.getState().currentRoom;

    const id = oldRooms.findIndex(
      (r) => r.x === oldRoom?.x && r.y === oldRoom?.y
    );
    
    if (oldRoom) {
      oldRooms[id] = { ...oldRoom, walls, tiles, items };
    }

    set({ previousRoom: oldRoom });
    set({ rooms: oldRooms });
    set({ currentRoom });
  },
}));
