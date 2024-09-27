import { cellSize } from "@/utils/defaultValues";
import { Box } from "@mui/material";
import { CSSProperties, ReactNode } from "react";

interface Props {
  width: number;
  height: number;
  style?: CSSProperties;
  children?: ReactNode;
}
export const GridWrapper = ({ width, height, children, style = {} }: Props) => {
  return (
    <Box
      position={"absolute"}
      padding={`${cellSize}px`}
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
