import { levelStore } from "@/stores/LevelStore";
import { useStore } from "zustand";
import { Rubble } from "../items/Rubble";
import { Shovel } from "../items/Shovel";
import { GridWrapper } from "../level/GridWrapper";
import { Cell } from "@/types/Cell";

export const ItemMap = () => {
  const { items } = useStore(levelStore);

  console.log({ items });

  return (
    <GridWrapper>
      {items.map((item) => {
        if (item.item.name === "shovel") {
          return <Shovel key={`${item.x} - ${item.y}`} cell={item} />;
        }
        if (item.item.name === "rubble") {
          return <Rubble key={`${item.x} - ${item.y}`} cell={item as Cell} />;
        }
        return null;
      })}
    </GridWrapper>
  );
};
