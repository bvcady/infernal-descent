import styled from "@emotion/styled";
import { ButtonBase, css } from "@mui/material";

export const SSButtonWrapper = styled(ButtonBase)`
  width: 56px;
  height: 12px;
  border-radius: 1rem;
  background-color: var(--lightColor);
  box-shadow: inset 0 0 0 1px var(--lightColor),
    inset 1px 1px 4px 0px var(--bgColor);
  transform: rotate(-22.5deg);
  :first-of-type {
    transform: rotate(-22.5deg) translateX(-32px);
  }
`;
export const LetterButtonWrapper = styled(ButtonBase)<{ color?: string }>`
  height: 46px;
  width: 46px;
  border-radius: 100%;
  font-family: var(--font-sofia);
  font-size: 20px;
  ${({ color }) =>
    color
      ? css`
          background-color: ${color};
          color: var(--lightColor);
        `
      : css`
          background-color: (--lightColor);
          color: var(--lightColor);
        `}
  transform: rotate(-22.5deg);
  box-shadow: inset 0 0 0 2px var(--lightColor),
    inset 1px 1px 4px 0px var(--bgColor);

  :last-of-type {
    margin-right: 36px;
  }
`;

interface WrapperProps {
  rotation: string;
  position: "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight";
}

export const ArrowButtonWrapper = styled(ButtonBase)<WrapperProps>`
  height: 32px;
  width: 32px;
  display: grid;
  place-items: center;
  border-radius: 0.25rem;
  border: 2px solid blanchedalmond;
  border-bottom: none;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;

  ${({ rotation }) => css`
    transform: rotate(${rotation});
  `}
  ${({ position }) => css`
    grid-area: ${position};
    ${position === "ArrowUp" &&
    css`
      grid-row: 1 / span 1;
      grid-column: 2 / span 1;
      transform: translateY(2px);
    `}
    ${position === "ArrowLeft" &&
    css`
      grid-row: 2 / span 1;
      grid-column: 1 / span 1;
    `}
    ${position === "ArrowDown" &&
    css`
      grid-row: 3 / span 1;
      grid-column: 2 / span 1;
    `}
    ${position === "ArrowRight" &&
    css`
      grid-row: 2 / span 1;
      grid-column: 3 / span 1;
    `}
  `}
`;

export const DirectionalPadWrapper = styled("div")`
  align-self: flex-start;
  width: fit-content;

  display: grid;
  grid-template-areas:
    "up up up"
    "left x right"
    "down down down";
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  place-items: center;
  position: relative;
  margin: 24px 0rem;

  overflow: visible !important;
  * {
    border-radius: 0.25rem;
  }
`;
