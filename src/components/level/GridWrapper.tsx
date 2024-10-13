import { levelStore } from "@/stores/LevelStore";
import { windowStore } from "@/stores/WindowStore";
import { Box } from "@mui/material";
import { CSSProperties, ReactNode } from "react";
import { useStore } from "zustand";

interface Props {
  style?: CSSProperties;
  children?: ReactNode;
}
export const GridWrapper = ({ children, style = {} }: Props) => {
  const { cellSize } = useStore(windowStore, (state) => state);
  const { dimensions } = useStore(levelStore, (state) => state);
  const { width, height } = dimensions;
  return (
    <Box
      position={"absolute"}
      padding={`${cellSize}px`}
      width={"100%"}
      minWidth={"fit-content"}
      maxWidth={"fit-content"}
      sx={{
        display: "grid",
        gridTemplateColumns: `repeat(${width}, ${cellSize}px)`,
        gridTemplateRows: `repeat(${height}, ${cellSize}px)`,
        placeItems: "center",
        pointerEvents: "none",
        filter: "url(#displacementFilter)",
        ...style,
      }}
    >
      {children}
      <svg>
        <filter id="displacementFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency={0.04}
            numOctaves="4"
            result="turbulence"
          />
          <feDisplacementMap
            name="turbulenceResult"
            in2="turbulence"
            in="SourceGraphic"
            scale={5}
            xChannelSelector="A"
            yChannelSelector="A"
          />
          <feGaussianBlur
            in="turbulenceResult"
            stdDeviation={(0.5).toString()}
          />
        </filter>
      </svg>
    </Box>
  );
};
