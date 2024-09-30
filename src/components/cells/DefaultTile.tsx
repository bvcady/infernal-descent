import { windowStore } from "@/stores/WindowStore";
import { Cell } from "@/types/Cell";
import { Box } from "@mui/material";
import { CSSProperties, MutableRefObject } from "react";
import { useStore } from "zustand";

interface Props {
  ref?: MutableRefObject<HTMLDivElement | undefined>;
  className?: string;
  cell?: Cell;
  tileNumber?: number;
  style?: CSSProperties;
  noBackground?: boolean;
  onClick?: () => void;
}
export const DefaultTile = ({
  ref,
  cell,
  tileNumber = -1,
  className = "",
  style = {},
  noBackground,
  onClick,
}: Props) => {
  const { cellSize } = useStore(windowStore, (state) => state);

  return (
    <Box
      onClick={() => onClick?.()}
      ref={ref}
      className={className}
      width={cellSize}
      height={cellSize}
      sx={{
        position: "absolute",
        backgroundColor: noBackground ? "transparent" : "black",
        gridColumnStart: (cell?.x || 0) + 1,
        gridRowStart: (cell?.y || 0) + 1,
        gridColumnEnd: "span 1",
        gridRowEnd: "span 1",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        ...style,
        backgroundImage:
          tileNumber >= 0
            ? `url("../../images/Monochrome/tilemap/new_tile${
                tileNumber + 1
              }.png")`
            : undefined,
      }}
    />
  );
};
