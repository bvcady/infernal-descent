import { DefaultItem } from "@/components/items/default/DefaultItem";
import { Shard } from "@/components/items/Shard";
import { Shovel } from "@/components/items/Shovel";
import { FloorTile } from "@/components/tiles/passable/FloorTile";
import { playerStore } from "@/stores/PlayerStore";
import { windowStore } from "@/stores/WindowStore";
import { Box, styled } from "@mui/material";
import { useStore } from "zustand";

const InventoryWrapper = styled(Box)`
  width: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  > div {
    zoom: 0.55;
  }
`;

export const Inventory = () => {
  const { inventory } = useStore(playerStore);
  const { cellSize } = useStore(windowStore);
  return (
    <Box
      zIndex={2}
      position={"absolute"}
      width={"100%"}
      display={"flex"}
      flexDirection={"column"}
      borderBottom={"2px solid rgba(0, 0, 0, 0.4)"}
      sx={{ backdropFilter: "blur(12px)" }}
    >
      {inventory?.items.length > 0 || inventory.tiles?.length > 0 ? (
        <>
          <InventoryWrapper
            padding={`${cellSize / 10}px`}
            height={cellSize / 2}
          >
            {inventory?.items?.map((item) => {
              return <DefaultItem key={item.id} item={item} isStatic />;
            })}
          </InventoryWrapper>
          <InventoryWrapper
            padding={`${cellSize / 10}px`}
            height={cellSize / 2}
          >
            {inventory?.tiles?.map((tile, index) => {
              return (
                <Box
                  key={`${tile.tile.x} - ${tile.tile.y}`}
                  sx={{
                    position: "relative",
                    width: `${cellSize}px`,
                    aspectRatio: 1,
                  }}
                >
                  <FloorTile
                    style={{ position: "absolute", inset: 0 }}
                    cell={tile.tile}
                  />
                  {tile.item ? (
                    <Box sx={{ position: "absolute", inset: 0, zIndex: 2 }}>
                      <DefaultItem key={index} item={tile.item} isStatic />
                    </Box>
                  ) : null}
                </Box>
              );
            })}
          </InventoryWrapper>
        </>
      ) : null}
    </Box>
  );
};
