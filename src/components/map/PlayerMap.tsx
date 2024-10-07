/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useDig } from "@/hooks/useDig";
import { useEnterRoom } from "@/hooks/useEnterRoom";
import { useMovement } from "@/hooks/useMovement";
import { usePlace } from "@/hooks/usePlace";
import { levelStore } from "@/stores/LevelStore";
import { playerStore } from "@/stores/PlayerStore";
import { Cell } from "@/types/Cell";
import { KeyboardDirection } from "@/types/KeyboardDirections";
import { useCallback, useEffect, useState } from "react";
import { useStore } from "zustand";
import { DefaultItem } from "../items/default/DefaultItem";
import { GridWrapper } from "../level/GridWrapper";
import { Player } from "../player/Player";
import { FloorTile } from "../tiles/passable/FloorTile";
import { windowStore } from "@/stores/WindowStore";
import { useAltar } from "@/hooks/useAltar";
import { useSkull } from "@/hooks/useSkull";
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
    inventory,
  } = useStore(playerStore);
  const { tiles } = useStore(levelStore);
  const { beat } = useStore(windowStore);

  const [moveDirection, setMoveDirection] = useState<KeyboardDirection>();

  useEffect(() => {
    setPlayer(tiles.find((c) => c.x === startCell?.x && c.y === startCell?.y));
  }, [startCell]);

  useEffect(() => {
    console.log({ inventory });
  }, [inventory]);
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
  useAltar();
  const { arrow } = useSkull({ setMoveDirection });

  const shovelCell = targetDiggingTile
    ? { ...player, x: targetDiggingTile.x, y: targetDiggingTile.y }
    : player;

  return (
    <GridWrapper>
      {arrow && player ? (
        <DefaultItem
          isStatic
          itemStyle={{ zoom: 3, opacity: 0.8, mixBlendMode: "multiply" }}
          customSpriteName={arrow}
          positionOverride={{ x: player.x, y: player.y }}
        />
      ) : null}
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
      {placeKeyIsDown && futureTile ? (
        <DefaultItem
          // isStatic
          itemStyle={{
            zoom: 0.66,
            zIndex: 100,
            transform: "translateY(-100%)",
            border: "4px solid black",
            borderRadius: "2px",
          }}
          positionOverride={futureTile.position}
          customSpriteName={
            inventory?.tiles.find((t) => t?.n === Math.floor(beat / 2))
              ? "default_tile"
              : "empty"
          }
        />
      ) : null}
      {digKeyIsDown && player ? (
        <DefaultItem
          isStatic
          customSpriteName="shovel"
          positionOverride={shovelCell}
          itemStyle={{ zoom: 0.75, zIndex: 1000 }}
        />
      ) : null}
    </GridWrapper>
  );
};
