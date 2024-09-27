import { Cell } from "@/types/Cell";
import { Box, styled } from "@mui/material";
import { useEffect, useRef } from "react";

const PlayerSprite = styled(Box)``;

interface Props {
  cellSize?: number;
  cell?: Cell;
}

const d = 17;

export const Player = ({ cellSize = 16, cell }: Props) => {
  const x = cell?.x || -1;
  const y = cell?.y || -1;

  const requestRef = useRef<number>(0);
  const playerRef = useRef<HTMLDivElement>();

  const animate = (time: number) => {
    const one = 3000;
    const half = one / 2;
    const quarter = half / 2;

    const isUp = time % half < quarter;

    if (playerRef.current) {
      playerRef.current.style.transform = isUp
        ? "translateY(-20%)"
        : "translateY(-30%)";
    }

    requestRef.current = requestAnimationFrame((time) => animate(time));
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  return (
    <PlayerSprite
      ref={playerRef}
      className="player"
      width={cellSize}
      height={cellSize}
      sx={{
        gridColumnStart: x + 1,
        gridRowStart: y + 1,
        gridColumnEnd: "span 1",
        gridRowEnd: "span 1",
        // zIndex: cell?.y,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundImage: `url("/images/Monochrome/tilemap/new_tile${
          7 + 7 * d + 1
        }.png")`,
      }}
    />
  );
};
