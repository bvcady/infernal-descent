import { Cell } from "@/types/Cell";

import { GridWrapper } from "../grid/GridWrapper";
import { RockBottom } from "../tiles/RockBottom";
import { Room } from "@/types/Room";
import { Exit } from "../tiles/Exit";

type Direction = "top" | "bottom" | "left" | "right";

interface Props {
  rockEdges: Cell[];
  exits?: { exit?: Room; cell: Cell; side: Direction }[];
}
export const BottomMap = ({ rockEdges, exits }: Props) => {
  return (
    <GridWrapper>
      {rockEdges.map((cell) => (
        <RockBottom key={`rockbottom - ${cell.x} - ${cell.y}`} cell={cell} />
      ))}
      {exits
        ?.filter((e) => !!e.exit)
        .map((e) => (
          <Exit key={e.side} side={e.side} cell={e.cell} exit={e.exit} />
        ))}
    </GridWrapper>
  );
};
