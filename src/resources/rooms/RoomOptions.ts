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
import { hazardLava, hazardSpikes } from "../hazards/Hazard";
import { Random } from "@/types/Random";
import { Item } from "@/types/Item";

type IntroRoom = {
  items?: Item[];
  nextRoomRequirement?: {
    requirements?: RoomRequirement;
    forcedEntry?: RoomRequirement;
  };
};

export const shovelRoom: IntroRoom = {
  items: [itemShovel],
  nextRoomRequirement: {
    requirements: {
      name: "shovel",
      type: "Item",
      amount: 1,
      exact: true,
      pretty: "Shovel",
      required: true,
    },
  },
};

export const getAllRoomOptions = (r: Random) => {
  const keyRoom: IntroRoom = {
    items: [itemKey],
    nextRoomRequirement: {
      requirements: {
        name: "key",
        type: "Item",
        amount: 1,
        pretty: "Door Key",
        reduce: 1,
      },

      forcedEntry: {
        name: "health",
        type: "Stat",
        reduce: 2,
        pretty: "Health",
      },
    },
  };

  const heartGainRoom: IntroRoom = {
    items: [
      shuffle([itemHeartHalf, itemHeartWhole, itemHeartTemporary], r)[0],
      hazardSpikes,
      hazardLava,
    ],
    nextRoomRequirement: {
      requirements: {
        name: "health_gain",
        type: "Room",
        pretty: "Only Health Gained",
      },
      forcedEntry: {
        name: "health",
        type: "Stat",
        reduce: 1,
        pretty: "Health",
      },
    },
  };

  const shardMin: IntroRoom = {
    items: [],
    nextRoomRequirement: {
      requirements: {
        name: "shards",
        type: "Stat",
        amount: 10,
        pretty: "Min Shards",
      },
      forcedEntry: {
        name: "health",
        type: "Stat",
        reduce: 2,
        pretty: "Health",
      },
    },
  };

  const heartMin: IntroRoom = {
    items: [
      itemHeartWhole,
      itemHeartWhole,
      shuffle([hazardLava, hazardSpikes], r)[0],
      shuffle([hazardLava, hazardSpikes], r)[0],
    ],

    nextRoomRequirement: {
      requirements: {
        name: "health",
        type: "Stat",
        amount: 5,
        pretty: "Min Health",
      },
      forcedEntry: {
        name: "shards",
        type: "Stat",
        reduce: 10,
        pretty: "Shards",
      },
    },
  };

  const heartLossRoom: IntroRoom = {
    items: [
      itemHeartWhole,
      itemHeartWhole,
      shuffle([hazardLava, hazardSpikes], r)[0],
      shuffle([hazardLava, hazardSpikes], r)[0],
    ],

    nextRoomRequirement: {
      requirements: {
        name: "health_lost",
        type: "Room",
        pretty: "Only Health Lost",
      },
      forcedEntry: {
        name: "shards",
        type: "Stat",
        reduce: 2,
        pretty: "Shards",
      },
    },
  };

  const paymentRoom: IntroRoom = {
    items: new Array(5).fill("").map(() => {
      return itemShardOne;
    }),
    nextRoomRequirement: {
      forcedEntry: {
        name: "shards",
        type: "Stat",
        reduce: 3,
        pretty: "Shards",
      },
    },
  };

  const shardFakeOutRoom: IntroRoom = {
    items: new Array(5).fill("").map(() => {
      return itemShardOne;
    }),
    nextRoomRequirement: {
      requirements: {
        name: "shard_one",
        type: "Item",
        amount: 1,
        pretty: "Shards",
      },
      forcedEntry: {
        name: "health",
        type: "Stat",
        reduce: 2,
        pretty: "Health Lost",
      },
    },
  };

  const hazardFakeOut: IntroRoom = {
    items: [],
    nextRoomRequirement: {
      requirements: shuffle(
        [
          {
            name: "spikes",
            type: "Item",
            amount: 1,
            pretty: "Spike",
          },
          {
            name: "lava",
            type: "Item",
            amount: 1,
            pretty: "Lava",
          },
        ],
        r
      )[0] as RoomRequirement,
      forcedEntry: {
        name: "health",
        type: "Stat",
        reduce: 2,
        pretty: "Health Lost",
      },
    },
  };

  const healthFakeOutRoom: IntroRoom = {
    items: [
      shuffle([itemHeartHalf, itemHeartWhole, itemHeartTemporary], r)[0],
      hazardSpikes,
      hazardLava,
    ],
    nextRoomRequirement: {
      requirements: {
        name: "heart_whole",
        type: "Item",
        pretty: "Heart",
        amount: 1,
        moreThan: true,
      },

      forcedEntry: {
        name: "health",
        type: "Stat",
        reduce: 1,
        pretty: "Health",
      },
    },
  };

  const barredRoom: IntroRoom = {
    nextRoomRequirement: {
      forcedEntry: {
        name: "health",
        type: "Stat",
        reduce: 3,
        pretty: "Health",
      },
    },
  };

  const chestOpenRoom: IntroRoom = {
    items: [itemKey, itemChest],
    nextRoomRequirement: {
      requirements: {
        name: "chest_closed",
        type: "Item",
        amount: 1,
        pretty: "Closed Chest",
        reduce: 1,
      },

      forcedEntry: {
        name: "health",
        type: "Stat",
        reduce: 2,
        pretty: "Health",
      },
    },
  };

  const introRoomSituations: IntroRoom[] = [
    keyRoom,
    heartGainRoom,
    heartLossRoom,
    chestOpenRoom,
    paymentRoom,
    barredRoom,
    shardFakeOutRoom,
    healthFakeOutRoom,
    hazardFakeOut,
  ];

  const heavyRoom: IntroRoom = {
    items: [itemKey],
    nextRoomRequirement: {
      requirements: {
        name: "weight",
        type: "Stat",
        amount: 10,
        moreThan: true,
        pretty: "Min Weight",
      },

      forcedEntry: {
        name: "health",
        type: "Stat",
        reduce: 2,
        pretty: "Health",
      },
    },
  };
  const lightRoom: IntroRoom = {
    items: [itemKey],
    nextRoomRequirement: {
      requirements: {
        name: "weight",
        type: "Stat",
        amount: 4,
        lessThan: true,
        pretty: "Max Weight",
      },

      forcedEntry: {
        name: "health",
        type: "Stat",
        reduce: 2,
        pretty: "Health",
      },
    },
  };
  const minStepsRoom: IntroRoom = {
    items: [itemKey],
    nextRoomRequirement: {
      requirements: {
        name: "steps",
        type: "Stat",
        amount: 200,
        pretty: "Min Steps",
      },

      forcedEntry: {
        name: "health",
        type: "Stat",
        reduce: 2,
        pretty: "Health",
      },
    },
  };
  const maxStepsRoom: IntroRoom = {
    items: [itemKey],
    nextRoomRequirement: {
      requirements: {
        name: "weight",
        type: "Stat",
        amount: 200,
        lessThan: true,
        pretty: "Max Steps",
      },

      forcedEntry: {
        name: "health",
        type: "Stat",
        reduce: 2,
        pretty: "Health",
      },
    },
  };

  const expertRoomSituations: IntroRoom[] = [
    heavyRoom,
    minStepsRoom,
    shardMin,
    heartMin,
  ];
  return { introRoomSituations, expertRoomSituations };
};
