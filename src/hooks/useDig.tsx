import { levelStore } from "@/stores/LevelStore";
import { playerStore } from "@/stores/PlayerStore";
import { windowStore } from "@/stores/WindowStore";
import { useCallback, useEffect, useState } from "react";
import { useStore } from "zustand";

export const useDig = () => {
  const { setTiles, tiles, items, setItems } = useStore(levelStore);
  const {
    inventory,
    player,
    addTile,
    setCanMove,
    placeKeyIsDown,
    digKeyIsDown,
    setDigKeyIsDown,
    targetDiggingTile,
    setTargetDiggingTile,
  } = useStore(playerStore);
  const { toggleShowZHint, showZHint } = useStore(windowStore);

  const top = player
    ? tiles.find((t) => t.x === player?.x && t.y === player?.y - 1)
    : null;
  const bottom = player
    ? tiles.find((t) => t.x === player?.x && t.y === player?.y + 1)
    : false;
  const left = player
    ? tiles.find((t) => t.x === player?.x - 1 && t.y === player?.y)
    : null;
  const right = player
    ? tiles.find((t) => t.x === player?.x + 1 && t.y === player?.y)
    : null;

  useEffect(() => {
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
  }, [player, inventory, tiles, top, bottom, left, right]);

  useEffect(() => {
    if (targetDiggingTile) console.log({ targetDiggingTile });
  }, [targetDiggingTile]);

  const handleDig = useCallback(
    (e: KeyboardEvent) => {
      console.log("A key was pressed");
      if (e.repeat || !(top || bottom || left || right) || placeKeyIsDown) {
        console.log("No surrounding tile or is placing");
        return;
      }
      if (!inventory.items.some((item) => item.item.name === "shovel")) {
        console.log("No shovel");
        return setDigKeyIsDown(false);
      }

      if (e.key === "b") {
        setCanMove(true);
        setTargetDiggingTile(undefined);
        return setDigKeyIsDown(false);
      }

      if (e.key === "z") {
        console.log("Z was pressed");
        if (!digKeyIsDown) {
          console.log("Start digging...");
          setDigKeyIsDown(true);
          return setCanMove(false);
        }
        if (!targetDiggingTile) {
          console.log("Stopped digging...");
          setCanMove(true);
          return setDigKeyIsDown(false);
        }
        if (targetDiggingTile) {
          console.log("Diggin tile at ", targetDiggingTile);
          const foundTile = tiles.find(
            (t) => t.x === targetDiggingTile.x && t.y === targetDiggingTile.y
          );
          const foundItem = items.find(
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
          }
          setCanMove(true);
          return setDigKeyIsDown(false);
        }
      }

      if (!digKeyIsDown) {
        return;
      }
      if (e.key === "ArrowUp" && top) {
        return setTargetDiggingTile({ x: top.x, y: top.y });
      }
      if (e.key === "ArrowDown" && bottom) {
        return setTargetDiggingTile({ x: bottom.x, y: bottom.y });
      }
      if (e.key === "ArrowLeft" && left) {
        return setTargetDiggingTile({ x: left.x, y: left.y });
      }
      if (e.key === "ArrowRight" && right) {
        return setTargetDiggingTile({ x: right.x, y: right.y });
      }
    },
    [
      tiles,
      player,
      inventory,
      items,
      tiles,
      placeKeyIsDown,
      top,
      left,
      bottom,
      right,
      digKeyIsDown,
      targetDiggingTile,
    ]
  );

  useEffect(() => {
    addEventListener("keyup", handleDig);

    return () => {
      removeEventListener("keyup", handleDig);
    };
  }, [, handleDig]);
};
