import { playerStore } from "@/stores/PlayerStore";
import { windowStore } from "@/stores/WindowStore";
import PlayerOutline from "../../../public/images/player_outline.svg";
import PlayerBody from "../../../public/images/player_body.svg";
import PlayerFace from "../../../public/images/player_face.svg";
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

    // const isUp = time % half < quarter;
    const isUp = false;

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
    <>
      <PlayerSprite
        ref={playerRef}
        className="player"
        width={cellSize * 3}
        height={cellSize * 3}
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
          translate: `0 ${cellSize}px`,
        }}
      >
        <PlayerOutline
          style={{ position: "absolute", inset: 0 }}
        ></PlayerOutline>
        <PlayerBody
          style={{
            position: "absolute",
            inset: 0,
            filter: "url(#displacementFilter)",
          }}
        ></PlayerBody>
        <PlayerFace style={{ position: "absolute", inset: 0 }}></PlayerFace>
      </PlayerSprite>
      <svg>
        <filter id="displacementFilter">
          <feTurbulence
            type="turbulence"
            baseFrequency={cellSize / 50}
            numOctaves="2"
            result="turbulence"
            // seed={(player ? player.x + player.x * player.y : 0).toString()}
          />
          <feDisplacementMap
            name="turbulenceResult"
            in2="turbulence"
            in="SourceGraphic"
            scale={cellSize / 100}
            xChannelSelector="A"
            yChannelSelector="A"
          />
          <feGaussianBlur in="turbulenceResult" stdDeviation={cellSize / 200} />
        </filter>
      </svg>
    </>
  );
};
