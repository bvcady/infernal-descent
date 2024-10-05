import { windowStore } from "@/stores/WindowStore";
import { Box } from "@mui/system";
import { useStore } from "zustand";
import { MiniMap } from "../informative/MiniMap";
import { PressHint } from "../informative/PressHint";
import { Inventory } from "./inventory/Inventory";
import { Shovel } from "@/components/items/Shovel";
import { Map } from "@/components/items/Map";
// import { Metronome } from "../informative/Metronome";

// const RoomsWrapper = styled(Box)`
//   color: white;
//   font-family: ${miniFont.style.fontFamily};
// `;

export const UIOverlay = () => {
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
      sx={{ inset: 0 }}
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
        sx={{ boxSizing: "border-box" }}
        position={"absolute"}
        width={"100%"}
        // height={cellSize}
        bottom={0}
        left={0}
        right={0}
        padding={`${cellSize / 2}px`}
        display={"flex"}
        justifyContent={"flex-end"}
        alignItems={"center"}
        overflow={"visible"}
        gap={`${cellSize / 5}px`}
      >
        <PressHint
          letter="B"
          icon={"map"}
          toggle={showBHint}
          style={{ marginRight: "auto" }}
        />
        <PressHint label="[S]TART" letter="S" toggle={showStartHint} />
        <PressHint letter="A" toggle={showAHint} />
        <PressHint letter="Z" icon={"shovel"} toggle={showZHint} />
        <PressHint letter="X" toggle={showXHint} />
      </Box>
    </Box>
  );
};
