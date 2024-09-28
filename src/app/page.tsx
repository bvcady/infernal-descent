"use client";

import { RoomMap } from "@/components/map/RoomMap";
import { useResize } from "@/hooks/useResize";
import { useRooms } from "@/hooks/useRooms";
import { runStore } from "@/stores/RunStore";
import { useEffect, useState } from "react";
import { useStore } from "zustand";

export default function Home() {
  useResize();

  const [seed, setSeed] = useState<string>("");

  useRooms({ seed: `${seed} - rooms` });

  useEffect(() => {
    setSeed((Math.random() + 1).toString(36).substring(7));
  }, []);

  const { currentRoom } = useStore(runStore, (state) => state);

  return (
    <main>
      <RoomMap seed={seed} setSeed={setSeed} currentRoom={currentRoom} />
    </main>
  );
}
