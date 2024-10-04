/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEnterRoom } from "@/hooks/useEnterRoom";
import { useMovement } from "@/hooks/useMovement";
import { levelStore } from "@/stores/LevelStore";
import { playerStore } from "@/stores/PlayerStore";
import { Cell } from "@/types/Cell";
import { KeyboardDirection } from "@/types/KeyboardDirections";
import { useEffect, useState } from "react";
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
    inventory,
    digKeyIsDown,
    targetDiggingTile,
  } = useStore(playerStore);
  const { tiles } = useStore(levelStore);

  const [moveDirection, setMoveDirection] = useState<KeyboardDirection>();

  useEffect(() => {
    setPlayer(tiles.find((c) => c.x === startCell?.x && c.y === startCell?.y));
  }, [startCell]);

  const handleKeyUp = (e: KeyboardEvent) => {
    if (cardinals.includes(e.key)) {
      if (canMove) setMoveDirection(e.key as KeyboardDirection);
    }
  };

  useEffect(() => {
    addEventListener("keyup", handleKeyUp);
    return () => removeEventListener("keyup", handleKeyUp);
  }, [setMoveDirection, canMove]);

  useMovement({ moveDirection, setMoveDirection });
  useDig();
  usePlace();

  useEnterRoom();

  const cell = futureTile
    ? {
        ...futureTile?.tile,
        x: futureTile?.position.x,
        y: futureTile?.position?.y,
      }
    : undefined;

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
          cell={cell as Cell}
        />
      ) : null}
      {digKeyIsDown && player ? (
        <Shovel
          cell={
            (targetDiggingTile
              ? tiles?.find(
                  (t) =>
                    t.x === targetDiggingTile?.x && t.y === targetDiggingTile.y
                )
              : player) as Item
          }
          style={{ marginTop: "125%" }}
        />
      ) : null}
      {futureTile?.tile ? (
        <FloorTile style={{ zoom: 0.66 }} cell={futureTile.tile as Cell} />
      ) : null}
    </GridWrapper>
  );
};
