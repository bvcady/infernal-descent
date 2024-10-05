import { Item } from "@/types/Item";
import { DefaultItem } from "./default/DefaultItem";

interface Props {
  item?: Item;
}

export const Skull = ({ item }: Props) => {
  return <DefaultItem item={item} />;
};
