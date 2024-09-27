import { Cell } from "@/types/Cell";
import { cellSize } from "@/utils/defaultValues";
import { GridWrapper } from "../grid/GridWrapper";
import { Chest } from "../tiles/Chest";
import { Key } from "../tiles/Key";
import { Rubble } from "../tiles/Rubble";

interface Props {
  width?: number;
  height?: number;
  itemCells: { type: string; cells: Cell[] }[];
}
export const ItemMap = ({ width = 10, height = 10, itemCells }: Props) => {
  return (
    <GridWrapper {...{ width, height }}>
      {itemCells
        .find((item) => item.type === "rubble")
        ?.cells.map((cell) => (
          <Rubble
            key={`rubble - ${cell.x} - ${cell.y}`}
            cell={cell}
            cellSize={cellSize}
          />
        ))}

      {itemCells
        .find((item) => item.type === "exit")
        ?.cells?.map((c) => (
          <Chest key={`exit - ${c.x} - ${c.y}`} cellSize={cellSize} cell={c} />
        ))}

      {itemCells
        .find((item) => item.type === "poi")
        ?.cells?.map((c) => (
          <Key key={`key - ${c.x} - ${c.y}`} cellSize={cellSize} cell={c} />
        ))}
    </GridWrapper>
  );
};
