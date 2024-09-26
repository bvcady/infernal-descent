import { Cell } from "@/types/Cell";
import { shuffle } from "@/utils/shuffle";
import { Box } from "@mui/material";

interface Props {
  cellSize?: number;
  cell?: Cell;
}

const d = 17;

export const Path = ({ cellSize = 16, cell }: Props) => {
  const getFromTileset = () => {
    return shuffle([0, 0, 0, 0, 0, 0, 1, 2, 4 + d])[0];
  };

  return (
    <Box
      className="path"
      width={Math.floor(cellSize * 0.45) * 2}
      height={Math.floor(cellSize * 0.45) * 2}
      sx={{
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundColor: !cell?.isOutside ? "white" : undefined,
        borderRadius: "2px",
        backgroundImage:
          getFromTileset() >= 0
            ? `url("/images/Monochrome/tilemap/new_tile${
                getFromTileset() + 1
              }.png")`
            : undefined,
      }}
    />
  );
};
