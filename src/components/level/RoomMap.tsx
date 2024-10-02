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
import { useStore } from "zustand";
import { windowStore } from "@/stores/WindowStore";
import { Console } from "../console/Console";
import { ScreenPadding } from "../console/Console.styles";
import { Grate } from "../console/Grate";
import { ButtonArea } from "../console/ButtonArea";
import { DirectionalPad } from "../console/controls/buttons/DirectionalPad";
import { ArrowButton } from "../console/controls/buttons/ArrowButton";
import { SSButton } from "../console/controls/buttons/SSButton";
import { LetterButton } from "../console/controls/buttons/LetterButton";
interface Props {
  seed: string;
  setSeed: Dispatch<string>;
}

export const RoomMap = ({ seed, setSeed }: Props) => {
  useRooms({ seed });
  const { cellSize } = useStore(windowStore);

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
        width={11 * cellSize}
        height={11 * cellSize * 1.5}
        display={"flex"}
      >
        <Console p={cellSize / 2}>
          <ScreenPadding w={cellSize * 10}>
            {/* <ViewPort> */}
            <Box
              bgcolor={"#400438"}
              position={"absolute"}
              sx={{ inset: 0, zIndex: -1 }}
            />
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
                    {
                      type: "rubble",
                      cells: [...cells].filter((c) => c.isObstacle),
                    },
                    { type: "poi", cells: POI ? [POI] : [] },
                    {
                      type: "skull",
                      cells: [...cells].filter((c) => c.skull),
                    },
                  ]}
                />

                <PlayerMap startCell={start} allCells={[...cells]} />
                <WallMap />
              </CombinedMap>
              <UIOverlay updateSeed={updateSeed} />
            </Viewer>
            {/* </ViewPort> */}
          </ScreenPadding>
          <Grate />
          <ButtonArea>
            <DirectionalPad>
              <ArrowButton
                position="left"
                callback={() => {}}
                rotation="270deg"
              />
              <ArrowButton position="up" callback={() => {}} rotation="0deg" />
              <ArrowButton
                position="right"
                callback={() => {}}
                rotation="90deg"
              />
              <ArrowButton
                position="down"
                callback={() => {}}
                rotation="180deg"
              />
            </DirectionalPad>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                transform: "translateX(24px)",
              }}
            >
              <SSButton callback={() => {}} />
              <SSButton callback={() => {}} />
            </div>
            <div
              style={{
                width: "100%",
                alignItems: "flex-end",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <LetterButton letter="A" callback={() => null} />
              <LetterButton letter="B" callback={() => null} />
            </div>
          </ButtonArea>
        </Console>
      </Box>
    </>
  );
};
