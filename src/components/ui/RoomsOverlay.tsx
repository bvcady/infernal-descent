import { cellSize, miniFont } from "@/utils/defaultValues";
import { styled } from "@mui/material";
import { Box } from "@mui/system";
import { ReactNode, useEffect, useRef, useState } from "react";
import { GridWrapper } from "../grid/GridWrapper";
import { Room } from "@/types/Room";

const RoomsWrapper = styled(Box)`
  color: white;
  font-family: ${miniFont.style.fontFamily};
`;

interface Props {
  width?: number;
  height?: number;
  rooms: Room[];
  children?: ReactNode;
}
const one = 1500;
const half = one / 2;
const quarter = half / 2;
const eight = quarter / 2;

export const RoomsOverlay = ({
  width = 10,
  height = 10,
  rooms,
  children,
}: Props) => {
  const [beatIncrement, toggleBeatIncrement] = useState(false);
  const requestRef = useRef(0);

  const [beat, setBeat] = useState(0);

  useEffect(() => {
    if (beatIncrement) {
      setBeat((prev) => (prev + 1) % 16);
    }
  }, [beatIncrement]);

  const animate = (time: number) => {
    const isUp = time % quarter < eight;
    if (isUp) {
      toggleBeatIncrement(true);
    } else {
      toggleBeatIncrement(false);
    }
    requestRef.current = requestAnimationFrame((time) => animate(time));
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  return (
    <GridWrapper
      {...{ width, height }}
      style={{
        gridTemplateRows: `repeat(5, ${cellSize}px)`,
        gridTemplateColumns: `repeat(5, ${cellSize}px)`,
        alignSelf: "start",
        justifySelf: "start",
        left: 0,
        padding: "1rem",
      }}
    >
      {rooms?.map((room) => (
        <Box
          bgcolor={"white"}
          gridColumn={`${room.x + 1} / span 1`}
          gridRow={`${room.y + 1} / span 1`}
          width={cellSize - (5 - (room.size || 0)) * 4}
          height={cellSize - (5 - (room.size || 0)) * 4}
        />
      ))}
      <RoomsWrapper>{children}</RoomsWrapper>
      <Box
        position="absolute"
        bottom={0}
        left={0}
        ml={`${beat + 1}rem`}
        bgcolor={"whitesmoke"}
        width={"2px"}
        height={"14px"}
      />
      <Box
        position="absolute"
        left={0}
        bottom={0}
        // ml={`${beat}rem`}
        bgcolor={"whitesmoke"}
        width={"16rem"}
        height={"10px"}
        sx={{ opacity: 0.4 }}
      />
    </GridWrapper>
  );
};
