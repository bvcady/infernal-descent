import { usePlaySound } from "@/hooks/usePlaySound";
import { windowStore } from "@/stores/WindowStore";
import { useEffect, useRef, useState } from "react";
import { useStore } from "zustand";

const one = 666.6666667 * 2;
const half = one / 2;
const quarter = half / 2;
const eight = quarter / 2;

export const Metronome = () => {
  const { play } = usePlaySound({
    soundFile: "../../Audio/pickupCoin.wav",
    options: { volume: 0.02 },
  });
  const [beatIncrement, toggleBeatIncrement] = useState(false);
  const requestRef = useRef(0);
  const { beat, setBeat } = useStore(windowStore);

  useEffect(() => {
    if (beatIncrement) {
      if ((beat / 2) % 1) play();
      setBeat((beat + 1) % 16);
    }
  }, [beatIncrement]);

  const animate = (time: number) => {
    const isUp = time % quarter < eight;
    if (isUp) {
      toggleBeatIncrement(true);
    } else {
      toggleBeatIncrement(false);
    }
    requestRef.current = requestAnimationFrame((time) => animate(time));
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  return null;
};
