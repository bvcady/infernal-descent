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
import { RoomRequirement } from "@/types/RoomRequirement";
import { ItemType } from "@/types/Obtainable";
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
      items?: ItemType[];
      hazards?: ItemType[];
      nextRoomRequirement?: {
        requirements?: RoomRequirement[];
        forcedEntry?: RoomRequirement;
      };
      otherwiseEntryCost?: { name: string; amount: number };
    };

    const shovelRoom: IntroRoom = {
      items: [itemShovel],
      nextRoomRequirement: {
        requirements: [
          { name: "shovel", type: "Item", amount: 1, exact: true },
        ],
      },
    };

    const keyRoom: IntroRoom = {
      items: [itemKey],
      nextRoomRequirement: {
        requirements: [{ name: "key", type: "Item", amount: 1 }],
        forcedEntry: { name: "heart", type: "Stat", amount: 1 },
      },
    };

    const heartGainRoom: IntroRoom = {
      items: [
        shuffle([itemHeartHalf, itemHeartWhole, itemHeartTemporary], r)[0],
      ],
      hazards: [hazardSpikes, hazardSpikes],
      nextRoomRequirement: {
        requirements: [{ name: "health_gain", type: "Stat" }],
      },
    };

    const heartLossRoom: IntroRoom = {
      items: [itemHeartWhole, itemHeartWhole],
      hazards: [
        shuffle([hazardSlime, hazardSpikes], r)[0],
        shuffle([hazardSlime, hazardSpikes], r)[0],
      ],
      nextRoomRequirement: {
        requirements: [{ name: "health_lost", type: "Stat", amount: 1 }],
      },
    };

    const paymentRoom: IntroRoom = {
      items: new Array(5).fill("").map(() => {
        return itemShardOne;
      }),
      nextRoomRequirement: {
        requirements: [{ name: "shards", type: "Item", amount: 5, reduce: 3 }],
      },
    };

    const barredRoom: IntroRoom = {
      nextRoomRequirement: {
        forcedEntry: { name: "health", type: "Stat", amount: 1 },
      },
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
      barredRoom,
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

    // Fist place a room with a shovel, to introduce the user to exit requirements

    if (totalRooms.length === 0) {
      const remainingRooms = [...roomGrid].filter((room) => !room.isCollapsed);
      const introRoom = shuffle(remainingRooms, r)[0];
      const id = [...roomGrid].findIndex(
        (room) => room.x === introRoom.x && room.y === introRoom.y
      );
      introRoom.size = 1;
      introRoom.isBossRoom = false;
      introRoom.maxExits = r.next() < 0.5 ? 1 : 2;
      introRoom.isCollapsed = true;
      introRoom.density = 0;
      introRoom.emptiness = 0;
      introRoom.itemsToPlace = shovelRoom.items || [];
      introRoom.hazardsToPlace = shovelRoom.hazards || [];
      roomGrid[id] = introRoom;
      totalRooms.push(introRoom);
      introRoom.entryRequirement = undefined;
    }

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
      nextRoom.maxExits = 2;
      nextRoom.density = Math.floor(scale([0, 1], [0, 10])(r.next()));

      if (nextRoom.size === 3 && !totalRooms?.some((room) => room.isBossRoom)) {
        nextRoom.isBossRoom = true;
      }

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
