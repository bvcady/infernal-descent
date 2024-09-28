import { scale } from "@/utils/scale";
import { useCallback, useState } from "react";
import useSound from "use-sound";

interface Props {
  soundFile: string;
  options?: { playbackRate?: number; loop?: boolean; volume?: number };
}

export const usePlaySound = ({ soundFile, options }: Props) => {
  const [increment, setIncrement] = useState(0);

  const [playbackRate, setPlaybackRate] = useState(1);

  const [play] = useSound(soundFile, {
    interrupt: true,
    playbackRate,
    volume: options?.volume || 1,
  });

  const handlePlay = useCallback(() => {
    setIncrement((prev) => (prev += 0.5));
    if (!options?.playbackRate)
      setPlaybackRate(scale([0, 1], [0.9, 1.1])(Math.random()));
    // stop();
    play();
  }, [increment, setIncrement, setPlaybackRate, playbackRate]);

  return { play: handlePlay };
};
