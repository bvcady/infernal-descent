import { levelStore } from "@/stores/LevelStore";
import { playerStore } from "@/stores/PlayerStore";
import { windowStore } from "@/stores/WindowStore";
import { useCallback, useEffect } from "react";
import { useStore } from "zustand";

export const useDig = () => {
  const { setTiles, tiles, items, setItems } = useStore(levelStore);
  const { inventory, player, addTile, setCanMove } = useStore(playerStore);
  const { toggleShowZHint, showZHint } = useStore(windowStore);

  useEffect(() => {
    if (
      tiles.some((t) => t.x === player?.x && t.y === player?.y) &&
      inventory.items.some((item) => item.item.name === "shovel")
    ) {
      if (!showZHint) toggleShowZHint(true);
    } else {
      if (showZHint) {
        toggleShowZHint(false);
      }
    }
  }, [player, inventory, tiles]);

  const handleDig = useCallback(
    (e: KeyboardEvent) => {
      const currentTile = tiles.find(
        (t) => t.x === player?.x && t.y === player.y
      );
      if (e.repeat || !currentTile || e.key !== "z") {
        console.log(e);
        return setCanMove(true);
      }
      if (inventory.items.some((item) => item.item.name === "shovel")) {
        console.log("has digged");
        addTile({
          tile: currentTile,
          item: items.find(
            (i) => i.x === currentTile.x && i.y === currentTile.y
          ),
        });
        setTiles(
          tiles.filter((t) => !(t.x === currentTile.x && t.y === currentTile.y))
        );
        setItems(
          items.filter((i) => !(i.x === currentTile.x && i.y === currentTile.y))
        );
      }
      setCanMove(true);
    },
    [tiles, player, inventory, items, tiles]
  );

  const handleStartDigging = useCallback(
    (e: KeyboardEvent) => {
      if (e.repeat || e.key !== "z") {
        return;
      }
      if (inventory.items.some((item) => item.item.name === "shovel")) {
        console.log("start digging");
        return setCanMove(false);
      }
    },
    [inventory, setCanMove]
  );

  useEffect(() => {
    addEventListener("keydown", handleStartDigging);
    addEventListener("keyup", handleDig);

    return () => {
      removeEventListener("keyup", handleDig);
      removeEventListener("keydown", handleStartDigging);
    };
  }, [handleStartDigging, handleDig]);
};
