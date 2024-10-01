import { windowStore } from "@/stores/WindowStore";
import { useEffect } from "react";
import { useStore } from "zustand";

const maxDimension = 24;

export const useResize = () => {
  const { setCellSize } = useStore(windowStore, (state) => state);

  const handleResize = () => {
    const deterministicSize =
      window.innerWidth < window.innerHeight
        ? window.innerWidth
        : window.innerHeight;

    const newCellSize = Math.floor(deterministicSize / maxDimension / 4) * 4;

    setCellSize(newCellSize * 1.5);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", () => handleResize());
  }, []);
};
