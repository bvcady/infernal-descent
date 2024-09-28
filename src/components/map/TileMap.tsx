import { levelStore } from "@/stores/LevelStore";
import { useStore } from "zustand";
import { FloorTile } from "../cells/FloorTile";
import { GridWrapper } from "../grid/GridWrapper";

export const TileMap = () => {
  const { floorTiles } = useStore(levelStore, (state) => state);
  return (
    <GridWrapper>
      {floorTiles.map((cell) => (
        <FloorTile key={`tile - ${cell.x} - ${cell.y}`} cell={cell} />
      ))}
    </GridWrapper>
  );
};
