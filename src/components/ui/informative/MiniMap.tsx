import { runStore } from "@/stores/RunStore";
import { windowStore } from "@/stores/WindowStore";
import { Box } from "@mui/material";
import { useStore } from "zustand";
import { GridWrapper } from "../../level/GridWrapper";
import { useEffect, useState } from "react";
import { playerStore } from "@/stores/PlayerStore";

const d = 17;

export const MiniMap = () => {
  const [showMap, toggleShowMap] = useState(false);
  const { rooms, currentRoom } = useStore(runStore);
  const { cellSize, toggleShowBHint } = useStore(windowStore);
  const { setCanMove, digKeyIsDown, placeKeyIsDown } = useStore(playerStore);

  useEffect(() => {
    if (currentRoom?.items?.find((i) => i.name === "skull")) {
      console.log({ currentRoom });
    }
    if (currentRoom?.itemsToPlace?.find((i) => i.name === "skull")) {
      console.log({ currentRoom });
    }
  }, [currentRoom]);

  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.repeat || digKeyIsDown || placeKeyIsDown) {
      return;
    }
    if (e.key === "b") {
      toggleShowMap(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.repeat || digKeyIsDown || placeKeyIsDown) {
      return;
    }

    if (e.key === "b") {
      toggleShowMap(true);
    }
  };

  useEffect(() => {
    addEventListener("keyup", handleKeyUp);
    addEventListener("keydown", handleKeyDown);
    return () => {
      removeEventListener("keyup", handleKeyUp);
      removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (currentRoom) {
      setCanMove(!showMap);
      toggleShowBHint(!showMap);
    }
  }, [showMap]);

  return (
    <>
      {showMap ? (
        <GridWrapper
          style={{
            gridTemplateRows: `repeat(5, ${cellSize / 2}px)`,
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
          {rooms?.map((room) => {
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
        </GridWrapper>
      ) : null}
    </>
  );
};
