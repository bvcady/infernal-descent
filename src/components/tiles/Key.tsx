import { useNoise } from "@/hooks/useNoise";
import { usePlaySound } from "@/hooks/usePlaySound";
import { Cell } from "@/types/Cell";
import { scale } from "@/utils/scale";
import { Box } from "@mui/material";
import { styled } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import useSound from "use-sound";

interface Props {
  cellSize?: number;
  cell?: Cell;
}

const d = 17;

const KeySprite = styled(Box)``;

export const Key = ({ cellSize = 16, cell }: Props) => {
  const x = cell?.x || 0;
  const y = cell?.y || 0;

  const keyRef = useRef<HTMLDivElement>();
  const requestRef = useRef(0);

  const { play: playKeyPling } = usePlaySound({
    soundFile: "/Audio/Impact Sounds/Audio/impactTin_medium_001.ogg",
    options: {
      playbackRate: 1,
      volume: 0.2,
    },
  });

  const [shouldPlay, setShouldPlay] = useState(false);

  useEffect(() => {
    if (shouldPlay) {
      // playKeyPling();
    }
  }, [shouldPlay]);

  const animate = (time: number) => {
    const speed = 1500;
    const isUp = time % speed < speed / 2;
    const playSound = (200 + time) % (speed * 2) < speed;

    // if (playSound) {
    //   setShouldPlay(true);
    // } else {
    //   setShouldPlay(false);
    // }

    if (keyRef.current) {
      keyRef.current.style.transform = isUp
        ? "translateY(0%)"
        : "translateY(-5%)";
    }

    requestRef.current = requestAnimationFrame((time) => animate(time));
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  return (
    <KeySprite
      ref={keyRef}
      className="path"
      width={cellSize}
      height={cellSize}
      sx={{
        gridColumnStart: x + 1,
        gridColumnEnd: "span 1",
        gridRowStart: y + 1,
        gridRowEnd: "span 1",

        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundImage: `url("/images/Monochrome/tilemap/new_tile${
          15 + 6 * d + 1
        }.png")`,
      }}
    />
  );
};
