"use client";

import { useGrid } from "@/hooks/useGrid";
import { useRooms } from "@/hooks/useRooms";
import { Box } from "@mui/material";
import { Dispatch } from "react";
import { BottomMap } from "../map/BottomMap";
import { ItemMap } from "../map/ItemMap";
import { PlayerMap } from "../map/PlayerMap";
import { TileMap } from "../map/TileMap";
import { Viewer } from "../map/Viewer";
import { WallMap } from "../map/WallMap";
import { UIOverlay } from "../ui/containers/RoomsOverlay";
import { CombinedMap } from "../map/CombinedMap";
interface Props {
  seed: string;
  setSeed: Dispatch<string>;
}

export const RoomMap = ({ seed, setSeed }: Props) => {
  useRooms({ seed });

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
      <Viewer>
        <CombinedMap>
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
              { type: "skull", cells: [...cells].filter((c) => c.skull) },
            ]}
          />

          <PlayerMap startCell={start} allCells={[...cells]} />
          <WallMap />
        </CombinedMap>

        <UIOverlay updateSeed={updateSeed} />
      </Viewer>
      <Box bgcolor={"#400438"} position={"absolute"} sx={{ inset: "0" }} />
    </>
  );
};
