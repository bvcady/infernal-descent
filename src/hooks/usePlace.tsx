import { levelStore } from "@/stores/LevelStore";
import { playerStore } from "@/stores/PlayerStore";
import { windowStore } from "@/stores/WindowStore";

import { useCallback, useEffect } from "react";
import { useStore } from "zustand";

export const usePlace = () => {
  const { beat } = useStore(windowStore);
  const { setItems, items, setTiles, tiles, walls } = useStore(levelStore);
  const {
    player,
    inventory,
    setFutureTile,
    futureTile,
    removeTile,
    placeKeyIsDown,
    digKeyIsDown,
    setPlaceKeyIsDown,
  } = useStore(playerStore);

  const { toggleShowXHint, showXHint } = useStore(windowStore);

  useEffect(() => {
    if (!player) return;
    const top =
      tiles.find((t) => t.x === player?.x && t.y === player?.y - 1) &&
      !walls.find((t) => t.x === player?.x && t.y === player?.y - 1);
    const bottom =
      tiles.find((t) => t.x === player?.x && t.y === player?.y + 1) &&
      !walls.find((t) => t.x === player?.x && t.y === player?.y + 1);
    const left =
      tiles.find((t) => t.x === player?.x - 1 && t.y === player?.y) &&
      !walls.find((t) => t.x === player?.x - 1 && t.y === player?.y);
    const right =
      tiles.find((t) => t.x === player?.x + 1 && t.y === player?.y) &&
      !walls.find((t) => t.x === player?.x + 1 && t.y === player?.y);

    if ((top || bottom || left || right) && inventory.tiles.length) {
      if (!showXHint) toggleShowXHint(true);
    } else {
      if (showXHint) {
        toggleShowXHint(false);
      }
    }
  }, [player, inventory, tiles, walls]);

  const handleKeyUp = useCallback(
    (e: KeyboardEvent) => {
      if (digKeyIsDown) {
        return;
      }
      if (e.repeat || !player || !inventory?.tiles?.length) {
        return;
      }

      const { x, y } = player;

      if ((e.key === "b" || e.key === "z") && placeKeyIsDown) {
        setFutureTile(undefined);
        return setPlaceKeyIsDown(false);
      }

      if (e.key === "x" && !placeKeyIsDown) {
        setPlaceKeyIsDown(true);
      }

      if (!placeKeyIsDown) {
        return;
      }

      if (e.key === "x" || e.key === "a") {
        if (futureTile) {
          const removedTile = removeTile(Math.floor(beat / 2));
          if (removedTile) {
            setTiles([
              ...tiles,
              {
                ...removedTile.tile,
                x: futureTile.position.x,
                y: futureTile.position.y,
              },
            ]);

            if (removedTile?.item) {
              setItems([
                ...items,
                {
                  ...removedTile.item,
                  x: futureTile.position.x,
                  y: futureTile.position.y,
                },
              ]);
            }
            setFutureTile(undefined);
            return setPlaceKeyIsDown(false);
          }
        }
        return setPlaceKeyIsDown(false);
      }

      if (e.key === "ArrowUp") {
        const isPossible =
          !tiles.find((t) => t.x === player.x && t.y === player.y - 1) &&
          !walls.find((t) => t.x === player.x && t.y === player.y - 1);
        if (isPossible) {
          setFutureTile({
            position: { x, y: y - 1 },
          });
        } else {
          setFutureTile(undefined);
        }
      }
      if (e.key === "ArrowDown") {
        const isPossible =
          !tiles.find((t) => t.x === player.x && t.y === player.y + 1) &&
          !walls.find((t) => t.x === player.x && t.y === player.y + 1);
        if (isPossible) {
          setFutureTile({
            position: { x, y: y + 1 },
          });
        } else {
          setFutureTile(undefined);
        }
      }
      if (e.key === "ArrowLeft") {
        const isPossible =
          !tiles.find((t) => t.x === player.x - 1 && t.y === player.y) &&
          !walls.find((t) => t.x === player.x - 1 && t.y === player.y);
        if (isPossible) {
          setFutureTile({
            position: { x: x - 1, y },
          });
        } else {
          setFutureTile(undefined);
        }
      }
      if (e.key === "ArrowRight") {
        const isPossible =
          !tiles.find((t) => t.x === player.x + 1 && t.y === player.y) &&
          !walls.find((t) => t.x === player.x + 1 && t.y === player.y);
        if (isPossible) {
          setFutureTile({
            position: { x: x + 1, y },
          });
        } else {
          setFutureTile(undefined);
        }
      }
    },
    [
      digKeyIsDown,
      placeKeyIsDown,
      player,
      tiles,
      setFutureTile,
      futureTile,
      inventory,
      items,
      setItems,
      setTiles,
      playerStore,
      removeTile,
      beat,
    ]
  );

  useEffect(() => {
    addEventListener("keyup", handleKeyUp);
    return () => {
      removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyUp]);
};
