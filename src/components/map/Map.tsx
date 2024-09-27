"use client";

import { useGrid } from "@/hooks/useGrid";
import { scale } from "@/utils/scale";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { BottomMap } from "./BottomMap";
import { ItemMap } from "./ItemMap";
import { PlayerMap } from "./PlayerMap";
import { TileMap } from "./TileMap";
import { WallMap } from "./WallMap";
import { Score } from "../ui/Score";
import { useRooms } from "@/hooks/useRooms";
import { RoomsOverlay } from "../ui/RoomsOverlay";
import { usePlaySound } from "@/hooks/usePlaySound";

const maxWidth = 5;
const stepSize = 10;
const cellSize = 24;

export const Map = () => {
  const [dimensions, setDimensions] = useState<{ x: number; y: number }>();
  const [density, setDensity] = useState(1);

  const { play } = usePlaySound({
    soundFile: "/Audio/Music/Retro/Retro Mystic.ogg",
    options: { playbackRate: 1, loop: true },
  });

  const setDimension = () => {
    const x =
      Math.floor(scale([0, 1], [2, maxWidth])(Math.random())) * stepSize;
    setDensity(Math.floor(Math.random() * 5));
    return setDimensions({
      x,
      y: Math.floor(x * (9 / 16)),
    });
  };

  useEffect(() => {
    setDimension();
  }, []);

  const width = dimensions?.x;
  const height = dimensions?.y;

  const [seed, setSeed] = useState<string>(
    (Math.random() + 1).toString(36).substring(7)
  );

  useEffect(() => {
    // play();
  }, [seed]);

  const { rooms } = useRooms({ seed });

  const grid = useGrid({
    width: dimensions?.x,
    height: dimensions?.y,
    seed,
    density,
  });

  const cells = grid?.cells || [];
  const start = grid?.start;
  const exit = grid?.exit;
  const POI = grid?.POI;

  const updateSeed = () => {
    const r = (Math.random() + 1).toString(36).substring(4).toLocaleUpperCase();
    setDimension();
    setSeed(r);
  };

  return (
    <Box
      position={"relative"}
      width={"fit-content"}
      height={"fit-content"}
      overflow={"hidden"}
      borderRadius={"4px"}
    >
      <Box
        position={"relative"}
        onClick={updateSeed}
        width={(maxWidth * stepSize + 4) * cellSize}
        height={(maxWidth * stepSize + 4) * cellSize * (9 / 16)}
        borderRadius={"4px"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        sx={{
          cursor: "pointer",
          mixBlendMode: "screen",
          zIndex: 3,
        }}
      >
        <BottomMap
          {...{ width, height }}
          bottomCells={[
            {
              type: "rock-bottom",
              cells: [...cells].filter(
                (c) => c.neighbours?.top?.isRock && !c.isRock
              ),
            },
          ]}
        />

        <TileMap
          {...{ width, height }}
          tileCells={[
            { type: "tile", cells: [...cells].filter((c) => c.isPath) },
          ]}
        />

        <ItemMap
          {...{ width, height }}
          itemCells={[
            { type: "rubble", cells: [...cells].filter((c) => c.isLava) },
            { type: "exit", cells: exit ? [exit] : [] },
            { type: "poi", cells: POI ? [POI] : [] },
          ]}
        />

        {start ? (
          <PlayerMap
            {...{ width, height }}
            start={start}
            allCells={[...cells]}
            POI={POI}
          />
        ) : null}

        <WallMap
          {...{ width, height }}
          wallCells={[
            { type: "wall", cells: [...cells].filter((c) => c.isRock) },
          ]}
        />
        <Score {...{ width, height }}>{/* <h2>Hello world</h2> */}</Score>
        <RoomsOverlay {...{ width, height }} rooms={rooms} />
      </Box>
      <Box bgcolor={"#082718"} position={"absolute"} sx={{ inset: "0" }} />
    </Box>
  );
};
