import { levelStore } from "@/stores/LevelStore";
import { Box, styled } from "@mui/material";
import { ReactNode } from "react";
import { useStore } from "zustand";

interface Props {
  children?: ReactNode;
}

interface ViewerProps {
  mb?: "auto";
}

const StyledViewer = styled(Box)<ViewerProps>`
  position: absolute;
  width: 100dvw;
  height: 100dvh;
  mix-blend-mode: screen;
  user-select: none;
  z-index: 2;
`;

export const Viewer = ({ children }: Props) => {
  const { dimensions } = useStore(levelStore);

  return (
    <StyledViewer
      mb={dimensions.width < dimensions.height ? "auto" : undefined}
    >
      {children}
    </StyledViewer>
  );
};
