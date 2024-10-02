import { Obtainable, Unobtainable } from "@/types/Obtainable";

export const itemShovel: Obtainable = {
  name: "shovel",
  rarity: 1000,
  type: "Obtainable",
  canShovel: false,
};
export const itemKey: Obtainable = {
  name: "key",
  rarity: 3,
  weight: 0.5,
  type: "Obtainable", 
  canShovel: true,
};
export const itemChest: Unobtainable = {
  name: "chest",
  rarity: 5,
  weight: 4, 
  canShovel: true,
  type: "Unobtainable",
};
export const itemHeartHalf: Obtainable = {
  name: "heart_half",
  rarity: 2,
  type: "Obtainable",
  weight: 1,
  canShovel: true,
};
export const itemHeartWhole: Obtainable = {
  name: "heart_whole",
  rarity: 4,
  type: "Obtainable",
  weight: 0.5,
  canShovel: true,
};
export const itemHeartTemporary: Obtainable = {
  name: "heart_temporary",
  rarity: 6,
  type: "Obtainable",
  weight: 2,
  canShovel: true,
};

export const itemShardOne: Obtainable = {
  name: "heart_temporary",
  rarity: 6,
  type: "Obtainable",
  weight: 2,
  canShovel: true,
  value: 1
};

export const itemShardFive: Obtainable = {
  name: "heart_temporary",
  rarity: 6,
  type: "Obtainable",
  weight: 2,
  canShovel: true,
  value: 5
};

export const itemShardTen: Obtainable = {
  name: "heart_temporary",
  rarity: 6,
  type: "Obtainable",
  weight: 2,
  canShovel: true,
  value: 10
};
