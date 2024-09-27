import { Room } from "@/types/Room";
import { scale } from "@/utils/scale";
import { shuffle } from "@/utils/shuffle";
import { useCallback, useEffect, useState } from "react";
import { useNoise } from "./useNoise";

interface Props {
  seed: string;
}

export const useRooms = ({ seed }: Props) => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const { genericNoise } = useNoise({ seed });

  const generateRooms = useCallback(() => {
    if (!seed) {
      setRooms([]);
    }
    const targetTotal = Math.floor(
      scale([-1, 1], [8, 14])(genericNoise(0.5, 1) || 0)
    );

    const roomGrid = new Array(5)
      .fill("")
      .map((_, y) =>
        new Array(5).fill("").map((_, x) => {
          return { x, y, isCollapsed: false };
        })
      )
      .flat() as Room[];

    const totalRooms = [] as Room[];

    while (totalRooms.length < targetTotal) {
      const options = [...roomGrid].filter((room) => {
        const top = roomGrid.find(
          (n) => room.x === n.x && room.y - 1 === n.y
        )?.isCollapsed;
        const bottom = roomGrid.find(
          (n) => room.x === n.x && room.y + 1 === n.y
        )?.isCollapsed;
        const right = roomGrid.find(
          (n) => room.x + 1 === n.x && room.y === n.y
        )?.isCollapsed;
        const left = roomGrid.find(
          (n) => room.x - 1 === n.x && room.y === n.y
        )?.isCollapsed;

        return !room.isCollapsed && (top || bottom || right || left);
      });

      const nextRoom =
        totalRooms.length === 0
          ? shuffle([...roomGrid])[0]
          : (shuffle(options)[0] as Room);

      const newSize = Math.floor(
        scale([-1, 1], [1, 5])(genericNoise(nextRoom.x, nextRoom.y) || 0)
      );

      nextRoom.isCollapsed = true;
      nextRoom.size = totalRooms?.length > 0 ? newSize : 3;

      const indexOfRoom = [...roomGrid].findIndex(
        (room) => room.x === nextRoom.x && room.y === nextRoom.y
      );

      if (indexOfRoom >= 0) roomGrid[indexOfRoom] = nextRoom;

      totalRooms.push(nextRoom);
    }
    console.log({ totalRooms });

    setRooms(totalRooms);
  }, [genericNoise, seed]);

  useEffect(() => {
    generateRooms();
  }, [seed]);

  return { rooms };
};
