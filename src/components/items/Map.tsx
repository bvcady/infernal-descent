import { Item } from "@/types/Item";
import { DefaultItem } from "./default/DefaultItem";

interface Props {
  item?: Item;
  isStatic?: boolean;
}

export const Map = ({ item }: Props) => {
  return <DefaultItem isStatic item={item} />;
};
