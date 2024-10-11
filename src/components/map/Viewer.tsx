import { levelStore } from "@/stores/LevelStore";
import { windowStore } from "@/stores/WindowStore";
import { Box, styled } from "@mui/material";
import { ReactNode } from "react";
import { useStore } from "zustand";

interface Props {
  children?: ReactNode;
}

interface ViewerProps {
  w: number;
  mb?: "auto";
}

const StyledViewer = styled(Box)<ViewerProps>`
  position: absolute;
  width: ${({ w }) => w}px;
  aspect-ratio: 160/144;
  user-select: none;
  overflow: hidden;
  z-index: 2;
`;

export const Viewer = ({ children }: Props) => {
  const { dimensions } = useStore(levelStore);
  const { cellSize } = useStore(windowStore);

  return (
    <StyledViewer
      id="viewer"
      w={cellSize * 10}
      mb={dimensions.width < dimensions.height ? "auto" : undefined}
    >
      {children}
    </StyledViewer>
  );
};
