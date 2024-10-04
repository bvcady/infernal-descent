/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEnterRoom } from "@/hooks/useEnterRoom";
import { useMovement } from "@/hooks/useMovement";
import { levelStore } from "@/stores/LevelStore";
import { playerStore } from "@/stores/PlayerStore";
import { Cell } from "@/types/Cell";
import { KeyboardDirection } from "@/types/KeyboardDirections";
import { useCallback, useEffect, useState } from "react";
import { useStore } from "zustand";
import { GridWrapper } from "../level/GridWrapper";
import { Player } from "../player/Player";
import { useDig } from "@/hooks/useDig";
import { usePlace } from "@/hooks/usePlace";
import { FloorTile } from "../tiles/passable/FloorTile";
import { Shovel } from "../items/Shovel";
import { Item } from "@/types/Item";
// @ts-ignore

interface Props {
  startCell?: Cell;
}

const cardinals = ["ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft"];

export const PlayerMap = ({ startCell }: Props) => {
  const {
    setPlayer,
    canMove,
    futureTile,
    placeKeyIsDown,
    player,
    digKeyIsDown,
    targetDiggingTile,
  } = useStore(playerStore);
  const { tiles } = useStore(levelStore);

  const [moveDirection, setMoveDirection] = useState<KeyboardDirection>();

  useEffect(() => {
    setPlayer(tiles.find((c) => c.x === startCell?.x && c.y === startCell?.y));
  }, [startCell]);

  const handleKeyUp = useCallback(
    (e: KeyboardEvent) => {
      if (cardinals.includes(e.key)) {
        if (!digKeyIsDown && !placeKeyIsDown && canMove)
          setMoveDirection(e.key as KeyboardDirection);
      }
    },
    [canMove, digKeyIsDown, placeKeyIsDown]
  );

  useEffect(() => {
    addEventListener("keyup", handleKeyUp);
    return () => removeEventListener("keyup", handleKeyUp);
  }, [handleKeyUp]);

  useMovement({ moveDirection, setMoveDirection });
  useEnterRoom();
  useDig();
  usePlace();

  const shovelCell = targetDiggingTile
    ? { ...player, x: targetDiggingTile.x, y: targetDiggingTile.y }
    : player;

  return (
    <GridWrapper>
      <Player />
      {placeKeyIsDown && player && !futureTile ? (
        <FloorTile
          style={{
            zoom: 0.5,
            zIndex: 100,
            transform: "translateY(-100%)",
            border: "4px solid black",
            borderRadius: "2px",
          }}
          cell={player}
        />
      ) : null}
      {placeKeyIsDown && futureTile?.tile ? (
        <FloorTile
          style={{ zoom: 0.66 }}
          cell={
            {
              ...futureTile.tile,
              x: futureTile.position.x,
              y: futureTile.position.y,
            } as Cell
          }
        />
      ) : null}
      {digKeyIsDown && player ? (
        <Shovel cell={shovelCell as Item} style={{ marginTop: "125%" }} />
      ) : null}
    </GridWrapper>
  );
};
