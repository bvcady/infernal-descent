import { Cell } from "@/types/Cell";
import { Box } from "@mui/material";

interface Props {
  cellSize?: number;
  cell?: Cell;
}

const d = 17;

export const Rubble = ({ cellSize = 16, cell }: Props) => {
  const x = cell?.x || 0;
  const y = cell?.y || 0;

  const imageSize = Math.floor(cellSize * 0.45) * 2;
  return (
    <Box
      className="rubble"
      width={imageSize}
      height={imageSize}
      sx={{
        transform: "translateY(-10%)",
        gridColumnStart: x + 1,
        gridColumnEnd: "span 1",
        gridRowStart: y + 1,
        gridRowEnd: "span 1",
        backgroundPosition: "center center",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundImage: `url("/images/Monochrome/tilemap/new_tile${
          7 + 6 * d + 1
        }.png")`,
      }}
    />
  );
};
