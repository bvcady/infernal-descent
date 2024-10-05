import { levelStore } from "@/stores/LevelStore";
import { playerStore } from "@/stores/PlayerStore";
import { Cell } from "@/types/Cell";
import { Item } from "@/types/Item";

import { useCallback, useEffect, useState } from "react";
import { useStore } from "zustand";

export const usePlace = () => {
  const [selectedTile, setSelectedTiles] = useState<{
    tile: Cell;
    item: Item;
  }>();

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
          if (futureTile?.tile) {
            setTiles([
              ...tiles,
              {
                ...futureTile.tile,
                x: futureTile.position.x,
                y: futureTile.position.y,
              },
            ]);
          }

          if (futureTile?.item) {
            setItems([
              ...items,
              {
                ...futureTile.item,
                x: futureTile.position.x,
                y: futureTile.position.y,
              },
            ]);
          }

          removeTile(inventory.tiles[0]);
          setFutureTile(undefined);
          return setPlaceKeyIsDown(false);
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
            tile: inventory?.tiles[0].tile,
            item: inventory?.tiles[0].item,
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
            tile: inventory?.tiles[0].tile,
            item: inventory?.tiles[0].item,
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
            tile: inventory?.tiles[0].tile,
            item: inventory?.tiles[0].item,
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
            tile: inventory?.tiles[0].tile,
            item: inventory?.tiles[0].item,
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
    ]
  );

  useEffect(() => {
    addEventListener("keyup", handleKeyUp);
    return () => {
      removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyUp]);
};
