import { windowStore } from "@/stores/WindowStore";
import { miniFont } from "@/utils/defaultValues";
import { Box, styled } from "@mui/material";
import { CSSProperties, ReactNode } from "react";
import { useStore } from "zustand";

interface Props {
  letter: string;
  label?: string;
  icon?: ReactNode;
  toggle?: unknown;
  style?: CSSProperties;
}

const Hint = styled(Box)`
  .icon {
    zoom: 0.66;
  }
`;

export const PressHint = ({
  letter,
  label,
  icon,
  toggle,
  style = {},
}: Props) => {
  const { cellSize } = useStore(windowStore);

  return (
    <>
      {!!toggle ? (
        <Hint
          minWidth={cellSize * 0.66}
          padding={`${cellSize / 10}px ${cellSize / 5}px`}
          borderRadius={"4px"}
          height={cellSize * 0.66}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          overflow={"visible"}
          sx={{
            backgroundColor: "white",
            fontFamily: miniFont.style.fontFamily,
            fontSize: "1rem",
            ...style,
          }}
        >
          <span style={{ marginLeft: "2px" }}>{label ?? letter}</span>
          {icon ? <span className="icon">{icon}</span> : null}
        </Hint>
      ) : null}
    </>
  );
};
