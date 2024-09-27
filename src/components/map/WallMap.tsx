import { Cell } from "@/types/Cell";
import { cellSize } from "@/utils/defaultValues";
import { Rock } from "../cells/Rock";
import { GridWrapper } from "../grid/GridWrapper";

interface Props {
  width?: number;
  height?: number;
  wallCells: { type: string; cells: Cell[] }[];
}
export const WallMap = ({ width = 10, height = 10, wallCells }: Props) => {
  return (
    <GridWrapper {...{ width, height }}>
      {wallCells
        .find((item) => {
          const isWall = item.type === "wall";
          return isWall;
        })
        ?.cells.map((cell) => (
          <Rock
            key={`wall - ${cell.x} - ${cell.y}`}
            cell={cell}
            cellSize={cellSize}
          />
        ))}
    </GridWrapper>
  );
};
