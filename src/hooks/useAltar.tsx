import { levelStore } from "@/stores/LevelStore";
import { playerStore } from "@/stores/PlayerStore";
import { windowStore } from "@/stores/WindowStore";
import { useCallback, useEffect, useState } from "react";
import { useStore } from "zustand";

export const useAltar = () => {
  const { player, inventory, toggleHasWon } = useStore(playerStore);
  const { items } = useStore(levelStore);
  const {
    toggleShowAHint,
    showAHint,
    toggleShowBHint,
    toggleShowStartHint,
    toggleShowXHint,
    toggleShowZHint,
  } = useStore(windowStore);
  const [canEndGame, setCanEndGame] = useState(false);

  useEffect(() => {
    if (inventory.tiles.filter((t) => t?.item?.name === "skull")) {
      const nextToAltar = items.some((i) => {
        const isAltar = i.name === "altar";
        if (!isAltar || !player) {
          return false;
        }
        const top = i.x === player.x && i.y === player.y - 1;
        const bottom = i.x === player.x && i.y === player.y + 1;
        const left = i.x === player.x - 1 && i.y === player.y;
        const right = i.x === player.x + 1 && i.y === player.y;
        if (top || bottom || left || right) {
          return true;
        }
      });
      if (!nextToAltar) {
        setCanEndGame(false);
        if (showAHint === "skull") toggleShowAHint("");
      } else {
        setCanEndGame(true);
        toggleShowAHint("skull");
      }
    }
  }, [inventory.items, player, items]);

  const handleEndGame = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "a") {
        if (canEndGame && showAHint) {
          toggleHasWon(true);
          if (showAHint === "skull") toggleShowAHint("");
        }
      }
    },
    [canEndGame, showAHint]
  );

  useEffect(() => {
    addEventListener("keyup", handleEndGame);
    return () => {
      removeEventListener("keyup", handleEndGame);
    };
  }, [handleEndGame]);
};
