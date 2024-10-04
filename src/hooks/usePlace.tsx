import { levelStore } from "@/stores/LevelStore";
import { playerStore } from "@/stores/PlayerStore";
import { Cell } from "@/types/Cell";
import { Hazard } from "@/types/Hazard";
import { useCallback, useEffect, useState } from "react";
import { useStore } from "zustand";

export const usePlace = () => {
  const [selectedTile, setSelectedTiles] = useState<{
    tile: Cell;
    item: Cell;
    hazard: Hazard;
  }>();

  const { setItems, items, setTiles, tiles, walls } = useStore(levelStore);
  const {
    player,
    setCanMove,
    inventory,
    setFutureTile,
    futureTile,
    removeTile,
    placeKeyIsDown,
    setPlaceKeyIsDown,
  } = useStore(playerStore);

  useEffect(() => {
    console.log({ futureTile });
  }, [futureTile]);

  const handleKeyUp = useCallback(
    (e: KeyboardEvent) => {
      if (e.repeat || !player || !inventory?.tiles?.length) {
        return;
      }

      const { x, y } = player;
      if (e.key === "x") {
        console.log("Start Placing Tile...");
        setCanMove(false);

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

          if (futureTile) removeTile(inventory.tiles[0]);
          setFutureTile(undefined);
          setCanMove(true);
          return setPlaceKeyIsDown(false);
        } else {
          return setPlaceKeyIsDown(true);
        }
      }

      if (e.key === "ArrowUp") {
        console.log("Arrow Up");
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
        console.log("Arrow Down");
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
      if (e.key === "b") {
        setPlaceKeyIsDown(false);
        return setFutureTile(undefined);
      }
      if (!placeKeyIsDown) {
        setFutureTile(undefined);
      }
    },
    [
      placeKeyIsDown,
      player,
      tiles,
      setFutureTile,
      futureTile,
      inventory,
      items,
      setItems,
      setTiles,
    ]
  );

  useEffect(() => {
    addEventListener("keyup", handleKeyUp);

    return () => {
      removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyUp]);
};
