import { playerStore } from "@/stores/PlayerStore";
import { windowStore } from "@/stores/WindowStore";
import { Box, styled } from "@mui/material";
import { useRef } from "react";
import { useStore } from "zustand";

const PlayerSprite = styled(Box)``;

export const Player = () => {
  const { player } = useStore(playerStore);
  const { cellSize } = useStore(windowStore, (state) => state);

  const x = player?.x || -1;
  const y = player?.y || -1;

  const playerRef = useRef<HTMLDivElement>();

  return (
    <>
      <PlayerSprite
        ref={playerRef}
        className="player"
        width={cellSize * 1.75}
        height={cellSize * 1.75}
        sx={{
          position: "relative",
          gridColumnStart: x + 1,
          gridRowStart: y + 1,
          gridColumnEnd: "span 1",
          gridRowEnd: "span 1",
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          overflow: "visible",
          backgroundImage: `url("../../images/dancie.gif")`,
          translate: "0 -30%",
          filter: "url(#displacementFilter)",
        }}
      />
    </>
  );
};
