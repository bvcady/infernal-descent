import { Cell } from "@/types/Cell";
import { DefaultTile } from "./DefaultTile";

interface Props {
  cell?: Cell;
}

const d = 17;

export const Wall = ({ cell }: Props) => {
  const getFromTileset = () => {
    const top = cell?.neighbours?.top?.isWall;
    const bottom = cell?.neighbours?.bottom?.isWall;
    const right = cell?.neighbours?.right?.isWall;
    const left = cell?.neighbours?.left?.isWall;

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
    <DefaultTile
      cell={cell}
      tileNumber={getFromTileset()}
      style={{ transform: "translateY(-50%)" }}
    />
  );
};
