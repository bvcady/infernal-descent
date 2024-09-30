import { windowStore } from "@/stores/WindowStore";
import { Cell } from "@/types/Cell";
import { Box } from "@mui/material";
import { useStore } from "zustand";

interface Props {
  cell?: Cell;
}

export const RockBottom = ({ cell }: Props) => {
  const { cellSize } = useStore(windowStore, (state) => state);

  const x = cell?.x || 0;
  const y = cell?.y || 0;

  return (
    <Box
      width={cellSize * 0.9}
      height={cellSize * 0.9}
      sx={{
        transform: `translateY(-75%) scale(${
          (cell?.n || 0) > 0.5 ? 1 : -1
        }, 1)`,
        gridColumnStart: x + 1,
        gridColumnEnd: "span 1",
        gridRowStart: y + 1,
        gridRowEnd: "span 1",
        backgroundPosition: "center center",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundImage: `url("/images/Monochrome/tilemap/new_tile${10}.png")`,
      }}
    />
  );
};
