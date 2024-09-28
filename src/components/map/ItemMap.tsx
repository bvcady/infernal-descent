import { Cell } from "@/types/Cell";
import { GridWrapper } from "../grid/GridWrapper";
import { Chest } from "../tiles/Chest";
import { Key } from "../tiles/Key";
import { Rubble } from "../tiles/Rubble";
import { useStore } from "zustand";
import { levelStore } from "@/stores/LevelStore";

interface Props {
  itemCells: { type: string; cells: Cell[] }[];
}
export const ItemMap = ({ itemCells }: Props) => {
  const { items } = useStore(levelStore, (state) => state);
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
          <Chest key={`exit - ${c.x} - ${c.y}`} cell={c} />
        ))}

      {itemCells
        .find((item) => item.type === "poi")
        ?.cells?.map((c) => (
          <Key key={`key - ${c.x} - ${c.y}`} cell={c} />
        ))}
    </GridWrapper>
  );
};
