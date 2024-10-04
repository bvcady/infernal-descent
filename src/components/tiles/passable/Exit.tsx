import { playerStore } from "@/stores/PlayerStore";
import { windowStore } from "@/stores/WindowStore";
import { Cell } from "@/types/Cell";
import { Room } from "@/types/Room";
import { useEffect, useMemo } from "react";
import { useStore } from "zustand";
import { DefaultTile } from "../default/DefaultTile";
import { runStore } from "@/stores/RunStore";

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
    console.log(actualExit?.entryRequirement);
  }, [playerIsOn]);

  // const defineRotation = () => {
  //   if (side === "top") {
  //     return "-90deg";
  //   }
  //   if (side === "right") {
  //     return "0deg";
  //   }
  //   if (side === "bottom") {
  //     return "90deg";
  //   }
  //   return "180deg";
  // };

  return (
    <DefaultTile
      cell={cell}
      // public/images/Monochrome/Tilemap/ok.png
      customPath={
        actualExit?.entryRequirement && !actualExit.isVisited
          ? "../../images/Monochrome/Tilemap/no_access.png"
          : "../../images/Monochrome/Tilemap/ok.png"
      }
      tileNumber={16 + 4 * d}
      noBackground
      // style={{ transform: `rotate(${defineRotation()})` }}
    />
  );
};
