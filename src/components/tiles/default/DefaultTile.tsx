import { windowStore } from "@/stores/WindowStore";
import { Cell } from "@/types/Cell";
import { miniFont } from "@/utils/defaultValues";
import { Box } from "@mui/material";
import { CSSProperties, MutableRefObject, ReactNode } from "react";
import { useStore } from "zustand";

interface Props {
  tileRef?: MutableRefObject<HTMLDivElement | undefined>;
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
  tileRef,
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
  // const bgPath = customPath
  //   ? `url("../../${customPath}")`
  //   : tileNumber >= 0
  //   ? `url("../../images/Monochrome/Tilemap/new_tile${tileNumber + 1}.png")`
  //   : undefined;

  const x = cell?.x || -2;
  const y = cell?.y || -2;

  return (
    <Box
      width={cellSize * 0.9}
      height={cellSize * 0.9}
      gridColumn={`${x + 1} / span 1`}
      gridRow={`${y + 1} / span 1`}
      bgcolor={"white"}
      borderRadius={"4px"}
      // border={"1px solid white"}
    >
      {children}
    </Box>
  );
};
