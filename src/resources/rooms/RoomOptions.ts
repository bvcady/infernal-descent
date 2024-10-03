import { ItemType } from "@/types/Obtainable";
import { RoomRequirement } from "@/types/RoomRequirement";
import {
  itemChest,
  itemHeartHalf,
  itemHeartTemporary,
  itemHeartWhole,
  itemKey,
  itemShardOne,
  itemShovel,
} from "../items/Items";
import { shuffle } from "@/utils/noise";
import { hazardSlime, hazardSpikes } from "../hazards/Hazard";
import { Random } from "@/types/Random";

type IntroRoom = {
  items?: ItemType[];
  hazards?: ItemType[];
  nextRoomRequirement?: {
    requirements?: RoomRequirement[];
    forcedEntry?: RoomRequirement;
  };
};

export const shovelRoom: IntroRoom = {
  items: [itemShovel],
  nextRoomRequirement: {
    requirements: [{ name: "shovel", type: "Item", amount: 1, exact: true }],
  },
};

export const getAllRoomOptions = (r: Random) => {
  const keyRoom: IntroRoom = {
    items: [itemKey],
    nextRoomRequirement: {
      requirements: [{ name: "key", type: "Item", amount: 1 }],
      forcedEntry: { name: "heart", type: "Stat", amount: 1 },
    },
  };

  const heartGainRoom: IntroRoom = {
    items: [shuffle([itemHeartHalf, itemHeartWhole, itemHeartTemporary], r)[0]],
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
  return {introRoomSituations}
};

