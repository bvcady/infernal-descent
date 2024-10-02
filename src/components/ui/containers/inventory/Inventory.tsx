import { Shard } from "@/components/items/Shard";
import { Shovel } from "@/components/items/Shovel";
import { playerStore } from "@/stores/PlayerStore";
import { windowStore } from "@/stores/WindowStore";
import { Box, styled } from "@mui/material";
import { useStore } from "zustand";

const InventoryWrapper = styled(Box)`
  position: absolute;
  z-index: 0;
  width: 100%;
  background-color: black;
  display: flex;
  gap: 2%;
  > div {
    zoom: 0.75;
  }
`;

export const Inventory = () => {
  const { inventory } = useStore(playerStore);
  const { cellSize } = useStore(windowStore);
  return (
    <>
      {inventory?.items.length > 0 || inventory.tiles?.length > 0 ? (
        <InventoryWrapper
          padding={`${cellSize / 10}px`}
          sx={{ borderBottom: "2px solid white" }}
        >
          {inventory?.items?.map((item, index) => {
            if (item.item.name === "shovel") {
              return <Shovel key={index} cell={item} isStatic />;
            }
            if (item.item.name === "shard") {
              return <Shard key={index} cell={item} isStatic />;
            }
          })}
        </InventoryWrapper>
      ) : null}
    </>
  );
};
