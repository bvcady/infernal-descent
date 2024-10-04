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
  //   const { toggleShowZHint, showZHint } = useStore(windowStore);

  useEffect(() => {
    console.log({ futureTile });
  }, [futureTile]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.repeat || !player || !inventory?.tiles?.length) {
        return;
      }
      const { x, y } = player;

      if (e.key === "x") {
        console.log("Start Placing Tile...");
        setCanMove(false);
        return setPlaceKeyIsDown(true);
      }

      if (!placeKeyIsDown) {
        return;
      }

      if (e.key === "ArrowUp") {
        console.log("Arrow Up");
        const isPossible =
          !tiles.find((t) => t.x === player.x && t.y === player.y - 1) &&
          !walls.find((t) => t.x === player.x && t.y === player.y - 1);
        if (isPossible) {
          return setFutureTile({
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
          return setFutureTile({
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
          return setFutureTile({
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
          return setFutureTile({
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
      setPlaceKeyIsDown,
      placeKeyIsDown,
      player,
      tiles,
      inventory,
      walls,
      futureTile,
      setFutureTile,
    ]
  );

  const handleKeyUp = useCallback(
    (e: KeyboardEvent) => {
      if (e.repeat || !player || !placeKeyIsDown || !inventory?.tiles?.length) {
        return;
      }

      if (e.key === "x") {
        console.log("End placing tile");
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
        setCanMove(true);
        return setPlaceKeyIsDown(false);
      }
      if (
        e.key === "ArrowUp" ||
        e.key === "ArrowDown" ||
        e.key === "ArrowLeft" ||
        e.key === "ArrowRight"
      ) {
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
    addEventListener("keydown", handleKeyDown);
    addEventListener("keyup", handleKeyUp);

    return () => {
      removeEventListener("keydown", handleKeyDown);
      removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);
};
