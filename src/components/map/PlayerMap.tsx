/* eslint-disable @typescript-eslint/ban-ts-comment */
import { usePlayer } from "@/hooks/usePlayer";
import { Cell } from "@/types/Cell";
import { GridWrapper } from "../grid/GridWrapper";
import { Player } from "../tiles/Player";
// @ts-ignore

interface Props {
  startCell: Cell;
  allCells: Cell[];
  POI?: Cell;
}

export const PlayerMap = ({ startCell, allCells, POI }: Props) => {
  usePlayer({ startCell, allCells, POI });
  return <GridWrapper>{<Player />}</GridWrapper>;
};
