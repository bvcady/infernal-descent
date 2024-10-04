import { levelStore } from "@/stores/LevelStore";
import { playerStore } from "@/stores/PlayerStore";
import { windowStore } from "@/stores/WindowStore";
import { Cell } from "@/types/Cell";
import { useCallback, useEffect, useState } from "react";
import { useStore } from "zustand";

export const useDig = () => {
  const { setTiles, tiles, items, setItems } = useStore(levelStore);
  const {
    inventory,
    player,
    addTile,
    placeKeyIsDown,
    digKeyIsDown,
    setDigKeyIsDown,
    targetDiggingTile,
    setTargetDiggingTile,
  } = useStore(playerStore);
  const { toggleShowZHint, showZHint } = useStore(windowStore);

  const [dirs, setDirs] = useState<{
    [key: string]: Cell | undefined;
  }>({
    top: undefined,
    bottom: undefined,
    left: undefined,
    right: undefined,
  });
  useEffect(() => {
    const top = player
      ? tiles.find((t) => t.x === player?.x && t.y === player?.y - 1)
      : undefined;
    const bottom = player
      ? tiles.find((t) => t.x === player?.x && t.y === player?.y + 1)
      : undefined;
    const left = player
      ? tiles.find((t) => t.x === player?.x - 1 && t.y === player?.y)
      : undefined;
    const right = player
      ? tiles.find((t) => t.x === player?.x + 1 && t.y === player?.y)
      : undefined;
    setDirs({ top, bottom, left, right });

    if (
      (top || bottom || left || right) &&
      inventory.items.some((item) => item.item.name === "shovel")
    ) {
      if (!showZHint) toggleShowZHint(true);
    } else {
      if (showZHint) {
        toggleShowZHint(false);
      }
    }
  }, [player, inventory, tiles]);

  const handleUpdateTiles = useCallback(() => {
    if (!targetDiggingTile) {
      return;
    }

    const foundTile = [...tiles].find(
      (t) => t.x === targetDiggingTile.x && t.y === targetDiggingTile.y
    );
    const foundItem = [...items].find(
      (i) => i.x === targetDiggingTile.x && i.y === targetDiggingTile.y
    );

    if (foundTile) {
      addTile({ tile: foundTile, item: foundItem });
      setTiles(
        tiles.filter((t) => !(t.x === foundTile.x && t.y === foundTile.y))
      );
      setItems(
        items.filter((i) => !(i.x === foundTile.x && i.y === foundTile.y))
      );
      setTargetDiggingTile(undefined);
      return setDigKeyIsDown(false);
    }
  }, [tiles, items, digKeyIsDown, targetDiggingTile]);

  const handleDig = useCallback(
    (e: KeyboardEvent) => {
      if (placeKeyIsDown) {
        return;
      }
      if (e.repeat || !(dirs.top || dirs.bottom || dirs.left || dirs.right)) {
        return;
      }

      //  Do nothing when no shovel
      if (!inventory.items.some((item) => item.item.name === "shovel")) {
        setTargetDiggingTile(undefined);
        return setDigKeyIsDown(false);
      }

      //  Handles canceling
      if ((e.key === "b" || e.key === "x") && digKeyIsDown) {
        setTargetDiggingTile(undefined);
        return setDigKeyIsDown(false);
      }

      // Handles starting the digging face by pressing z
      if (e.key === "z" && !digKeyIsDown) {
        return setDigKeyIsDown(true);
      }

      if (!digKeyIsDown) {
        return;
      }

      //  Handles confirming when pressin a
      if (e.key === "a" || e.key === "z") {
        if (!targetDiggingTile) {
          return setDigKeyIsDown(false);
        }
        if (targetDiggingTile) {
          return handleUpdateTiles();
        }
      }

      const { top, left, bottom, right } = dirs;

      if (e.key === "ArrowUp") {
        return setTargetDiggingTile(top ? { x: top.x, y: top.y } : undefined);
      }
      if (e.key === "ArrowDown") {
        return setTargetDiggingTile(
          bottom ? { x: bottom.x, y: bottom.y } : undefined
        );
      }
      if (e.key === "ArrowLeft") {
        return setTargetDiggingTile(
          left ? { x: left.x, y: left.y } : undefined
        );
      }
      if (e.key === "ArrowRight" && right) {
        return setTargetDiggingTile(
          right ? { x: right.x, y: right.y } : undefined
        );
      }
    },
    [
      tiles,
      player,
      inventory,
      items,
      tiles,
      placeKeyIsDown,
      dirs,
      digKeyIsDown,
      targetDiggingTile,
    ]
  );

  useEffect(() => {
    addEventListener("keyup", handleDig);
    return () => {
      removeEventListener("keyup", handleDig);
    };
  }, [handleDig]);
};
