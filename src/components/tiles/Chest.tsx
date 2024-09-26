import { Cell } from "@/types/Cell";
import { Box } from "@mui/material";

interface Props {
  cellSize?: number;
  cell?: Cell;
}

const d = 17;

export const Chest = ({ cellSize = 16, cell }: Props) => {
  const x = cell?.x || 0;
  const y = cell?.y || 0;
  return (
    <Box
      className="path"
      width={cellSize}
      height={cellSize}
      sx={{
        transform: "translateY(-10%)",
        gridColumnStart: x + 1,
        gridColumnEnd: "span 1",
        gridRowStart: y + 1,
        gridRowEnd: "span 1",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundImage: `url("/images/Monochrome/tilemap/new_tile${
          15 + 7 * d + 1
        }.png")`,
      }}
    />
  );
};
