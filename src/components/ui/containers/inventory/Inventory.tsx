import { DefaultItem } from "@/components/items/default/DefaultItem";
import { FloorTile } from "@/components/tiles/passable/FloorTile";
import { playerStore } from "@/stores/PlayerStore";
import { windowStore } from "@/stores/WindowStore";
import { miniFont } from "@/utils/defaultValues";
import { Box, styled } from "@mui/material";
import { useStore } from "zustand";

const InventoryWrapper = styled(Box)`
  max-width: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;

  > div {
    zoom: 0.55;
  }
`;

const SquareInventory = styled("div")`
  position: absolute;
  top: 0;
  left: 50%;
  translate: -50% 0;
  background-color: black;
  border-radius: 4px;
  display: grid;
  z-index: 100;
  padding: calc(var(--uiW) / 2);
  margin: 0 auto;

  grid-template-areas:
    "inv1 inv2 inv3"
    "inv8 face inv4"
    "inv7 inv6 inv5";
  div {
    width: calc(var(--uiW));
    height: calc(var(--uiW));
  }
`;

export const Inventory = () => {
  const { inventory, stats } = useStore(playerStore);
  const { cellSize, beat } = useStore(windowStore);

  return (
    <>
      <Box
        position={"absolute"}
        zIndex={2}
        width={"100%"}
        display={"flex"}
        flexDirection={"column"}
        borderBottom={"2px solid rgba(0, 0, 0, 0.4)"}
        sx={{ backdropFilter: "blur(12px)" }}
      >
        <InventoryWrapper padding={`${cellSize / 10}px`} height={cellSize / 2}>
          {inventory?.items?.map((item) => {
            return <DefaultItem key={item.id} item={item} isStatic />;
          })}
          <Box ml={"auto"} display={"flex"} alignItems={"center"}>
            <Box display={"flex"} alignItems={"center"}>
              {stats.health > 0
                ? new Array(Math.floor(stats.health / 2))
                    .fill("")
                    .map((_, index) => (
                      <DefaultItem
                        key={index}
                        ui
                        isStatic
                        customSpriteName={
                          stats.health > 6 &&
                          Math.floor(stats.health / 2) - index < 3
                            ? "heart_temporary"
                            : "heart_whole"
                        }
                      />
                    ))
                : null}
              {stats.health % 2 === 1 ? (
                <DefaultItem isStatic customSpriteName="heart_half" />
              ) : null}
            </Box>
            <Box display={"flex"} alignItems={"center"}>
              <DefaultItem isStatic customSpriteName="shard_one"></DefaultItem>
              <span
                style={{
                  color: "white",
                  fontFamily: miniFont.style.fontFamily,
                }}
              >
                x {stats.shards}
              </span>
            </Box>
          </Box>
        </InventoryWrapper>
        <SquareInventory>
          {new Array(8).fill("").map((_, index) => {
            const tile = inventory?.tiles.find((t) => t?.n === index);
            if (!tile) {
              return (
                <Box
                  key={index}
                  sx={{
                    gridArea: `inv${index + 1}`,
                    position: "relative",
                    width: `${cellSize}px`,
                    aspectRatio: 1,
                    transform: `scale(${
                      Math.floor(beat / 2) !== index ? 1 : 1.25
                    })`,
                  }}
                >
                  <DefaultItem key={index} customSpriteName="empty" isStatic />
                </Box>
              );
            }
            return (
              <Box
                key={`${tile.tile.x} - ${tile.tile.y} - ${tile.n}`}
                sx={{
                  gridArea: `inv${index + 1}`,
                  position: "relative",
                  width: `${cellSize}px`,
                  aspectRatio: 1,
                  transform: `scale(${
                    Math.floor(beat / 2) !== index ? 1 : 1.25
                  })`,
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
        </SquareInventory>
      </Box>
    </>
  );
};
