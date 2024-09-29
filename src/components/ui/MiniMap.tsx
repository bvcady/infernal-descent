import { useStore } from "zustand";
import { GridWrapper } from "../grid/GridWrapper";
import { runStore } from "@/stores/RunStore";
import { windowStore } from "@/stores/WindowStore";
import { Box } from "@mui/material";

export const MiniMap = () => {
  const { rooms } = useStore(runStore);
  const { cellSize } = useStore(windowStore);

  return (
    <GridWrapper
      style={{
        gridTemplateRows: `repeat(5, ${cellSize / 2}px)`,
        gridTemplateColumns: `repeat(5, ${cellSize / 2}px)`,
        padding: `${cellSize / 2}px`,
        position: "relative",
        height: "fit-content",
        gap: `${cellSize / 10}px`,
      }}
    >
      {rooms?.map((room) => (
        <Box
          key={`mini - room - ${room.x} - ${room.y}`}
          bgcolor={"white"}
          gridColumn={`${room.x + 1} / span 1`}
          gridRow={`${room.y + 1} / span 1`}
          width={cellSize / 2}
          height={cellSize / 2}
        />
      ))}
    </GridWrapper>
  );
};
