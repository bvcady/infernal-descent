import { playerStore } from "@/stores/PlayerStore";
import { windowStore } from "@/stores/WindowStore";
import { Box, styled } from "@mui/material";
import { useEffect, useRef } from "react";
import { useStore } from "zustand";

const PlayerSprite = styled(Box)``;

export const Player = () => {
  const { player } = useStore(playerStore);
  const { cellSize } = useStore(windowStore, (state) => state);

  const x = player?.x || -1;
  const y = player?.y || -1;

  const requestRef = useRef<number>(0);
  const playerRef = useRef<HTMLDivElement>();

  const animate = (time: number) => {
    const one = 3000;
    const half = one / 2;
    const quarter = half / 2;

    const isUp = time % half < quarter;
    // const isUp = false;

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
  const d = 17;

  return (
    <>
      <PlayerSprite
        ref={playerRef}
        className="player"
        width={cellSize}
        height={cellSize}
        sx={{
          overflow: "visible",
          position: "relative",
          gridColumnStart: x + 1,
          gridRowStart: y + 1,
          gridColumnEnd: "span 1",
          gridRowEnd: "span 1",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: `url("../../images/Monochrome/Tilemap/new_tile${
            7 + 7 * d + 1
          }.png")`,
        }}
      />
    </>
  );
};
