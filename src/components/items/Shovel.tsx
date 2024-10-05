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
  const { play: playPickUpSound } = usePlaySound({
    soundFile: "../../Audio/Impact Sounds/Audio/impactMining_002.ogg",
    options: {
      volume: 0.4,
    },
  });

  return (
    <DefaultItem item={item} playPickUpSound={playPickUpSound} {...{ props }} />
  );
};
