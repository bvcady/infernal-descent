import { Cell } from "@/types/Cell";

import { Room } from "@/types/Room";
import { GridWrapper } from "../level/GridWrapper";
import { RockBottom } from "../tiles/fixed/RockBottom";
import { Exit } from "../tiles/passable/Exit";

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
