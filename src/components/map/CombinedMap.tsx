import { levelStore } from "@/stores/LevelStore";
import { playerStore } from "@/stores/PlayerStore";
import { runStore } from "@/stores/RunStore";
import { windowStore } from "@/stores/WindowStore";
import { scale } from "@/utils/scale";
import { Box, css, styled } from "@mui/material";
import { ReactNode, useEffect } from "react";

import { useStore } from "zustand";

interface Props {
  children?: ReactNode;
  isMobile?: boolean;
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
  transition: all 0.7s ease 0.35s;
  /* transition: all 0.7s cubic-bezier(.55,-0.5,.67,.92) 0.35s; */

  /* Apply the turbulence here */
`;
export const CombinedMap = ({ children, isMobile }: Props) => {
  const { cellSize } = useStore(windowStore);
  const { dimensions } = useStore(levelStore);
  const { currentRoom } = useStore(runStore);
  const { player } = useStore(playerStore);

  const zoom = scale([1, 5], [1, 0.5])(currentRoom?.size || 1);

  const focus = {
    x: (dimensions.width * cellSize) / 2 - ((player?.x || 10) + 0.5) * cellSize,
    y:
      (dimensions.height * cellSize) / 2 -
      ((player?.y || 10) + 1) * cellSize -
      (isMobile ? cellSize * 1.5 : 0),
  };
  return (
    <Wrapper zoom={zoom} focus={focus}>
      {children}
    </Wrapper>
  );
};
