import { Cell } from "@/types/Cell";
import { shuffle } from "@/utils/shuffle";
import { Box } from "@mui/material";
import { styled } from "@mui/system";
import { useEffect } from "react";

interface Props {
  cellSize?: number;
  cell?: Cell;
}
const PathTile = styled(Box)``;
const d = 17;

export const Path = ({ cellSize = 16, cell }: Props) => {
  const getFromTileset = () => {
    return shuffle([0, 0, 0, 0, 0, 0, 1, 2, 4 + d])[0];
  };

  return (
    <PathTile
      className="path"
      width={cellSize}
      height={cellSize}
      sx={{
        // boxShadow: " 0 0 2px 1px blue",
        gridColumnStart: (cell?.x || 0) + 1,
        gridRowStart: (cell?.y || 0) + 1,
        gridColumnEnd: "span 1",
        gridRowEnd: "span 1",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundImage:
          getFromTileset() >= 0
            ? `url("/images/Monochrome/tilemap/new_tile${
                getFromTileset() + 1
              }.png")`
            : undefined,
      }}
    />
  );
};
