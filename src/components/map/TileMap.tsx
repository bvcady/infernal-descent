import { Cell } from "@/types/Cell";
import { cellSize } from "@/utils/defaultValues";
import { Path } from "../cells/Path";
import { GridWrapper } from "../grid/GridWrapper";

interface Props {
  width?: number;
  height?: number;
  tileCells: { type: string; cells: Cell[] }[];
}
export const TileMap = ({ width = 10, height = 10, tileCells }: Props) => {
  return (
    <GridWrapper {...{ width, height }}>
      {tileCells
        .find((item) => item.type === "tile")
        ?.cells.map((cell) => (
          <Path
            key={`tile - ${cell.x} - ${cell.y}`}
            cell={cell}
            cellSize={cellSize}
          />
        ))}
    </GridWrapper>
  );
};
