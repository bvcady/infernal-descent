import { windowStore } from "@/stores/WindowStore";
import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useStore } from "zustand";

const one = 1500;
const half = one / 2;
const quarter = half / 2;
const eight = quarter / 2;

export const Metronome = () => {
  const [beatIncrement, toggleBeatIncrement] = useState(false);
  const requestRef = useRef(0);

  const [beat, setBeat] = useState(0);

  useEffect(() => {
    if (beatIncrement) {
      setBeat((prev) => (prev + 1) % 16);
    }
  }, [beatIncrement]);

  const animate = (time: number) => {
    const isUp = time % quarter < eight;
    if (isUp) {
      toggleBeatIncrement(true);
    } else {
      toggleBeatIncrement(false);
    }
    requestRef.current = requestAnimationFrame((time) => animate(time));
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  const { cellSize } = useStore(windowStore, (state) => state);
  return (
    <Box width={"100%"} maxWidth={cellSize * 1.2 * 16} padding={"1rem"}>
      <Box
        ml={`calc(${(beat + 1) * (100 / 16)}% - ${cellSize / 8}px - ${
          cellSize / 2
        }px)`}
        mb={"0.5rem"}
        bgcolor={"whitesmoke"}
        width={cellSize / 4}
        height={cellSize / 4}
      />
      <Box
        // ml={`${beat}rem`}
        width={"100%"}
        bgcolor={"whitesmoke"}
        height={"10px"}
        sx={{ opacity: 0.4 }}
      />
    </Box>
  );
};
