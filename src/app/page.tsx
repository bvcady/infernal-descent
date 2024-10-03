"use client";

import { RoomMap } from "@/components/level/RoomMap";
import { usePlaySound } from "@/hooks/usePlaySound";
import { useResize } from "@/hooks/useResize";
import { windowStore } from "@/stores/WindowStore";
import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useStore } from "zustand";

export default function Home() {
  useResize();
  const mainRef = useRef<HTMLElement>(null);

  const [seed, setSeed] = useState<string>("");
  const { toggleShowStartHint, toggleShowZHint, hasLoaded } =
    useStore(windowStore);

  // useEffect(() => {
  //   setSeed((Math.random() + 1).toString(36).substring(7));
  // }, []);
  const { play } = usePlaySound({ soundFile: "../../Audio/80bpm-piano.wav" });

  useEffect(() => {
    mainRef.current?.dispatchEvent(
      new MouseEvent("click", { bubbles: true, clientX: 0, clientY: 0 })
    );
  }, []);

  useEffect(() => {
    play();
    toggleShowStartHint(!seed);
    toggleShowZHint(!!seed);
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
    </Box>
  );
}
