import { windowStore } from "@/stores/WindowStore";
import { Box } from "@mui/system";
import { useStore } from "zustand";
import { MiniMap } from "../informative/MiniMap";
import { PressHint } from "../informative/PressHint";
import { Inventory } from "./inventory/Inventory";

interface Props {
  isMobile?: boolean;
}
export const UIOverlay = ({ isMobile }: Props) => {
  const {
    cellSize,
    showAHint,
    showBHint,
    showXHint,
    showZHint,
    showStartHint,
  } = useStore(windowStore);

  return (
    <Box
      width={"100%"}
      height={"100%"}
      position={"absolute"}
      sx={{ inset: 0, pointerEvents: "none" }}
      display={"flex"}
      gap={"1rem"}
    >
      <Box
        position={"absolute"}
        right={0}
        top={0}
        width={"50%"}
        bottom={0}
        sx={{
          pointerEvents: "none",
          zIndex: 2,
          backgroundColor: "rgba(1, 1, 1, 0.7)",
          backdropFilter: "blur(4px)",
          mask: `linear-gradient(
                  to left,
                  rgba(0, 0, 0, 1) 0%,
                  rgba(0, 0, 0, 0) 37.5%
                )`,
        }}
      ></Box>
      <Box
        position={"absolute"}
        left={0}
        top={0}
        width={"50%"}
        bottom={0}
        sx={{
          pointerEvents: "none",
          zIndex: 2,
          backgroundColor: "rgba(1, 1, 1, 0.7)",
          backdropFilter: "blur(4px)",
          mask: `linear-gradient(
                  to right,
                  rgba(0, 0, 0, 1) 0%,
                  rgba(0, 0, 0, 0) 37.5%
                )`,
        }}
      />
      <Inventory />
      <MiniMap />
      <Box
        id={"ui-screen"}
        sx={{
          boxSizing: "border-box",
          inset: 0,
          bottom: isMobile ? cellSize * 3.5 : 0,
        }}
        position={"absolute"}
        width={"100%"}
        padding={`${cellSize / 2}px`}
        display={"flex"}
        justifyContent={"flex-end"}
        alignItems={"center"}
        overflow={"visible"}
        gap={`${cellSize / 5}px`}
      >
        <Box
          mr="auto"
          mt="auto"
          display={"flex"}
          flexDirection={"column"}
          gap="4px"
        >
          <PressHint letter="A" toggle={showAHint} />
          <PressHint letter="B" icon={"map"} toggle={showBHint} />
        </Box>
        <PressHint
          label="[S]TART"
          letter="S"
          toggle={showStartHint}
          style={{ marginTop: "auto" }}
        />
        <Box
          ml={"auto"}
          mt={"auto"}
          display={"flex"}
          flexDirection={"column"}
          gap="4px"
        >
          <PressHint letter="X" icon={"place"} toggle={showXHint} righty />
          <PressHint letter="Z" icon={"shovel"} toggle={showZHint} righty />
        </Box>
      </Box>
    </Box>
  );
};
