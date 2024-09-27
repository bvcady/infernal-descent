import { Cell } from "@/types/Cell";
import { cellSize } from "@/utils/defaultValues";
import { GridWrapper } from "../grid/GridWrapper";
import { RockBottom } from "../tiles/RockBottom";

interface Props {
  width?: number;
  height?: number;
  bottomCells: { type: string; cells: Cell[] }[];
}
export const BottomMap = ({ width = 10, height = 10, bottomCells }: Props) => {
  return (
    <GridWrapper {...{ width, height }}>
      {bottomCells
        .find((item) => {
          const isWall = item.type === "rock-bottom";
          return isWall;
        })
        ?.cells.map((cell) => (
          <RockBottom
            key={`rockbottom - ${cell.x} - ${cell.y}`}
            cell={cell}
            cellSize={cellSize}
          />
        ))}
    </GridWrapper>
  );
};
