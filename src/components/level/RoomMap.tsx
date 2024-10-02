"use client";

import { useGrid } from "@/hooks/useGrid";
import { useRooms } from "@/hooks/useRooms";
import { windowStore } from "@/stores/WindowStore";
import { Box } from "@mui/material";
import { Dispatch } from "react";
import { useStore } from "zustand";
import { ButtonArea } from "../console/ButtonArea";
import { Console } from "../console/Console";
import { ScreenPadding } from "../console/Console.styles";
import { ArrowButton } from "../console/controls/buttons/ArrowButton";
import { DirectionalPad } from "../console/controls/buttons/DirectionalPad";
import { LetterButton } from "../console/controls/buttons/LetterButton";
import { LetterButtonContainer } from "../console/controls/buttons/LetterButtonStyles";
import { SSButton } from "../console/controls/buttons/SSButton";
import { SSButtonContainer } from "../console/controls/buttons/SSButtonStyles";
import { BottomMap } from "../map/BottomMap";
import { CombinedMap } from "../map/CombinedMap";
import { ItemMap } from "../map/ItemMap";
import { PlayerMap } from "../map/PlayerMap";
import { TileMap } from "../map/TileMap";
import { Viewer } from "../map/Viewer";
import { WallMap } from "../map/WallMap";
import { UIOverlay } from "../ui/containers/RoomsOverlay";
import { WelcomeScreen } from "../ui/home/WelcomeScreen";

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

  const updateSeed = () => {
    const r = (Math.random() + 1).toString(36).substring(4).toLocaleUpperCase();
    setSeed(r);
  };

  const cells = grid?.cells || [];
  const start = grid?.start;
  const exits = grid?.exits;

  return (
    <>
      <Box
        position={"relative"}
        width={11 * cellSize}
        height={"100%"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Console p={cellSize / 2}>
          <ScreenPadding w={cellSize * 10}>
            <Box
              bgcolor={"#252533"}
              position={"absolute"}
              sx={{ inset: 0, zIndex: -1 }}
            />
            <Viewer>
              {seed ? (
                <CombinedMap>
                  <BottomMap
                    rockEdges={[...cells].filter(
                      (c) => c.neighbours?.top?.isWall && !c.isWall
                    )}
                    exits={exits}
                  />

                  <TileMap />
                  <ItemMap />
                  <PlayerMap startCell={start} />
                  <WallMap />
                </CombinedMap>
              ) : null}
              <UIOverlay />
            </Viewer>
            {!seed ? <WelcomeScreen setSeed={setSeed}></WelcomeScreen> : null}
          </ScreenPadding>

          <ButtonArea>
            <DirectionalPad>
              <ArrowButton
                dir="ArrowLeft"
                callback={() => {}}
                rotation="270deg"
              />
              <ArrowButton dir="ArrowUp" callback={() => {}} rotation="0deg" />
              <ArrowButton
                dir="ArrowRight"
                callback={() => {}}
                rotation="90deg"
              />
              <ArrowButton
                dir="ArrowDown"
                callback={() => {}}
                rotation="180deg"
              />
            </DirectionalPad>
            <SSButtonContainer w={cellSize}>
              <SSButton
                callback={() => {
                  updateSeed();
                }}
              />
              {/* <SSButton callback={() => {}} /> */}
            </SSButtonContainer>
            <LetterButtonContainer w={cellSize * 1.5}>
              <LetterButton letter="Z" color="blanchedalmond" />
              <LetterButton letter="X" color="#252533" />
            </LetterButtonContainer>
          </ButtonArea>
        </Console>
      </Box>
    </>
  );
};
