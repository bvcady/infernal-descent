import { levelStore } from "@/stores/LevelStore";
import { useStore } from "zustand";

import { GridWrapper } from "../level/GridWrapper";
import { Wall } from "../tiles/fixed/Wall";
import { windowStore } from "@/stores/WindowStore";
import { playerStore } from "@/stores/PlayerStore";

export const WallMap = () => {
  const { walls } = useStore(levelStore);
  const { player } = useStore(playerStore);

  const seed = player ? player.x + player.x * player.y : 0;

  return (
    <GridWrapper
      style={{ pointerEvents: "none", filter: "url(#displacementFilter)" }}
    >
      {walls.map((cell) => (
        <Wall key={`wall - ${cell.x} - ${cell.y}`} cell={cell} />
      ))}
      <svg>
        <filter id="displacementFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency={0.04}
            numOctaves="4"
            result="turbulence"
            seed={seed}
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
    </GridWrapper>
  );
};
