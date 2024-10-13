"use client";

import { RoomMap } from "@/components/level/RoomMap";
import { Metronome } from "@/components/ui/informative/Metronome";
import { usePlaySound } from "@/hooks/usePlaySound";
import { useResize } from "@/hooks/useResize";
import { playerStore } from "@/stores/PlayerStore";
import { runStore } from "@/stores/RunStore";
import { windowStore } from "@/stores/WindowStore";
import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import { useStore } from "zustand";

const GameWrapper = styled("main")<{ cellSize: number }>`
  position: relative;
  width: 100dvw;
  height: 100dvh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: start;

  --w: ${({ cellSize }) => cellSize}px;
  --uiW: ${({ cellSize }) => Math.min(36, cellSize)}px;
`;

export default function Home() {
  useResize();
  const mainRef = useRef<HTMLElement>(null);

  const [seed, setSeed] = useState<string>("");
  const { toggleShowStartHint, toggleShowBHint, hasLoaded, cellSize } =
    useStore(windowStore);

  const { setPreviousRoom } = useStore(runStore);
  const { setPlayer, resetInventory, toggleHasWon } = useStore(playerStore);
  // useEffect(() => {
  //   setSeed((Math.random() + 1).toString(36).substring(7));
  // }, []);
  const { play } = usePlaySound({
    soundFile: "../../Audio/loop_two.wav",
    options: { playbackRate: 1.125, loop: true, volume: 0.4 },
  });

  useEffect(() => {
    mainRef.current?.dispatchEvent(
      new MouseEvent("click", { bubbles: true, clientX: 0, clientY: 0 })
    );
  }, []);

  useEffect(() => {
    if (seed) {
      play();
      setPreviousRoom(undefined);
      setPlayer(undefined);
      resetInventory();
      toggleHasWon(false);
      toggleShowBHint(true);
    }
    toggleShowStartHint(!seed);
  }, [seed]);

  return (
    <GameWrapper ref={mainRef} cellSize={cellSize}>
      {hasLoaded ? <RoomMap seed={seed} setSeed={setSeed} /> : null}
      <Metronome />
    </GameWrapper>
  );
}
