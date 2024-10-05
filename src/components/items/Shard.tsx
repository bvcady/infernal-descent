import { Item } from "@/types/Item";
import { DefaultItem } from "./default/DefaultItem";

interface Props {
  item?: Item;
  isStatic?: boolean;
}

export const Shard = ({ item, isStatic }: Props) => {
  return <DefaultItem item={item} isStatic={isStatic} />;
};
