"use client";

import { RoomMap } from "@/components/map/RoomMap";
import { MobileMovement } from "@/components/ui/MobileMovement";
import { useResize } from "@/hooks/useResize";
import { useRooms } from "@/hooks/useRooms";
import { runStore } from "@/stores/RunStore";
import { useEffect, useRef, useState } from "react";
import { useStore } from "zustand";

export default function Home() {
  useResize();
  const mainRef = useRef<HTMLElement>(null);

  const [seed, setSeed] = useState<string>("");

  useRooms({ seed: `${seed} - rooms` });

  useEffect(() => {
    setSeed((Math.random() + 1).toString(36).substring(7));
  }, []);

  const { currentRoom } = useStore(runStore, (state) => state);

  useEffect(() => {
    mainRef.current?.dispatchEvent(
      new MouseEvent("click", { bubbles: true, clientX: 0, clientY: 0 })
    );
  }, []);

  return (
    <main ref={mainRef}>
      <RoomMap seed={seed} setSeed={setSeed} currentRoom={currentRoom} />
      <MobileMovement />
    </main>
  );
}
