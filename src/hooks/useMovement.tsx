import { levelStore } from "@/stores/LevelStore";
import { playerStore } from "@/stores/PlayerStore";
import { KeyboardDirection } from "@/types/KeyboardDirections";
import { Dispatch, useCallback, useEffect, useRef, useState } from "react";
import { useStore } from "zustand";

interface Props {
  moveDirection?: KeyboardDirection;
  setMoveDirection?: Dispatch<KeyboardDirection | undefined>;
}

export const useMovement = ({ moveDirection, setMoveDirection }: Props) => {
  const requestRef = useRef(0);

  const { tiles, exits, items } = useStore(levelStore);
  const { player, moveInDirection, canMove, placeKeyIsDown, digKeyIsDown } =
    useStore(playerStore);

  const [shouldDoNextMove, setShouldDoNextMove] = useState(false);

  const tileOptions = [...tiles, ...exits];
  const neighbouringCells = player
    ? {
        ArrowUp: tileOptions?.find(
          (cell) => cell.x === player?.x && cell.y === player?.y - 1
        ),
        ArrowDown: tileOptions?.find(
          (cell) => cell.x === player?.x && cell.y === player?.y + 1
        ),
        ArrowLeft: tileOptions?.find(
          (cell) => cell.x === player?.x - 1 && cell.y === player?.y
        ),
        ArrowRight: tileOptions?.find(
          (cell) => cell.x === player?.x + 1 && cell.y === player?.y
        ),
      }
    : {};

  const handleMoveInDirection = useCallback(
    (dir: KeyboardDirection) => {
      const cellCheck = neighbouringCells?.[dir];

      if (
        items.find(
          (item) =>
            item.x === cellCheck?.x &&
            item.y === cellCheck?.y &&
            item.type === "Unobtainable"
        )
      ) {
        return;
      }

      if (cellCheck && canMove && !placeKeyIsDown && !digKeyIsDown) {
        moveInDirection(cellCheck);
      }
    },
    [canMove, neighbouringCells, moveDirection, items]
  );

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
