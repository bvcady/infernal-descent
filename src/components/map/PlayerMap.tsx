/* eslint-disable @typescript-eslint/ban-ts-comment */
import { usePlayer } from "@/hooks/usePlayer";
import { Cell } from "@/types/Cell";
import { cellSize } from "@/utils/defaultValues";
import { GridWrapper } from "../grid/GridWrapper";
import { Player } from "../tiles/Player";
// @ts-ignore

interface Props {
  width?: number;
  height?: number;
  start: Cell;
  allCells: Cell[];
  POI?: Cell;
}

export const PlayerMap = ({
  width = 10,
  height = 10,
  start,
  allCells,
  POI,
}: Props) => {
  const { player } = usePlayer({ startCell: start, allCells, POI });

  return (
    <GridWrapper {...{ width, height }}>
      {start ? (
        <Player
          key={`player - ${player?.x} - ${player?.y}`}
          cellSize={cellSize}
          cell={player}
        />
      ) : null}
    </GridWrapper>
  );
};
