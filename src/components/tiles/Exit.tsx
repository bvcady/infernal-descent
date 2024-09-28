import { Cell } from "@/types/Cell";
import { DefaultTile } from "../cells/DefaultTile";

interface Props {
  cell?: Cell;
}

const d = 17;

export const Exit = ({ cell }: Props) => {
  return <DefaultTile cell={cell} tileNumber={16 + 4 * d} noBackground />;
};
