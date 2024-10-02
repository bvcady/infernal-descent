import { DefaultTile } from "@/components/tiles/default/DefaultTile";
import { windowStore } from "@/stores/WindowStore";
import { Box } from "@mui/material";
import { CSSProperties, ReactNode } from "react";
import { useStore } from "zustand";

interface Props {
  letter: string;
  icon?: ReactNode;
  toggle?: unknown;
  style?: CSSProperties;
}

export const PressHint = ({ letter, icon, toggle, style = {} }: Props) => {
  const { cellSize } = useStore(windowStore);

  return (
    <>
      {!!toggle ? (
        <Box
          width={cellSize}
          height={cellSize}
          overflow={"visible"}
          style={{ ...style }}
        >
          <DefaultTile noBackground tileNumber={0} hasShadow>
            <span style={{ marginLeft: "2px" }}>{letter}</span>
            {icon}
          </DefaultTile>
        </Box>
      ) : null}
    </>
  );
};
