
export type Cell = {
  x: number;
  y: number;
  isEdge?: boolean;
  isRock?: boolean;
  isLava?: boolean;
  isOutside?: boolean;
  isPath?: boolean;
  isCollapsed?: boolean;
  n: number;
  options?: string[]
  neighbours?: {top?: Cell, bottom?: Cell, left?: Cell, right?: Cell}
};
