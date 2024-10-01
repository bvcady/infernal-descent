import { levelStore } from "@/stores/LevelStore";
import { playerStore } from "@/stores/PlayerStore";
import { runStore } from "@/stores/RunStore";
import { Dispatch, useEffect, useRef, useState } from "react";
import { useStore } from "zustand";

export type Direction = "top" | "bottom" | "right" | "left";

interface Props {
  moveDirection?: Direction;
  setMoveDirection?: Dispatch<Direction | undefined>;
}

export const useMovement = ({ moveDirection, setMoveDirection }: Props) => {
  const requestRef = useRef(0);

  const { walls, tiles, items, exits } = useStore(levelStore);
  const { player, setPlayer } = useStore(playerStore);
  const { updateRooms, rooms } = useStore(runStore);

  const [shouldDoNextMove, setShouldDoNextMove] = useState(false);

  const tileOptions = [...tiles, ...exits];
  const neighbouringCells = player
    ? {
        top: tileOptions?.find(
          (cell) => cell.x === player?.x && cell.y === player?.y - 1
        ),
        bottom: tileOptions?.find(
          (cell) => cell.x === player?.x && cell.y === player?.y + 1
        ),
        left: tileOptions?.find(
          (cell) => cell.x === player?.x - 1 && cell.y === player?.y
        ),
        right: tileOptions?.find(
          (cell) => cell.x === player?.x + 1 && cell.y === player?.y
        ),
      }
    : {};

  const handleMoveInDirection = (dir: "top" | "bottom" | "right" | "left") => {
    const cellCheck = neighbouringCells?.[dir];
    console.log({ cellCheck });
    // Find the player's neighbours (based on the tiles and walls, not on what is in its default state

    if (cellCheck) {
      setPlayer(cellCheck);

      if (cellCheck?.exit) {
        const nextRoom = [...rooms].find(
          (r) => r.x === cellCheck.exit?.x && r.y === cellCheck.exit.y
        );
        if (nextRoom) updateRooms(nextRoom, { walls, tiles, items });
      }
      return;
    }
  };

  useEffect(() => {
    if (shouldDoNextMove && moveDirection) {
      handleMoveInDirection(moveDirection);
      setMoveDirection?.(undefined);
    }
  }, [shouldDoNextMove]);

  const animate = (time: number) => {
    const one = 3000;
    const half = one / 2;
    const quart = half / 2;
    const eight = quart / 2;
    const nextMove = time % (eight / 2) < eight / 4;

    setShouldDoNextMove(nextMove);

    requestRef.current = requestAnimationFrame((time) => animate(time));
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);
};
