import { Cell } from "@/types/Cell";
import { Box } from "@mui/material";

interface Props {
  cellSize?: number;
  cell?: Cell;
}

const d = 17;

export const Rock = ({ cellSize = 16, cell }: Props) => {
  // const topCell = cell?.neighbours?.top;
  // const bottomCell = cell?.neighbours?.bottom;
  // const rightCell = cell?.neighbours?.right;
  // const leftCell = cell?.neighbours?.left;

  // const nextToPath =
  //   topCell?.isPath ||
  //   bottomCell?.isPath ||
  //   rightCell?.isPath ||
  //   leftCell?.isPath;

  const getFromTileset = () => {
    const top = cell?.neighbours?.top?.isRock;
    const bottom = cell?.neighbours?.bottom?.isRock;
    const right = cell?.neighbours?.right?.isRock;
    const left = cell?.neighbours?.left?.isRock;

    // center tile
    if (top && bottom && left && right) {
      return 13 + 2 * d;
    }

    if (top && bottom && right) {
      return 9 + 5 * d;
    }
    if (top && bottom && left) {
      return 11 + 5 * d;
    }
    if (top && right && left) {
      return 10 + 6 * d;
    }
    if (bottom && right && left) {
      return 10 + 4 * d;
    }

    if (bottom && right) {
      return 6;
    }
    if (bottom && left) {
      return 8;
    }
    if (top && right) {
      return 2 * d + 6;
    }
    if (top && left) {
      return 2 * d + 8;
    }

    if (left && right) {
      return 7;
    }
    if (top && bottom) {
      return 1 * d + 6;
    }

    if (top) {
      return 13 + 4 * d;
    }

    if (bottom) {
      return 13;
    }

    if (left) {
      return 15 + 2 * d;
    }
    if (right) {
      return 11 + 2 * d;
    }

    return 16;
  };

  return (
    <Box
      className={"rock"}
      width={cellSize}
      height={cellSize}
      sx={{
        position: "absolute",
        zIndex: 2,
        backgroundColor: "black",
        transform: "translateY(-50%)",
        // backgroundColor: nextToPath ? "white" : undefined,
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
