import { levelStore } from "@/stores/LevelStore";
import { playerStore } from "@/stores/PlayerStore";
import { Cell } from "@/types/Cell";
import { useCallback, useEffect, useState } from "react";
import { useStore } from "zustand";

export const usePlace = () => {
  const [placeKeyIsDown, setPlaceKeyIsDown] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<Cell>();
  const { tiles } = useStore(levelStore);
  const { player, setCanMove } = useStore(playerStore);
  //   const { toggleShowZHint, showZHint } = useStore(windowStore);

  useEffect(() => {
    console.log({ selectedPosition });
  }, [selectedPosition]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key !== "x" || e.repeat) {
        return;
      }
      console.log("can't move");
      setCanMove(false);
      setPlaceKeyIsDown(true);
    },
    [setPlaceKeyIsDown]
  );

  const handleKeyUp = useCallback(
    (e: KeyboardEvent) => {
      if (e.repeat || !player || !placeKeyIsDown) {
        return;
      }

      if (e.key === "x") {
        console.log("can move again");
        setCanMove(true);
        return setPlaceKeyIsDown(false);
      }

      if (e.key === "ArrowUp") {
        return setSelectedPosition(
          tiles.find((t) => t.x === player.x && t.y === player.y - 1)
        );
      }
      if (e.key === "ArrowDown") {
        return setSelectedPosition(
          tiles.find((t) => t.x === player.x && t.y === player.y + 1)
        );
      }
      if (e.key === "ArrowLeft") {
        return setSelectedPosition(
          tiles.find((t) => t.x === player.x - 1 && t.y === player.y)
        );
      }
      if (e.key === "ArrowRight") {
        return setSelectedPosition(
          tiles.find((t) => t.x === player?.x + 1 && t.y === player.y)
        );
      }
    },
    [placeKeyIsDown, player, tiles, setSelectedPosition]
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
