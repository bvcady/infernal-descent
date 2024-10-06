import { playerStore } from "@/stores/PlayerStore";
import { runStore } from "@/stores/RunStore";
import { windowStore } from "@/stores/WindowStore";
import { Cell } from "@/types/Cell";
import { Room } from "@/types/Room";
import { act, useEffect, useMemo } from "react";
import { useStore } from "zustand";
import { DefaultTile } from "../default/DefaultTile";
import { Box } from "@mui/material";
import { createPortal } from "react-dom";
import { ExitMenu } from "@/components/ui/interactive/ExitMenu";

interface Props {
  cell?: Cell;
  exit?: Room;
}

const d = 17;

export const Exit = ({ cell, exit }: Props) => {
  const { player } = useStore(playerStore);
  const { toggleShowAHint, showAHint } = useStore(windowStore);
  const { rooms } = useStore(runStore);
  const actualExit = rooms.find((r) => r.id === exit?.id);

  const playerIsOn = useMemo(() => {
    return player?.x === cell?.x && player?.y === cell?.y;
  }, [player]);

  useEffect(() => {
    toggleShowAHint(playerIsOn ? "exit" : "");
  }, [playerIsOn]);

  return (
    <>
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
      {actualExit && !actualExit?.isVisited && playerIsOn ? (
        <ExitMenu exit={actualExit} />
      ) : null}
    </>
  );
};
