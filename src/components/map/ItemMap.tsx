import { Cell } from "@/types/Cell";
import { GridWrapper } from "../grid/GridWrapper";
import { Exit } from "../tiles/Exit";
import { Key } from "../tiles/Key";
import { Rubble } from "../tiles/Rubble";

interface Props {
  itemCells: { type: string; cells: Cell[] }[];
}
export const ItemMap = ({ itemCells }: Props) => {
  return (
    <GridWrapper>
      {itemCells
        .find((item) => item.type === "rubble")
        ?.cells.map((cell) => (
          <Rubble key={`rubble - ${cell.x} - ${cell.y}`} cell={cell} />
        ))}

      {itemCells
        .find((item) => item.type === "exit")
        ?.cells?.map((c) => (
          <Exit key={`exit - ${c.x} - ${c.y}`} cell={c} />
        ))}

      {itemCells
        .find((item) => item.type === "poi")
        ?.cells?.map((c) => (
          <Key key={`key - ${c.x} - ${c.y}`} cell={c} />
        ))}
      {itemCells
        .find((item) => item.type === "skull")
        ?.cells?.map((c) => (
          <Key key={`skull - ${c.x} - ${c.y}`} cell={c} />
        ))}
    </GridWrapper>
  );
};
