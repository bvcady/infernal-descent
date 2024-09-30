"use client";

import { useGrid } from "@/hooks/useGrid";
// import { usePlaySound } from "@/hooks/usePlaySound";
import { levelStore } from "@/stores/LevelStore";
import { Room } from "@/types/Room";
import { Box } from "@mui/material";
import { Dispatch, useEffect } from "react";
import { useStore } from "zustand";
import { UIOverlay } from "../ui/RoomsOverlay";
import { BottomMap } from "./BottomMap";
import { ItemMap } from "./ItemMap";
import { PlayerMap } from "./PlayerMap";
import { TileMap } from "./TileMap";
import { WallMap } from "./WallMap";

interface Props {
  seed: string;
  setSeed: Dispatch<string>;
  currentRoom?: Room;
}

export const RoomMap = ({ seed, setSeed }: Props) => {
  const { dimensions } = useStore(levelStore, (state) => state);

  // const { play } = usePlaySound({
  //   soundFile: "/Audio/Music/Retro/Retro Mystic.ogg",
  //   options: { playbackRate: 1, loop: true },
  // });

  useEffect(() => {
    // play();
  }, [seed]);

  const grid = useGrid({
    seed,
  });

  const cells = grid?.cells || [];
  const start = grid?.start;
  const exits = grid?.exits;
  const POI = grid?.POI;

  const updateSeed = () => {
    const r = (Math.random() + 1).toString(36).substring(4).toLocaleUpperCase();
    setSeed(r);
  };

  return (
    <>
      <Box
        position={"relative"}
        width={"100dvw"}
        height={"100dvh"}
        overflow={"hidden"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"flex-start"}
      >
        <Box
          position={"relative"}
          width={"100%"}
          maxWidth={"min(100dvw, 100dvh)"}
          // height={"100%"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          sx={{
            aspectRatio: 1,
            marginBottom:
              dimensions.width < dimensions.height ? "auto" : undefined,
            // width: width < height ? "100%" : undefined,
            // height: height < height ? "100%" : undefined,
            userSelect: "none",
            mixBlendMode: "screen",
            zIndex: 2,
          }}
        >
          <BottomMap
            rockEdges={[...cells].filter(
              (c) => c.neighbours?.top?.isWall && !c.isWall
            )}
            exits={exits}
          />

          <TileMap />

          <ItemMap
            itemCells={[
              { type: "rubble", cells: [...cells].filter((c) => c.isObstacle) },
              { type: "poi", cells: POI ? [POI] : [] },
            ]}
          />

          <PlayerMap startCell={start} allCells={[...cells]} />
          <WallMap />

          <UIOverlay updateSeed={updateSeed} />
        </Box>
        <Box bgcolor={"#400438"} position={"absolute"} sx={{ inset: "0" }} />
      </Box>
      {/* <GridWrapper style={{ gap: 0 }}>
        {cells?.map((c) => (
          <Box
            key={`${c.n} - ${c.y}`}
            width={cellSize * 1.5}
            height={cellSize * 1.5}
            bgcolor={`rgb(${c.n * 255}, ${c.n * 255}, ${c.n * 255})`}
          ></Box>
        ))}
      </GridWrapper> */}
    </>
  );
};
