export type RoomRequirement = {
  name: string;
  type: "Stat" | "Item" | "Room";
  pretty: string;
  amount?: number;
  exact?: boolean;
  lessThan?: boolean;
  moreThan?: boolean;
  reduce?: number;
  hidden?: boolean;
  required?: boolean
};
