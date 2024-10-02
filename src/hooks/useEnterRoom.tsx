import { levelStore } from "@/stores/LevelStore";
import { playerStore } from "@/stores/PlayerStore";
import { runStore } from "@/stores/RunStore";
import { useEffect } from "react";
import { useStore } from "zustand";

export const useEnterRoom = () => {
  const { player } = useStore(playerStore);
  const { updateRooms, rooms } = useStore(runStore);
  const { walls, items, tiles } = useStore(levelStore);

  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.key === "x") {
      if (player?.exit) {
        const nextRoom = [...rooms].find(
          (r) => r.x === player?.exit?.x && r.y === player?.exit.y
        );
        if (nextRoom) updateRooms(nextRoom, { walls, items, tiles });
      }
    }
  };

  useEffect(() => {
    addEventListener("keyup", handleKeyUp);
    return () => removeEventListener("keyup", handleKeyUp);
  }, [player]);
};
