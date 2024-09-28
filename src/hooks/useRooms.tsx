import { runStore } from "@/stores/RunStore";
import { Room } from "@/types/Room";
import { generateNoise, shuffle } from "@/utils/noise";
import { scale } from "@/utils/scale";
import Alea from "alea";

import { useCallback, useEffect } from "react";
import { useStore } from "zustand";

interface Props {
  seed: string;
}

export const useRooms = ({ seed }: Props) => {
  const { rooms, setRooms, setCurrentRoom } = useStore(
    runStore,
    (state) => state
  );

  const generateRooms = useCallback(() => {
    const r = Alea(seed);

    if (!seed) {
      setRooms([]);
    }

    const targetTotal = Math.floor(
      scale([0, 1], [8, 14])(generateNoise({ random: r }))
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
          ? shuffle([...roomGrid], r)[0]
          : (shuffle(options, r)[0] as Room);

      const newSize = Math.floor(
        scale(
          [0, 1],
          [1, 4]
        )(
          generateNoise({
            random: r,
          })
        )
      );

      nextRoom.isCollapsed = true;
      nextRoom.size = totalRooms?.length > 0 ? newSize : 3;

      const indexOfRoom = [...roomGrid].findIndex(
        (room) => room.x === nextRoom.x && room.y === nextRoom.y
      );

      if (indexOfRoom >= 0) roomGrid[indexOfRoom] = nextRoom;

      totalRooms.push(nextRoom);
    }

    const roomsWithNeighbours = [...totalRooms].map((room) => {
      const neighbours = {
        top: totalRooms.find((r) => r.x === room.x && r.y === room.y - 1),
        bottom: totalRooms.find((r) => r.x === room.x && r.y === room.y + 1),
        left: totalRooms.find((r) => r.x === room.x - 1 && r.y === room.y),
        right: totalRooms.find((r) => r.x === room.x + 1 && r.y === room.y),
      };
      return { ...room, neighbours };
    });

    setRooms(roomsWithNeighbours);
  }, [generateNoise, seed]);

  useEffect(() => {
    generateRooms();
  }, [seed]);

  useEffect(() => {
    setCurrentRoom(
      rooms.sort((a, b) => {
        const nNeighbours = (room: Room) => {
          const top = room?.neighbours?.top ? -1 : 0;
          const bottom = room?.neighbours?.bottom ? -1 : 0;
          const right = room?.neighbours?.right ? -1 : 0;
          const left = room?.neighbours?.left ? -1 : 0;
          return top + bottom + right + left;
        };
        return nNeighbours(a) - nNeighbours(b);
      })[0]
    );
  }, [rooms]);
};
