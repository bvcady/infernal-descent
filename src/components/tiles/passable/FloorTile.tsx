import { Cell } from "@/types/Cell";
import { scale } from "@/utils/scale";
import { DefaultTile } from "../default/DefaultTile";
import { CSSProperties } from "react";
import { Box } from "@mui/material";
import { useStore } from "zustand";
import { windowStore } from "@/stores/WindowStore";

interface Props {
  cell?: Cell;
  style?: CSSProperties;
}

const d = 17;

export const FloorTile = ({ cell, style = {} }: Props) => {
  const { cellSize } = useStore(windowStore);
  const getFromTileset = () => {
    const tileOptions = [0, 0, 0, 0, 1, 2, 4 + d];

    const mappedNValue = Math.abs(1 / 2 - (cell?.n || 0));
    const picked = Math.floor(
      scale([0, 1 / 2], [0, tileOptions.length])(mappedNValue)
    );

    return tileOptions[picked];
  };

  const pickedTile = getFromTileset();

  if (!cell) {
    return null;
  }

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
      sx={{ filter: "url(#displacementFilter)" }}
      // border={"1px solid white"}
    />
    // <DefaultTile style={{ ...style }} cell={cell} tileNumber={pickedTile} />
  );
};
