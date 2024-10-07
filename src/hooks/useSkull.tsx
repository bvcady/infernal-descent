import { playerStore } from "@/stores/PlayerStore";
import { windowStore } from "@/stores/WindowStore";
import { KeyboardDirection } from "@/types/KeyboardDirections";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useStore } from "zustand";
import { usePlaySound } from "./usePlaySound";

interface Props {
  setMoveDirection: Dispatch<SetStateAction<KeyboardDirection | undefined>>;
}

const dirs: KeyboardDirection[] = [
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowUp",
];
export const useSkull = ({ setMoveDirection }: Props) => {
  const { play } = usePlaySound({
    soundFile: "../../Audio/synth.wav",
    options: { volume: 0.3 },
  });

  const { inventory } = useStore(playerStore);
  const [potentialMoveDirection, setPotentialMoveDirection] =
    useState<KeyboardDirection>(
      dirs[Math.min(Math.floor(Math.random() * 4), 3)]
    );
  const { beat } = useStore(windowStore);
  const [canBeShoved, toggleCanBeShoved] = useState(false);

  useEffect(() => {
    if (inventory.tiles.find((t) => t?.item?.name === "skull")) {
      toggleCanBeShoved(true);
    } else {
      toggleCanBeShoved(false);
    }
  }, [inventory]);

  const handleSkullShove = useCallback(() => {
    if (!canBeShoved) return;
    const n = inventory.tiles.find((t) => t?.item?.name === "skull")?.n;

    if (Math.floor(beat / 2) === n) {
      setMoveDirection(potentialMoveDirection);
      play();
    }
    if (Math.floor(beat / 2) - (1 % 8) === n) {
      setPotentialMoveDirection(
        dirs[Math.min(Math.floor(Math.random() * 4), 3)]
      );
    }
  }, [beat, canBeShoved]);

  useEffect(() => {
    handleSkullShove();
  }, [Math.floor(beat / 2)]);

  return { arrow: canBeShoved ? potentialMoveDirection : undefined };
};
