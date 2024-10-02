import { runStore } from "@/stores/RunStore";
import { windowStore } from "@/stores/WindowStore";
import { Box } from "@mui/material";
import { useStore } from "zustand";
import { GridWrapper } from "../../level/GridWrapper";
import { useState } from "react";

const d = 17;

export const MiniMap = () => {
  const [showMap, toggleShowMap] = useState(false);
  const { rooms, currentRoom } = useStore(runStore);
  const { cellSize } = useStore(windowStore);

  const undiscoveredNeighbours = [...rooms].filter((r) => {
    if (r.isVisited) {
      return false;
    }
    const { top, left, right, bottom } = currentRoom?.neighbours || {};
    if (top?.x === r.x && top?.y === r.y) {
      return true;
    }
    if (bottom?.x === r.x && bottom?.y === r.y) {
      return true;
    }
    if (left?.x === r.x && left?.y === r.y) {
      return true;
    }
    if (right?.x === r.x && right?.y === r.y) {
      return true;
    }
    return false;
  });

  console.log({ toggleShowMap });

  return (
    <>
      {showMap ? (
        <GridWrapper
          style={{
            gridTemplateRows: `repeat(7, ${cellSize / 2}px)`,
            gridTemplateColumns: `repeat(7, ${cellSize / 2}px)`,
            position: "absolute",
            height: "fit-content",
            width: "fit-content",
            placeItems: "center",
            background: "rgba(0, 0, 0, 0.5)",
            padding: 0,
            border: "4px solid black",
            backdropFilter: "blur(10px)",
            inset: 0,
            margin: "auto",
          }}
        >
          {rooms
            ?.filter((r) => r.isVisited)
            ?.map((room) => {
              const backgroundString = [
                // currentRoom?.x === room.x && currentRoom?.y === room.y
                //   ? `url("../../images/Monochrome/Tilemap/new_tile${
                //       7 + 7 * d + 1
                //     }.png")`
                //   : "",
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
                  width={cellSize / 2}
                  height={cellSize / 2}
                  sx={{
                    backgroundSize: "contain",
                    backgroundImage: backgroundString,
                  }}
                />
              );
            })}
          <Box
            className="player"
            width={cellSize / 2.5}
            height={cellSize / 2.5}
            sx={{
              gridColumnStart: (currentRoom?.x || 0) + 1,
              gridRowStart: (currentRoom?.y || 0) + 1,
              gridColumnEnd: "span 1",
              gridRowEnd: "span 1",
              // zIndex: cell?.y,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundImage: `url("../../images/Monochrome/Tilemap/new_tile${
                7 + 7 * d + 1
              }.png")`,
              // backgroundImage: `url("../../images/Monochrome/Tilemap/new_tile${
              //   7 + 7 * d + 1
              // }.png")`,
            }}
          />
          {undiscoveredNeighbours?.map((n) => (
            <Box
              key={`mini - room - ${n.x} - ${n.y}`}
              // bgcolor={
              //   currentRoom?.x === room.x && currentRoom.y === room.y
              //     ? "grey"
              //     : "white"
              // }
              gridColumn={`${n.x + 1} / span 1`}
              gridRow={`${n.y + 1} / span 1`}
              width={cellSize / 4}
              height={cellSize / 4}
              sx={{
                backgroundSize: "contain",
                backgroundImage:
                  'url("../../images/Monochrome/Tilemap/new_tile1.png")',
              }}
            />
          ))}
        </GridWrapper>
      ) : null}
      {!showMap ? "X" : null}
    </>
  );
};
