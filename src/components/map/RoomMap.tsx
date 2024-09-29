"use client";

import { useGrid } from "@/hooks/useGrid";
import { usePlaySound } from "@/hooks/usePlaySound";
import { Room } from "@/types/Room";
import { Box } from "@mui/material";
import { Dispatch, useEffect } from "react";
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
  const { play } = usePlaySound({
    soundFile: "/Audio/Music/Retro/Retro Mystic.ogg",
    options: { playbackRate: 1, loop: true },
  });

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
        alignItems={"center"}
      >
        <Box
          position={"relative"}
          width={"100%"}
          height={"100%"}
          borderRadius={"4px"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          sx={{
            userSelect: "none",
            mixBlendMode: "screen",
            zIndex: 2,
          }}
        >
          <BottomMap
            rockEdges={[...cells].filter(
              (c) => c.neighbours?.top?.isRock && !c.isRock
            )}
            exits={exits}
          />

          <TileMap />

          <ItemMap
            itemCells={[
              { type: "rubble", cells: [...cells].filter((c) => c.isLava) },
              { type: "poi", cells: POI ? [POI] : [] },
            ]}
          />

          <PlayerMap startCell={start} allCells={[...cells]} POI={POI} />
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
