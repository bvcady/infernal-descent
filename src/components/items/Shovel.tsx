import { usePlaySound } from "@/hooks/usePlaySound";
import { Item } from "@/types/Item";
import { CSSProperties } from "react";
import { DefaultItem } from "./default/DefaultItem";

interface Props {
  item?: Item;
  isStatic?: boolean;
  itemStyle?: CSSProperties;
  spriteStyle?: CSSProperties;
}

export const Shovel = ({ item, ...props }: Props) => {
  return <DefaultItem item={item} {...{ props }} />;
};
