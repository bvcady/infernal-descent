import { windowStore } from "@/stores/WindowStore";
import { cellSize } from "@/utils/defaultValues";
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

    setCellSize(Math.min(newCellSize * 2, 48));
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", () => handleResize());
  }, []);
};
