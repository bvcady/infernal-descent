import { Cell } from "@/types/Cell";
import { Box } from "@mui/material";

interface Props {
  cellSize?: number;
  cell?: Cell;
}

const d = 17;

export const RockBottom = ({ cellSize = 16, cell }: Props) => {
  const x = cell?.x || 0;
  const y = cell?.y || 0;

  return (
    <Box
      className="rubble"
      width={cellSize * 0.9}
      height={cellSize * 0.9}
      sx={{
        transform: `translateY(-75%) scale(${Math.random() > 0.5 ? 1 : -1}, 1)`,
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
