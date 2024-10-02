import { windowStore } from "@/stores/WindowStore";
import { Cell } from "@/types/Cell";
import { miniFont } from "@/utils/defaultValues";
import { Box } from "@mui/material";
import { CSSProperties, MutableRefObject, ReactNode } from "react";
import { useStore } from "zustand";

interface Props {
  ref?: MutableRefObject<HTMLDivElement | undefined>;
  className?: string;
  cell?: Cell;
  tileNumber?: number;
  customPath?: string;
  style?: CSSProperties;
  noBackground?: boolean;
  onClick?: () => void;
  hasShadow?: boolean;
  children?: ReactNode;
}
export const DefaultTile = ({
  ref,
  cell,
  tileNumber = -1,
  className = "",
  style = {},
  noBackground,
  onClick,
  customPath,
  hasShadow,
  children,
}: Props) => {
  const { cellSize } = useStore(windowStore, (state) => state);

  const bgPath = customPath
    ? `url("../../${customPath}")`
    : tileNumber >= 0
    ? `url("../../images/Monochrome/Tilemap/new_tile${tileNumber + 1}.png")`
    : undefined;
  return (
    <Box
      onClick={() => onClick?.()}
      ref={ref}
      className={className}
      width={cellSize}
      height={cellSize}
      sx={{
        backgroundColor: noBackground ? "transparent" : "black",
        gridColumnStart: (cell?.x || 0) + 1,
        gridRowStart: (cell?.y || 0) + 1,
        gridColumnEnd: "span 1",
        gridRowEnd: "span 1",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        pointerEvents: "none",
        ...style,
        backgroundImage: bgPath,
        boxShadow: hasShadow ? `0 4px 4px 0 rgba(0, 0, 0, 0.6)` : "unset",
        fontFamily: miniFont.style.fontFamily,
        display: "grid",
        placeItems: "center",
      }}
    >
      {children}
    </Box>
  );
};
