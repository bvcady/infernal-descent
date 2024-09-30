import { levelStore } from "@/stores/LevelStore";
import { windowStore } from "@/stores/WindowStore";
import { Box } from "@mui/material";
import { CSSProperties, ReactNode } from "react";
import { useStore } from "zustand";

interface Props {
  style?: CSSProperties;
  children?: ReactNode;
}
export const GridWrapper = ({ children, style = {} }: Props) => {
  const { cellSize } = useStore(windowStore, (state) => state);
  const { dimensions } = useStore(levelStore, (state) => state);
  const { width, height } = dimensions;
  return (
    <Box
      position={"absolute"}
      padding={`${cellSize}px`}
      width={"100%"}
      minWidth={"fit-content"}
      maxWidth={"fit-content"}
      sx={{
        display: "grid",
        gridTemplateColumns: `repeat(${width}, ${cellSize}px)`,
        gridTemplateRows: `repeat(${height}, ${cellSize}px)`,
        placeItems: "center",
        ...style,
      }}
    >
      {children}
    </Box>
  );
};
