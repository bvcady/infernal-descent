/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEnterRoom } from "@/hooks/useEnterRoom";
import { useMovement } from "@/hooks/useMovement";
import { levelStore } from "@/stores/LevelStore";
import { playerStore } from "@/stores/PlayerStore";
import { Cell } from "@/types/Cell";
import { KeyboardDirection } from "@/types/KeyboardDirections";
import { useEffect, useState } from "react";
import { useStore } from "zustand";
import { GridWrapper } from "../level/GridWrapper";
import { Player } from "../player/Player";
// @ts-ignore

interface Props {
  startCell?: Cell;
}

const cardinals = ["ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft"];

export const PlayerMap = ({ startCell }: Props) => {
  const { setPlayer } = useStore(playerStore);
  const { tiles } = useStore(levelStore);

  const [moveDirection, setMoveDirection] = useState<KeyboardDirection>();

  useEffect(() => {
    setPlayer(tiles.find((c) => c.x === startCell?.x && c.y === startCell?.y));
  }, [startCell]);

  const handleKeyUp = (e: KeyboardEvent) => {
    if (cardinals.includes(e.key)) {
      setMoveDirection(e.key as KeyboardDirection);
    }
  };

  useEffect(() => {
    addEventListener("keyup", handleKeyUp);
    return () => removeEventListener("keyup", handleKeyUp);
  }, [setMoveDirection]);

  useMovement({ moveDirection, setMoveDirection });
  useEnterRoom();

  return <GridWrapper>{<Player />}</GridWrapper>;
};
