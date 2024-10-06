import { DefaultItem } from "@/components/items/default/DefaultItem";
import { windowStore } from "@/stores/WindowStore";
import { miniFont } from "@/utils/defaultValues";
import { Box, styled } from "@mui/material";
import { CSSProperties, ReactNode } from "react";
import { useStore } from "zustand";

interface Props {
  letter: string;
  label?: string;
  icon?: string;
  toggle?: unknown;
  righty?: boolean;
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
  toggle,
  righty,
  style = {},
  ...props
}: Props) => {
  const { cellSize } = useStore(windowStore);

  const icon = typeof toggle === "string" ? toggle : props.icon;

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
            gap: "4px",
            backgroundColor: "white",
            fontFamily: miniFont.style.fontFamily,
            fontSize: "1rem",
            zIndex: 2,
            ...style,
          }}
        >
          <span style={{ marginLeft: "2px", order: righty ? 100 : -1 }}>
            {label ?? letter}
          </span>
          {icon ? (
            <span className="icon">
              <DefaultItem customSpriteName={icon} isStatic />
            </span>
          ) : null}
        </Hint>
      ) : null}
    </>
  );
};
