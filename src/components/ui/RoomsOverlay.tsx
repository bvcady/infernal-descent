import { Box } from "@mui/system";
import { ReactNode } from "react";
import { Button } from "./Button";
import { MiniMap } from "./MiniMap";

// const RoomsWrapper = styled(Box)`
//   color: white;
//   font-family: ${miniFont.style.fontFamily};
// `;

interface Props {
  updateSeed: () => void;
  children?: ReactNode;
}

export const UIOverlay = ({ updateSeed }: Props) => {
  return (
    <Box
      width={"100%"}
      height={"100%"}
      position={"absolute"}
      sx={{ inset: 0 }}
      display={"flex"}
      gap={"1rem"}
    >
      <MiniMap />
      {/* <Metronome /> */}
      <Button label="reset" callback={updateSeed} />
    </Box>
  );
};
