import { useStore } from "zustand";
import { GridWrapper } from "../../level/GridWrapper";
import { runStore } from "@/stores/RunStore";
import { windowStore } from "@/stores/WindowStore";
import { Box } from "@mui/material";

export const MiniMap = () => {
  const { rooms, currentRoom } = useStore(runStore);
  const { cellSize } = useStore(windowStore);

  return (
    <GridWrapper
      style={{
        gridTemplateRows: `repeat(5, ${cellSize / 1.5}px)`,
        gridTemplateColumns: `repeat(5, ${cellSize / 1.5}px)`,
        padding: `${cellSize / 1.5}px`,
        position: "relative",
        height: "fit-content",
        // gap: `${cellSize / 10}px`,
      }}
    >
      {rooms?.map((room) => {
        const backgroundString = [
          currentRoom?.x === room.x && currentRoom?.y === room.y
            ? `url("../../images/Monochrome/Tilemap/shovel.png")`
            : "",
          room?.isBossRoom
            ? `url("../../images/Monochrome/Tilemap/threat3.png")`
            : "",
          `url("../../images/Monochrome/Tilemap/new_tile1.png")`,
        ]
          .filter((s) => !!s)
          .join(", ");

        return (
          <Box
            key={`mini - room - ${room.x} - ${room.y}`}
            // bgcolor={
            //   currentRoom?.x === room.x && currentRoom.y === room.y
            //     ? "grey"
            //     : "white"
            // }
            gridColumn={`${room.x + 1} / span 1`}
            gridRow={`${room.y + 1} / span 1`}
            width={cellSize / 1.5}
            height={cellSize / 1.5}
            sx={{
              backgroundSize: "contain",
              backgroundImage: backgroundString,
            }}
          />
        );
      })}
    </GridWrapper>
  );
};
