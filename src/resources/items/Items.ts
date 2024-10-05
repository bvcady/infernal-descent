import { Item } from "@/types/Item";

export const itemShovel: Item = {
  id: '',
  x: -1, 
  y: -1, 
  name: "shovel",
  rarity: 1000,
  type: "Obtainable",
  canShovel: false,
  description:
    "The shovel allows you to pick up tiles from the floor. The item remains ontop of the tile.",
};
export const itemKey: Item = {
  id: '',
  x: -1, 
  y: -1, 
  name: "key",
  rarity: 3,
  weight: 0.5,
  type: "Obtainable",
  canShovel: true,
  description: "Required to open chests or doors.",
};
export const itemChest: Item = {
  id: '',
  x: -1, 
  y: -1, 
  name: "chest",
  rarity: 5,
  weight: 4,
  canShovel: true,
  type: "Unobtainable",
  description: "Usually, a key is needed to get the valuables from this chest.",
};
export const itemHeartHalf: Item = {
  id: '',
  x: -1, 
  y: -1, 
  name: "heart_half",
  rarity: 2,
  type: "Obtainable",
  weight: 1,
  canShovel: true,
  description: "When not at full health, heals you by half a heart.",
};
export const itemHeartWhole: Item = {
  id: '',
  x: -1, 
  y: -1, 
  name: "heart_whole",
  rarity: 4,
  type: "Obtainable",
  weight: 0.5,
  canShovel: true,
  description: "When not at full health, heals you by a full heart.",
};
export const itemHeartTemporary: Item = {
  id: '',
  x: -1, 
  y: -1, 
  name: "heart_temporary",
  rarity: 6,
  type: "Obtainable",
  weight: 2,
  canShovel: true,
  description: "Provides you an extra heart on top of our max health.",
};

export const itemShardOne: Item = {
  id: '',
  x: -1, 
  y: -1, 
  name: "heart_temporary",
  rarity: 6,
  type: "Obtainable",
  weight: 2,
  canShovel: true,
  value: 1,
  description: "A volcanic shard that seems to influence your environment.",
};

export const itemShardFive: Item = {
  id: '',
  x: -1, 
  y: -1, 
  name: "heart_temporary",
  rarity: 6,
  type: "Obtainable",
  weight: 2,
  canShovel: true,
  value: 5,
  description: "Five volcanic shard that seems to influence your environment.",
};

export const itemShardTen: Item = {
  id: '',
  x: -1, 
  y: -1, 
  name: "heart_temporary",
  rarity: 6,
  type: "Obtainable",
  weight: 2,
  canShovel: true,
  value: 10,
  description: "Ten volcanic shard that seems to influence your environment.",
};
