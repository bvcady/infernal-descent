import { useCallback, useState } from "react";
import useSound from "use-sound";
import { useNoise } from "./useNoise";
import { scale } from "@/utils/scale";

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

  const { genericNoise } = useNoise({ seed: "player-move" });

  const handlePlay = useCallback(() => {
    setIncrement((prev) => (prev += 0.5));
    if (!options?.playbackRate)
      setPlaybackRate(
        scale([-1, 1], [0.9, 1.1])(genericNoise(increment, increment) || 0)
      );
    // stop();
    play();
  }, [increment, setIncrement, setPlaybackRate, playbackRate]);

  return { play: handlePlay };
};
