export type Room = {
  x: number;
  y: number;
  isCollapsed: boolean;
  size: number;
  neighbours: { top?: Room; bottom?: Room; left?: Room; right?: Room };
};
