export type RoomRequirement = {
  name: string;
  type: "Stat" | "Item" | "Tile";
  amount?: number;
  exact?: boolean;
  lessThan?: boolean;
  moreThan?: boolean;
  reduce?: number;
  hidden?: boolean;
};
