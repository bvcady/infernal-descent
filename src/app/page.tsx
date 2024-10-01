"use client";

import { RoomMap } from "@/components/level/RoomMap";
import { MobileMovement } from "@/components/ui/interactive/MobileMovement";
import { useResize } from "@/hooks/useResize";
import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  useResize();
  const mainRef = useRef<HTMLElement>(null);

  const [seed, setSeed] = useState<string>("");

  useEffect(() => {
    setSeed((Math.random() + 1).toString(36).substring(7));
  }, []);

  useEffect(() => {
    mainRef.current?.dispatchEvent(
      new MouseEvent("click", { bubbles: true, clientX: 0, clientY: 0 })
    );
  }, []);

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
      <RoomMap seed={seed} setSeed={setSeed} />
      <MobileMovement />
    </Box>
  );
}
