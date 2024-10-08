import styled from "@emotion/styled";
import { ButtonBase, css } from "@mui/material";

interface WrapperProps {
  rotation: string;
  position: "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight";
}

export const ArrowButtonWrapper = styled(ButtonBase)<WrapperProps>`
  display: grid;
  place-items: center;
  border-radius: 0.25rem;
  border: 2px solid blanchedalmond;
  border-bottom: none;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;

  ${({ position, rotation }) => css`
    grid-area: ${position};
    ${position === "ArrowUp" &&
    css`
      grid-row: 1 / span 1;
      grid-column: 2 / span 1;
      transform: translateY(2px) rotate(${rotation});
    `}
    ${position === "ArrowLeft" &&
    css`
      grid-row: 2 / span 1;
      grid-column: 1 / span 1;
      transform: translateX(2px) rotate(${rotation});
    `}
      ${position === "ArrowDown" &&
    css`
      grid-row: 3 / span 1;
      grid-column: 2 / span 1;
      transform: translateY(-2px) rotate(${rotation});
    `}
      ${position === "ArrowRight" &&
    css`
      grid-row: 2 / span 1;
      grid-column: 3 / span 1;
      transform: translateX(-2px) rotate(${rotation});
    `}
  `}
`;

export const DirectionalPadWrapper = styled("div")`
  align-self: flex-start;
  width: fit-content;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  place-items: center;
  position: relative;
  margin-top: auto;
`;
