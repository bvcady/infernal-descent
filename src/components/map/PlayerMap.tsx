/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useMovement } from "@/hooks/useMovement";
import { playerStore } from "@/stores/PlayerStore";
import { Cell } from "@/types/Cell";
import { useEffect, useState } from "react";
import { useStore } from "zustand";
import { GridWrapper } from "../grid/GridWrapper";
import { Player } from "../tiles/Player";
// @ts-ignore

interface Props {
  startCell?: Cell;
  allCells: Cell[];
}

const cardinals = ["ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft"];

export const PlayerMap = ({ startCell, allCells }: Props) => {
  const { setPlayer } = useStore(playerStore);

  const [moveDirection, setMoveDirection] = useState<
    "top" | "bottom" | "left" | "right"
  >();

  useEffect(() => {
    setPlayer(
      allCells.find((c) => c.x === startCell?.x && c.y === startCell?.y)
    );
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
  }, [handleKeyUp]);

  useMovement({ moveDirection, setMoveDirection, allCells });

  return <GridWrapper>{<Player />}</GridWrapper>;
};
