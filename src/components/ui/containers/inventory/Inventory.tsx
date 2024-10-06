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

export const Inventory = () => {
  const { inventory, stats } = useStore(playerStore);
  const { cellSize, beat } = useStore(windowStore);

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
      <>
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
        <InventoryWrapper
          padding={`${cellSize / 10}px`}
          height={cellSize / 2}
          justifyContent={"center"}
        >
          {new Array(8).fill("").map((_, index) => {
            const tile = inventory?.tiles.find((t) => t?.n === index);
            if (!tile) {
              return (
                <Box
                  key={index}
                  sx={{
                    position: "relative",
                    width: `${cellSize}px`,
                    aspectRatio: 1,
                    transform:
                      Math.floor(beat / 2) === index
                        ? "translateY(-25%)"
                        : "translateY(0%)",
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
                  position: "relative",
                  width: `${cellSize}px`,
                  aspectRatio: 1,
                  transform:
                    Math.floor(beat / 2) === index
                      ? "translateY(-25%)"
                      : "translateY(0%)",
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
    </Box>
  );
};
