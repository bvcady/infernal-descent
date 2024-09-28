/* eslint-disable @typescript-eslint/ban-ts-comment */
import { usePlayer } from "@/hooks/usePlayer";
import { Cell } from "@/types/Cell";
import { GridWrapper } from "../grid/GridWrapper";
import { Player } from "../tiles/Player";
// @ts-ignore

interface Props {
  start: Cell;
  allCells: Cell[];
  POI?: Cell;
}

export const PlayerMap = ({ start, allCells, POI }: Props) => {
  const { player } = usePlayer({ startCell: start, allCells, POI });

  return (
    <GridWrapper>
      {start ? (
        <Player key={`player - ${player?.x} - ${player?.y}`} cell={player} />
      ) : null}
    </GridWrapper>
  );
};
