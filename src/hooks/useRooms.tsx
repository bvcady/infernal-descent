import { hazardSlime, hazardSpikes } from "@/resources/hazards/Hazard";
import {
  itemChest,
  itemHeartHalf,
  itemHeartTemporary,
  itemHeartWhole,
  itemKey,
  itemShardOne,
  itemShovel,
} from "@/resources/items/Items";
import { runStore } from "@/stores/RunStore";
import { Obtainable, Unobtainable } from "@/types/Obtainable";
import { PlayerEvent } from "@/types/PlayerEvent";
import { Room } from "@/types/Room";
import { generateNoise, shuffle } from "@/utils/noise";
import { scale } from "@/utils/scale";
import Alea from "alea";

import { useEffect } from "react";
import { useStore } from "zustand";

interface Props {
  seed: string;
}

export const useRooms = ({ seed }: Props) => {
  const { setRooms, setCurrentRoom } = useStore(runStore, (state) => state);

  const generateRooms = () => {
    const r = Alea(seed);

    const targetTotal = Math.floor(
      scale([0, 1], [12, 20])(generateNoise({ random: r }))
    );

    const roomGrid = new Array(7)
      .fill("")
      .map((_, y) =>
        new Array(7).fill("").map((_, x) => {
          return {
            x,
            y,
            isCollapsed: false,
            maxExits: 0,
            itemsToPlace: [],
            hazardsToPlace: [],
            neighbours: {},
            size: 0,
          };
        })
      )
      .flat() as Room[];

    const totalRooms = [] as Room[];

    type IntroRoom = {
      items?: (Obtainable | Unobtainable)[];
      hazards?: Unobtainable[];
      nextRoomRequirement?: (Obtainable | Unobtainable | PlayerEvent)[];
      otherwiseEntryCost?: { name: string; amount: number };
    };

    const shovelRoom: IntroRoom = {
      items: [itemShovel],
      nextRoomRequirement: [],
    };

    const keyRoom: IntroRoom = {
      items: [itemKey],
      nextRoomRequirement: [itemKey],
    };

    const heartGainRoom: IntroRoom = {
      items: [
        shuffle([itemHeartHalf, itemHeartWhole, itemHeartTemporary], r)[0],
      ],
    };

    const heartLossRoom: IntroRoom = {
      items: [itemHeartWhole, itemHeartWhole],
      hazards: [
        shuffle([hazardSlime, hazardSpikes], r)[0],
        shuffle([hazardSlime, hazardSpikes], r)[0],
      ],
      nextRoomRequirement: [{ name: "health_lost", type: "PlayerEvent" }],
    };

    const paymentRoom: IntroRoom = {
      items: new Array(5).fill("").map(() => {
        return itemShardOne;
      }),
    };

    const chestOpenRoom = {
      items: [itemKey, itemChest],
    };

    const introRoomSituations: IntroRoom[] = [
      keyRoom,
      heartGainRoom,
      heartLossRoom,
      chestOpenRoom,
      paymentRoom,
    ];
    console.log({ introRoomSituations });
    // while (totalRooms.length < 3) {
    //   const remainingRooms = roomGrid.filter((room) => !room.isCollapsed);
    //   const introRoom = shuffle(remainingRooms, r)[0];
    //   const id = [...roomGrid].findIndex(
    //     (room) => room.x === introRoom.x && room.y === introRoom.y
    //   );

    //   introRoom.size = 1;
    //   introRoom.isBossRoom = false;
    //   introRoom.maxExits = 2;
    //   introRoom.isCollapsed = true;
    //   introRoom.density = 0;
    //   introRoom.emptiness = 0;

    //   introRoom.itemsToPlace = [];
    //   introRoom.hazardsToPlace = [];

    //   roomGrid[id] = introRoom;
    // }

    while (totalRooms.length < targetTotal) {
      if (totalRooms.length === 0) {
        const remainingRooms = [...roomGrid].filter(
          (room) => !room.isCollapsed
        );
        const introRoom = shuffle(remainingRooms, r)[0];
        const id = [...roomGrid].findIndex(
          (room) => room.x === introRoom.x && room.y === introRoom.y
        );
        introRoom.size = 1;
        introRoom.isBossRoom = false;
        introRoom.maxExits = 1;
        introRoom.isCollapsed = true;
        introRoom.density = 0;
        introRoom.emptiness = 0;
        introRoom.itemsToPlace = shovelRoom.items || [];
        introRoom.hazardsToPlace = shovelRoom.hazards || [];

        roomGrid[id] = introRoom;

        totalRooms.push(introRoom);
      } else {
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
        nextRoom.maxExits = 2;
        nextRoom.density = Math.floor(scale([0, 1], [0, 10])(r.next()));

        if (
          nextRoom.size === 3 &&
          !totalRooms?.some((room) => room.isBossRoom)
        ) {
          nextRoom.isBossRoom = true;
        }

        const indexOfRoom = [...roomGrid].findIndex(
          (room) => room.x === nextRoom.x && room.y === nextRoom.y
        );

        if (indexOfRoom >= 0) roomGrid[indexOfRoom] = nextRoom;

        totalRooms.push(nextRoom);
      }
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

    const selectedRoom = roomsWithNeighbours[0];
    setCurrentRoom(selectedRoom);
    setRooms(
      roomsWithNeighbours.map((r) => {
        if (r.x === selectedRoom?.x && r.y === selectedRoom?.y) {
          return { ...r, isVisited: true };
        }
        return r;
      })
    );
  };

  useEffect(() => {
    if (seed) generateRooms();
  }, [seed]);
};
