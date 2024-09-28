import { Cell } from "@/types/Cell";

import { GridWrapper } from "../grid/GridWrapper";
import { RockBottom } from "../tiles/RockBottom";

interface Props {
  rockEdges: Cell[];
}
export const BottomMap = ({ rockEdges }: Props) => {
  return (
    <GridWrapper>
      {rockEdges.map((cell) => (
        <RockBottom key={`rockbottom - ${cell.x} - ${cell.y}`} cell={cell} />
      ))}
    </GridWrapper>
  );
};
