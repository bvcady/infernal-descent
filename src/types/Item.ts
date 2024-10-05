export type Item = {
  id: string;
  x: number;
  y: number;
  name: string;
  rarity: number;
  type: "Obtainable" | "Unobtainable" | "Stat" | "Hurtful";
  weight?: number;
  canShovel?: boolean;
  value?: number;
  description?: string;
  damage?: number 
};
