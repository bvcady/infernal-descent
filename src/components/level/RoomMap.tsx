"use client";

import { useGrid } from "@/hooks/useGrid";
import { useRooms } from "@/hooks/useRooms";
import { playerStore } from "@/stores/PlayerStore";
import { windowStore } from "@/stores/WindowStore";
import { Box, Drawer } from "@mui/material";
import { Dispatch, useEffect, useState } from "react";
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
import { Button } from "../ui/interactive/Button";
import { WinScreen } from "../ui/win/WinScreen";
import { DefaultItem } from "../items/default/DefaultItem";
import { miniFont } from "@/utils/defaultValues";
import { runStore } from "@/stores/RunStore";

interface Props {
  seed: string;
  setSeed: Dispatch<string>;
}

export const RoomMap = ({ seed, setSeed }: Props) => {
  const [infoOpen, toggleInfoOpen] = useState(false);
  useRooms({ seed });
  const { currentRoom } = useStore(runStore);
  const { stats, hasWon } = useStore(playerStore);
  const {
    cellSize,
    toggleShowStartHint,
    toggleShowAHint,
    toggleShowBHint,
    toggleShowXHint,
    toggleShowZHint,
  } = useStore(windowStore);

  const grid = useGrid({
    seed,
  });

  const [width, setWidth] = useState<number>(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 768;

  const updateSeed = () => {
    const r = (Math.random() + 1).toString(36).substring(4).toLocaleUpperCase();
    setSeed(r);
  };

  useEffect(() => {
    if (stats.health <= 0) {
      toggleShowStartHint(true);
      toggleShowAHint("");
      toggleShowBHint(false);
      toggleShowZHint(false);
      toggleShowXHint(false);
    }
  }, [stats.health]);

  const cells = grid?.cells || [];
  const start = grid?.start;
  const exits = grid?.exits;

  return (
    <>
      <Box
        position={"relative"}
        width={"100%"}
        height={"100%"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Button
          label="HINTS"
          style={{
            maxHeight: "fit-content",
            position: "fixed",
            top: cellSize * 1.5,
            left: cellSize * 0.5,
            margin: "1rem",
          }}
          callback={() => {
            toggleInfoOpen(true);
          }}
        />
        <Drawer
          open={infoOpen}
          onClose={() => toggleInfoOpen(false)}
          style={{}}
          ModalProps={{
            sx: {
              overflowY: "scroll",
            },
          }}
          PaperProps={{
            sx: {
              fontFamily: miniFont.style.fontFamily,
              fontSize: "12px",
              background: "#b0b0b0",
              width: "100%",
              maxWidth: "min(400px, 80dvw)",
              padding: "1rem",
              overflowY: "scroll",
            },
          }}
        >
          <span style={{ fontSize: "20px" }}>GOAL</span>
          <Box display={"flex"} alignItems={"center"} padding={"1rem"}>
            You are investigating the behaviour of a previously well-trusted
            volcano. The townsfolk have experienced more irratic quakes and
            ecological events coming from there. Reach the Altar in the room
            indicated with the Skull to exit the volcano. Do this before you
            succumb to exhaustion and seismic events. Rooms have their own
            requirement for entry. BE CAREFUL.
          </Box>

          <span style={{ fontSize: "20px" }}>CONTROLS</span>
          <Box display={"flex"} alignItems={"center"}>
            Use directional pad to move.
          </Box>
          <Box display={"flex"} alignItems={"center"}>
            <DefaultItem isStatic customSpriteName="shovel" /> Use Z to start
            digging and directional pad to point.
          </Box>
          <Box display={"flex"} alignItems={"center"}>
            <DefaultItem isStatic customSpriteName="empty" /> Use X to place
            tile - directional pad to point.
          </Box>
          <Box display={"flex"} alignItems={"center"}>
            <DefaultItem isStatic customSpriteName="map" /> Use B to show mini
            map.
          </Box>
          <Box display={"flex"} alignItems={"center"}>
            Use A to pick up or move other interactions.
          </Box>
          <Box display={"flex"} alignItems={"center"}>
            The start button or S will restart the game.
          </Box>

          <span style={{ fontSize: "20px" }}>LEGEND</span>
          <Box
            display={"flex"}
            gap={"0.5rem"}
            maxWidth={"100%"}
            width={"100%"}
            sx={{ flexFlow: "wrap", alignItems: "center" }}
          >
            <span>
              <DefaultItem isStatic customSpriteName="key" /> Key
            </span>
            <span>
              <DefaultItem isStatic customSpriteName="chest_closed" /> Chest
            </span>
            <span>
              <DefaultItem isStatic customSpriteName="heart_whole" /> Heart
            </span>
            <span>
              <DefaultItem isStatic customSpriteName="ok" /> Exit (Open)
            </span>
            <span>
              <DefaultItem isStatic customSpriteName="no_access" /> Exit
              (Closed)
            </span>
            <span>
              <DefaultItem isStatic customSpriteName="shard_one" /> Shard
              (Currency)
            </span>
            <span>
              <DefaultItem isStatic customSpriteName="shovel" />
              Shovel
            </span>
            <span>
              <DefaultItem isStatic customSpriteName="heart_half" /> Half A
              Heart
            </span>
            <span>
              <DefaultItem isStatic customSpriteName="heart_temporary" />{" "}
              Temporary Heart
            </span>
            <span>
              <DefaultItem isStatic customSpriteName="rubble" /> Rubble
            </span>
            <span>
              <DefaultItem isStatic customSpriteName="spikes" /> Spikes (Damage)
            </span>
            <span>
              <DefaultItem isStatic customSpriteName="lava" /> Lava (Damage)
            </span>
            <span>
              <DefaultItem isStatic customSpriteName="skull" /> {`Skull (???)`}
            </span>
          </Box>
        </Drawer>
        {/* <Console p={cellSize / 2}>
          <ScreenPadding w={cellSize * 10}>
            <Box
              bgcolor={currentRoom?.bgColor ?? "#252533"}
              position={"absolute"}
              sx={{ inset: 0, zIndex: -1 }}
            />
            <Viewer> */}
        {seed && stats.health > 0 && !hasWon ? (
          <CombinedMap isMobile={isMobile}>
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
        <UIOverlay isMobile={isMobile} />
        {/* </Viewer> */}
        {seed && stats.health > 0 && hasWon ? <WinScreen /> : null}
        {!seed || stats.health <= 0 ? (
          <WelcomeScreen dead={stats.health <= 0} />
        ) : null}
        {/* </ScreenPadding> */}
        <ButtonArea isMobile={isMobile}>
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
            <div
              style={{
                gridRow: "2 / span 1",
                gridColumn: "2 / span 1",
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                width: Math.min(cellSize, 100),
                height: Math.min(cellSize, 100),
              }}
            />
          </DirectionalPad>
          <SSButtonContainer w={cellSize / 1.5}>
            <SSButton
              callback={() => {
                updateSeed();
              }}
            />
          </SSButtonContainer>
          <Box display={"flex"} flexDirection={"column"}>
            <LetterButtonContainer
              w={cellSize * 1.125}
              marginLeft={"-20%"}
              mt={"10%"}
            >
              <LetterButton letter="X" color="#e24e4e" />
              <LetterButton letter="Z" color="#5454a7" />
            </LetterButtonContainer>
            <LetterButtonContainer w={cellSize * 1.125}>
              <LetterButton letter="B" color="#c89a3f" />
              <LetterButton letter="A" color="#399a4e" />
            </LetterButtonContainer>
          </Box>
        </ButtonArea>
      </Box>
    </>
  );
};
