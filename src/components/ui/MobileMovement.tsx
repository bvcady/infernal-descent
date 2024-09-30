import { Box, ButtonBase } from "@mui/material";
import { useRef, useState } from "react";

export const MobileMovement = () => {
  const keyboardRef = useRef<HTMLDivElement>();
  const [buttonsVisible, toggleButtonsVisible] = useState(true);

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
        gridTemplateColumns={"repeat(5, 48px)"}
        gridTemplateRows={"repeat(5, 48px)"}
      >
        <ButtonBase
          sx={{
            gridColumn: "5 / span 1",
            gridRow: "5 / span 1",
            color: "black",
            background: "white",
            width: "48px",
            height: "48px",
          }}
          onClick={() => toggleButtonsVisible((prev) => !prev)}
        >
          o
        </ButtonBase>
        {buttonsVisible ? (
          <>
            <ButtonBase
              sx={{
                gridColumn: "3 / span 1",
                gridRow: "2 / span 1",
                color: "black",
                background: "white",
                width: "48px",
                height: "48px",
              }}
              onClick={() => handleClick("ArrowUp")}
            ></ButtonBase>
            <ButtonBase
              sx={{
                gridColumn: "3 / span 1",
                gridRow: "4 / span 1",
                color: "black",
                background: "white",
                width: "48px",
                height: "48px",
              }}
              onClick={() => handleClick("ArrowDown")}
            ></ButtonBase>
            <ButtonBase
              sx={{
                gridColumn: "2 / span 1",
                gridRow: "3 / span 1",
                color: "black",
                background: "white",
                width: "48px",
                height: "48px",
              }}
              onClick={() => handleClick("ArrowLeft")}
            ></ButtonBase>
            <ButtonBase
              sx={{
                gridColumn: "4 / span 1",
                gridRow: "3 / span 1",
                color: "black",
                background: "white",
                width: "48px",
                height: "48px",
              }}
              onClick={() => handleClick("ArrowRight")}
            ></ButtonBase>
          </>
        ) : null}
      </Box>
    </Box>
  );
};
