import alea from "alea";
import { useEffect, useState } from "react";
import {
  createNoise2D,
  createNoise3D,
  createNoise4D,
  NoiseFunction2D,
  NoiseFunction3D,
  NoiseFunction4D,
} from "simplex-noise";

interface Props {
  seed?: string | number;
}

export const useNoise = ({ seed }: Props) => {
  const [noise2D, setNoise2D] = useState<NoiseFunction2D>();
  const [noise3D, setNoise3D] = useState<NoiseFunction3D>();
  const [noise4D, setNoise4D] = useState<NoiseFunction4D>();

  const genericNoise = (x: number, y: number, z?: number, w?: number) => {
    if (w !== undefined && z !== undefined) {
      return noise4D?.(x, y, z, w);
    }
    if (z !== undefined) {
      return noise3D?.(x, y, z);
    }
    return noise2D?.(x, y);
  };

  useEffect(() => {
    const newSeed = seed || "hello world";
    const randFn = alea(newSeed);

    const noise2DFn = createNoise2D(randFn);
    const noise3DFn = createNoise3D(randFn);
    const noise4DFn = createNoise4D(randFn);

    setNoise2D(() => noise2DFn);
    setNoise3D(() => noise3DFn);
    setNoise4D(() => noise4DFn);
  }, [seed]);

  return { noise2D, noise3D, noise4D, genericNoise };
};
