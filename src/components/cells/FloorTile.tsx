import { Cell } from "@/types/Cell";
import { scale } from "@/utils/scale";
import { DefaultTile } from "./DefaultTile";

interface Props {
  cell?: Cell;
}

const d = 17;

export const FloorTile = ({ cell }: Props) => {
  const getFromTileset = () => {
    const tileOptions = [0, 0, 0, 0, 0, 0, 1, 2, 4 + d];

    const mappedNValue = Math.abs(1 / 2 - (cell?.n || 0));
    const picked = Math.floor(
      scale([0, 1 / 2], [0, tileOptions.length])(mappedNValue)
    );

    return tileOptions[picked];
  };

  const pickedTile = getFromTileset();

  return <DefaultTile cell={cell} tileNumber={pickedTile} />;
};
