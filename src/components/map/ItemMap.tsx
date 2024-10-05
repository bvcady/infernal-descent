import { levelStore } from "@/stores/LevelStore";
import { useStore } from "zustand";
import { DefaultItem } from "../items/default/DefaultItem";
import { GridWrapper } from "../level/GridWrapper";

export const ItemMap = () => {
  const { items } = useStore(levelStore);

  return (
    <GridWrapper>
      {items.map((item) => (
        <DefaultItem
          isStatic={item.type === "Unobtainable"}
          itemStyle={
            item.name === "rubble"
              ? {
                  transform: "translateY(-25%)",
                }
              : undefined
          }
          key={item.id}
          item={item}
        />
      ))}
    </GridWrapper>
  );
};
