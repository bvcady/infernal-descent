import { playerStore } from "@/stores/PlayerStore";
import { runStore } from "@/stores/RunStore";
import { windowStore } from "@/stores/WindowStore";
import { Cell } from "@/types/Cell";
import { Room } from "@/types/Room";
import { useEffect, useMemo } from "react";
import { useStore } from "zustand";
import { DefaultTile } from "../default/DefaultTile";

interface Props {
  cell?: Cell;
  exit?: Room;
}

const d = 17;

export const Exit = ({ cell, exit }: Props) => {
  const { player } = useStore(playerStore);
  const { toggleShowAHint } = useStore(windowStore);
  const { rooms } = useStore(runStore);
  const actualExit = rooms.find((r) => r.id === exit?.id);

  const playerIsOn = useMemo(() => {
    return player?.x === cell?.x && player?.y === cell?.y;
  }, [player]);

  useEffect(() => {
    toggleShowAHint(playerIsOn);
  }, [playerIsOn]);

  useEffect(() => {}, []);

  return (
    <DefaultTile
      cell={cell}
      customPath={
        actualExit?.entryRequirement &&
        actualExit?.entryRequirement !== "to do" &&
        !actualExit.isVisited
          ? "../../images/Monochrome/Tilemap/no_access.png"
          : "../../images/Monochrome/Tilemap/ok.png"
      }
      tileNumber={16 + 4 * d}
      noBackground
    />
  );
};
