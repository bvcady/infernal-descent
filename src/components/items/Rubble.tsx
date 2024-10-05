import { Cell } from "@/types/Cell";
import { DefaultItem } from "./default/DefaultItem";
import { Item } from "@/types/Item";

interface Props {
  item?: Item;
}

export const Rubble = ({ item }: Props) => {
  return <DefaultItem item={item} />;
};
