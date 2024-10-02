import { Box } from "@mui/system";
import { ReactNode } from "react";
import { Button } from "../interactive/Button";
import { MiniMap } from "../informative/MiniMap";
// import { Metronome } from "../informative/Metronome";

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
      <Box
        position={"absolute"}
        right={0}
        top={0}
        width={"50%"}
        bottom={0}
        sx={{
          backgroundColor: "rgba(1, 1, 1, 0.7)",
          backdropFilter: "blur(4px)",
          mask: `linear-gradient(
                  to left,
                  rgba(0, 0, 0, 1) 0%,
                  rgba(0, 0, 0, 0) 37.5%
                )`,
        }}
      ></Box>
      <Box
        position={"absolute"}
        left={0}
        top={0}
        width={"50%"}
        bottom={0}
        sx={{
          backgroundColor: "rgba(1, 1, 1, 0.7)",
          backdropFilter: "blur(4px)",
          mask: `linear-gradient(
                  to right,
                  rgba(0, 0, 0, 1) 0%,
                  rgba(0, 0, 0, 0) 37.5%
                )`,
        }}
      ></Box>
      <MiniMap />
      {/* <Metronome /> */}
      <Button label="reset" callback={updateSeed} />
    </Box>
  );
};
