import { levelStore } from "@/stores/LevelStore";
import { useStore } from "zustand";

import { GridWrapper } from "../level/GridWrapper";
import { Wall } from "../tiles/fixed/Wall";

export const WallMap = () => {
  const { walls } = useStore(levelStore);

  return (
    <GridWrapper>
      {walls.map((cell) => (
        <Wall key={`wall - ${cell.x} - ${cell.y}`} cell={cell} />
      ))}
    </GridWrapper>
  );
};
