import { levelStore } from "@/stores/LevelStore";
import { useStore } from "zustand";

import { GridWrapper } from "../level/GridWrapper";
import { FloorTile } from "../tiles/passable/FloorTile";

export const TileMap = () => {
  const { tiles } = useStore(levelStore, (state) => state);
  return (
    <GridWrapper>
      {tiles.map((cell) => (
        <FloorTile key={`tile - ${cell.x} - ${cell.y}`} cell={cell} />
      ))}
    </GridWrapper>
  );
};
