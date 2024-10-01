import { Cell } from "@/types/Cell";
import { DefaultTile } from "../tiles/default/DefaultTile";

interface Props {
  cell?: Cell;
}

const d = 17;

export const Chest = ({ cell }: Props) => {
  return <DefaultTile cell={cell} tileNumber={15 + 4 * d} noBackground />;
};
