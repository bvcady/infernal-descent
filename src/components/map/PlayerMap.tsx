/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useMovement } from "@/hooks/useMovement";
import { levelStore } from "@/stores/LevelStore";
import { playerStore } from "@/stores/PlayerStore";
import { Cell } from "@/types/Cell";
import { useEffect, useState } from "react";
import { useStore } from "zustand";
import { GridWrapper } from "../level/GridWrapper";
import { Player } from "../player/Player";
// @ts-ignore

interface Props {
  startCell?: Cell;
  allCells: Cell[];
}

const cardinals = ["ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft"];

export const PlayerMap = ({ startCell }: Props) => {
  const { setPlayer } = useStore(playerStore);
  const { tiles } = useStore(levelStore);

  const [moveDirection, setMoveDirection] = useState<
    "top" | "bottom" | "left" | "right"
  >();

  useEffect(() => {
    setPlayer(tiles.find((c) => c.x === startCell?.x && c.y === startCell?.y));
  }, [startCell]);

  const handleKeyUp = (e: KeyboardEvent) => {
    if (cardinals.includes(e.key)) {
      if (e.key === "ArrowUp") {
        setMoveDirection("top");
      }
      if (e.key === "ArrowDown") {
        setMoveDirection("bottom");
      }
      if (e.key === "ArrowLeft") {
        setMoveDirection("left");
      }
      if (e.key === "ArrowRight") {
        setMoveDirection("right");
      }
    }
  };

  useEffect(() => {
    addEventListener("keyup", handleKeyUp);
    return () => removeEventListener("keyup", handleKeyUp);
  }, []);

  useMovement({ moveDirection, setMoveDirection });

  return <GridWrapper>{<Player />}</GridWrapper>;
};
