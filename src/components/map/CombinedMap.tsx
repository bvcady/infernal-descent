import { levelStore } from "@/stores/LevelStore";
import { playerStore } from "@/stores/PlayerStore";
import { runStore } from "@/stores/RunStore";
import { windowStore } from "@/stores/WindowStore";
import { scale } from "@/utils/scale";
import { Box, css, styled } from "@mui/material";
import { ReactNode } from "react";

import { useStore } from "zustand";

interface Props {
  children?: ReactNode;
}

const Wrapper = styled(Box)<{ focus: { x: number; y: number }; zoom: number }>`
  height: 100%;
  width: 100%;
  zoom: ${({ zoom }) => zoom};
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1;
  ${({ focus }) => css`
    transform: translate(${focus.x}px, ${focus.y}px);
  `}
  transition: all 0.4s ease-out;
`;
export const CombinedMap = ({ children }: Props) => {
  const { cellSize } = useStore(windowStore);
  const { dimensions } = useStore(levelStore);
  const { currentRoom } = useStore(runStore);
  const { player } = useStore(playerStore);

  const zoom = scale([1, 5], [1, 0.6])(currentRoom?.size || 1);

  const focus = {
    x: (dimensions.width * cellSize) / 2 - (player?.x || 10) * cellSize,
    y: (dimensions.height * cellSize) / 2 - (player?.y || 10) * cellSize,
  };
  return (
    <Wrapper zoom={zoom} focus={focus}>
      {children}
    </Wrapper>
  );
};
