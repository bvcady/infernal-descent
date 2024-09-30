import { createNoise2D, createNoise3D, createNoise4D } from "simplex-noise";
import { scale } from "./scale";

type Random = {
  (): number;
  next(): number;
  uint32(): number;
  fract53(): number;
  version: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  args: any[];
  exportState(): [number, number, number, number];
  importState(state: [number, number, number, number]): void;
};

type NoiseDims = { x?: number; y?: number; z?: number; w?: number };

interface NoiseProps {
  dims?: NoiseDims;
  random: Random;
}

export const generateNoise = ({ dims = {}, random }: NoiseProps) => {
  const { x, y, z, w } = dims;
  if (x === undefined || y === undefined) {
    const nextVal = random.next();
    return nextVal;
  }
  if (z === undefined) {
    const nextVal = scale([-1, 1], [0, 1])(createNoise2D(random)(x, y));
    return nextVal;
  }

  if (w === undefined)
    return scale([-1, 1], [0, 1])(createNoise3D(random)(x, y, z));
  return scale([-1, 1], [0, 1])(createNoise4D(random)(x, y, z, w));
};

export function shuffle<T>(_array: T[], random: Random): T[] {
  const array = [..._array];
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(generateNoise({ random }) * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
