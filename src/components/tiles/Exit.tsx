import { Cell } from "@/types/Cell";
import { DefaultTile } from "../cells/DefaultTile";
import { useState } from "react";
import { useStore } from "zustand";
import { runStore } from "@/stores/RunStore";
import { Room } from "@/types/Room";

type Direction = "top" | "bottom" | "left" | "right";

interface Props {
  cell?: Cell;
  side?: Direction;
  exit?: Room;
}

const d = 17;

export const Exit = ({ cell, side, exit }: Props) => {
  const { setCurrentRoom, rooms, currentRoom, setPreviousRoom } =
    useStore(runStore);
  const defineRotation = () => {
    if (side === "top") {
      return "-90deg";
    }
    if (side === "right") {
      return "0deg";
    }
    if (side === "bottom") {
      return "90deg";
    }
    return "180deg";
  };
  return (
    <DefaultTile
      onClick={() => {
        setPreviousRoom(currentRoom);
        setCurrentRoom(rooms.find((r) => r.x === exit?.x && r.y === exit.y));
      }}
      cell={cell}
      tileNumber={16 + 4 * d}
      noBackground
      style={{ transform: `rotate(${defineRotation()})` }}
    />
  );
};
