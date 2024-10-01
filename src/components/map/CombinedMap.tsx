import { levelStore } from "@/stores/LevelStore";
import { playerStore } from "@/stores/PlayerStore";
import { windowStore } from "@/stores/WindowStore";
import { Box, css, styled } from "@mui/material";
import { ReactNode } from "react";

import { useStore } from "zustand";

interface Props {
  children?: ReactNode;
}

const Wrapper = styled(Box)<{ focus: { x: number; y: number } }>`
  height: 100%;
  width: 100%;
  /* max-width: min(100dvw, 100dvh); */
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1;
  ${({ focus }) => css`
    transform: translate(${focus.x}px, ${focus.y}px);
  `}
  transition: transform 0.4s ease-out;
`;
export const CombinedMap = ({ children }: Props) => {
  const { cellSize } = useStore(windowStore);
  const { dimensions } = useStore(levelStore);
  const { player } = useStore(playerStore);
  const focus = {
    x: (dimensions.width * cellSize) / 2 - (player?.x || 10) * cellSize,
    y: (dimensions.height * cellSize) / 2 - (player?.y || 10) * cellSize,
  };
  return <Wrapper focus={focus}>{children}</Wrapper>;
};
