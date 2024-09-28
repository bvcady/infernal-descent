import { levelStore } from "@/stores/LevelStore";
import { useStore } from "zustand";

import { Wall } from "../cells/Wall";
import { GridWrapper } from "../grid/GridWrapper";

export const WallMap = () => {
  const { walls } = useStore(levelStore, (state) => state);

  return (
    <GridWrapper>
      {walls.map((cell) => (
        <Wall key={`wall - ${cell.x} - ${cell.y}`} cell={cell} />
      ))}
    </GridWrapper>
  );
};
