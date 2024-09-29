import { Box, ButtonBase } from "@mui/material";
import { useRef } from "react";

export const MobileMovement = () => {
  const keyboardRef = useRef<HTMLDivElement>();

  const handleClick = (
    dir: "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight"
  ) => {
    const event = new KeyboardEvent("keyup", {
      key: dir,
      bubbles: true,
    });
    keyboardRef?.current?.dispatchEvent(event);
  };

  return (
    <Box
      ref={keyboardRef}
      position={"absolute"}
      bottom="48px"
      zIndex={100}
      width={"100%"}
      display={"flex"}
    >
      <Box
        margin={"0 auto"}
        width={"fit-content"}
        display={"grid"}
        gap={"8px"}
        gridTemplateColumns={"repeat(3, 48px)"}
        gridTemplateRows={"repeat(2, 48px)"}
      >
        <ButtonBase
          sx={{
            gridColumn: "2 / span 1",
            gridRow: "1 / span 1",
            color: "black",
            background: "white",
            width: "48px",
            height: "48px",
          }}
          onClick={() => handleClick("ArrowUp")}
        ></ButtonBase>
        <ButtonBase
          sx={{
            gridColumn: "2 / span 1",
            gridRow: "2 / span 1",
            color: "black",
            background: "white",
            width: "48px",
            height: "48px",
          }}
          onClick={() => handleClick("ArrowDown")}
        ></ButtonBase>
        <ButtonBase
          sx={{
            gridColumn: "1 / span 1",
            gridRow: "2 / span 1",
            color: "black",
            background: "white",
            width: "48px",
            height: "48px",
          }}
          onClick={() => handleClick("ArrowLeft")}
        ></ButtonBase>
        <ButtonBase
          sx={{
            gridColumn: "3 / span 1",
            gridRow: "2 / span 1",
            color: "black",
            background: "white",
            width: "48px",
            height: "48px",
          }}
          onClick={() => handleClick("ArrowRight")}
        ></ButtonBase>
      </Box>
    </Box>
  );
};
