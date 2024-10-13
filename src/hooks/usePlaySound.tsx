import { scale } from "@/utils/scale";
import { Howl } from "howler";
import { useEffect, useState } from "react";

interface Props {
  soundFile: string;
  options?: {
    playbackRate?: number;
    loop?: boolean;
    volume?: number;
    autoPlay?: boolean;
    shouldInterupt?: boolean;
  };
}

export const usePlaySound = ({ soundFile, options }: Props) => {
  const [playbackRate, setPlaybackRate] = useState(options?.playbackRate || 1);

  const [sound, setSound] = useState<Howl | undefined>();

  useEffect(() => {
    if (!soundFile) {
      return;
    }
    setSound(
      new Howl({
        src: soundFile,
        autoplay: options?.autoPlay,
        volume: options?.volume,
        loop: options?.loop,
        rate: playbackRate,
      })
    );
    return () => {
      sound?.stop();
    };
  }, [soundFile]);

  const handlePlay = () => {
    if (!options?.playbackRate) {
      setPlaybackRate(scale([0, 1], [0.9, 1.1])(Math.random()));
    }
    if (!options?.shouldInterupt && sound?.playing()) {
      return;
    }
    sound?.play();
  };

  return { play: handlePlay };
};
