import { playerStore } from "@/stores/PlayerStore";
import { runStore } from "@/stores/RunStore";
import { Cell } from "@/types/Cell";
import { Dispatch, useEffect, useRef, useState } from "react";
import { useStore } from "zustand";

export type Direction = "top" | "bottom" | "right" | "left";

interface Props {
  moveDirection?: Direction;
  allCells?: Cell[];
  setMoveDirection?: Dispatch<Direction | undefined>;
}

export const useMovement = ({
  moveDirection,
  allCells = [],
  setMoveDirection,
}: Props) => {
  const requestRef = useRef(0);

  const { player, setPlayer } = useStore(playerStore);
  const { updateRooms, rooms } = useStore(runStore);

  const [shouldDoNextMove, setShouldDoNextMove] = useState(false);

  const handleMoveInDirection = (dir: "top" | "bottom" | "right" | "left") => {
    const cellCheck = player?.neighbours?.[dir];

    if ((cellCheck?.isPath || cellCheck?.exit) && !cellCheck.isObstacle) {
      const nextCell = allCells.find(
        (c) => c.x === cellCheck.x && c.y === cellCheck.y
      );
      if (nextCell) setPlayer({ ...nextCell });

      if (nextCell?.exit) {
        const nextRoom = [...rooms].find(
          (r) => r.x === nextCell.exit?.x && r.y === nextCell.exit.y
        );
        if (nextRoom) updateRooms(nextRoom);
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
