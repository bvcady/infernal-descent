import { playerStore } from "@/stores/PlayerStore";
import { Cell } from "@/types/Cell";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePlaySound } from "./usePlaySound";
import { useStore } from "zustand";

interface Props {
  startCell: Cell;
  allCells: Cell[];
  POI?: Cell;
}

const cardinals = ["ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft"];

export const usePlayer = ({ startCell, allCells, POI }: Props) => {
  const { player, setPlayer } = useStore(playerStore, (state) => state);

  const { play: playStep } = usePlaySound({
    soundFile: "/Audio/Impact Sounds/Audio/footstep_wood_002.ogg",
    options: { volume: 0.3 },
  });
  const { play: playThud } = usePlaySound({
    soundFile: "/Audio/Impact Sounds/Audio/impactWood_heavy_000.ogg",
  });
  const { play: playKey } = usePlaySound({
    soundFile: "/Audio/Impact Sounds/Audio/impactMining_002.ogg",
    options: { volume: 0.3 },
  });

  useEffect(() => {
    setPlayer(allCells.find((c) => c.x === startCell.x && c.y === startCell.y));
  }, [startCell]);

  useEffect(() => {
    playStep();
    if (player?.x === POI?.x && player?.y === POI?.y) {
      playKey();
    }
  }, [player]);

  const requestRef = useRef(0);

  const [shouldDoNextMove, setShouldDoNextMove] = useState(false);
  const [moveDirection, setMoveDirection] = useState<
    "top" | "bottom" | "left" | "right"
  >();

  useEffect(() => {
    if (shouldDoNextMove && moveDirection) {
      handleMoveInDirection(moveDirection);
      setMoveDirection(undefined);
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

  const handleMoveInDirection = (dir: "top" | "bottom" | "right" | "left") => {
    const cellCheck = player?.neighbours?.[dir];
    if (cellCheck?.isPath && !cellCheck.isLava) {
      const nextCell = allCells.find(
        (c) => c.x === cellCheck.x && c.y === cellCheck.y
      );
      if (nextCell) return setPlayer({ ...nextCell });
    }

    playThud();
  };

  const handleKeyUp = useCallback(
    (e: KeyboardEvent) => {
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
    },
    [player, startCell]
  );

  useEffect(() => {
    addEventListener("keyup", handleKeyUp);

    return () => removeEventListener("keyup", handleKeyUp);
  }, [handleKeyUp]);

  return { player };
};
