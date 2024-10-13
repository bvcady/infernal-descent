import { windowStore } from "@/stores/WindowStore";
import { Cell } from "@/types/Cell";
import { Box } from "@mui/material";
import { useStore } from "zustand";

interface Props {
  cell?: Cell;
}

export const RockBottom = ({ cell }: Props) => {
  const { cellSize } = useStore(windowStore, (state) => state);

  const x = cell?.x || -2;
  const y = cell?.y || -2;
  return (
    <Box
      width={cellSize}
      height={cellSize}
      gridColumn={`${x + 1} / span 1`}
      gridRow={`${y} / span 1`}
      bgcolor={"black"}
      sx={{ filter: "url(#displacementFilter)" }}
    />
  );
};
