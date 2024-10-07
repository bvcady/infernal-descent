"use client";

import { RoomMap } from "@/components/level/RoomMap";
import { Metronome } from "@/components/ui/informative/Metronome";
import { usePlaySound } from "@/hooks/usePlaySound";
import { useResize } from "@/hooks/useResize";
import { playerStore } from "@/stores/PlayerStore";
import { runStore } from "@/stores/RunStore";
import { windowStore } from "@/stores/WindowStore";
import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useStore } from "zustand";

export default function Home() {
  useResize();
  const mainRef = useRef<HTMLElement>(null);

  const [seed, setSeed] = useState<string>("");
  const { toggleShowStartHint, toggleShowBHint, hasLoaded } =
    useStore(windowStore);

  const { setPreviousRoom } = useStore(runStore);
  const { setPlayer, resetInventory, toggleHasWon } = useStore(playerStore);
  // useEffect(() => {
  //   setSeed((Math.random() + 1).toString(36).substring(7));
  // }, []);
  const { play } = usePlaySound({
    soundFile: "../../Audio/loop_two.wav",
    options: { playbackRate: 1, loop: true, volume: 0.4 },
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
    <Box
      component={"main"}
      position={"relative"}
      width={"100dvw"}
      height={"100dvh"}
      overflow={"hidden"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"flex-start"}
      ref={mainRef}
    >
      {hasLoaded ? <RoomMap seed={seed} setSeed={setSeed} /> : null}
      <Metronome />
    </Box>
  );
}
