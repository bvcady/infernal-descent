import { Cell } from "@/types/Cell";
import { Room } from "@/types/Room";
import { DefaultTile } from "../cells/DefaultTile";

type Direction = "top" | "bottom" | "left" | "right";

interface Props {
  cell?: Cell;
  side?: Direction;
  exit?: Room;
}

const d = 17;

export const Exit = ({ cell, side }: Props) => {
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
      cell={cell}
      tileNumber={16 + 4 * d}
      noBackground
      style={{ transform: `rotate(${defineRotation()})` }}
    />
  );
};
