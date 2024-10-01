import { Cell } from "@/types/Cell";
import { GridWrapper } from "../level/GridWrapper";
import { Exit } from "../tiles/passable/Exit";
import { Rubble } from "../items/Rubble";
import { Key } from "../items/Key";

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
