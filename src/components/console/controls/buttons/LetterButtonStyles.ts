import { miniFont } from "@/utils/defaultValues";
import { ButtonBase, styled, css } from "@mui/material";
import { Box } from "@mui/system";

export const LetterButtonContainer = styled(Box)<{ w: number }>`
  --w: ${({ w }) => w }px;
  width: calc(var(--w)*2.25);
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: inset 0 calc(var(--w)/4) 8px 0 rgba(0, 0, 0, 0.2);
  padding: calc(var(--w)/10);
  border-radius: var(--w);
  rotate: -33deg;
  button {
    font-size: calc(var(--w) / 2.5);
    width: var(--w);
    aspect-ratio: 1;
    rotate: 33deg;

  }
`;
export const LetterButtonWrapper = styled(ButtonBase)<{
  color?: string;
}>`
  border-radius: 100%;
  color: ${({color}) => color};
  font-family: ${miniFont.style.fontFamily};
  text-align: center;

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
  /* box-shadow: inset 0 0 0 2px blanchedalmond,
    inset 1px 1px 4px 0px rgba(0, 0, 0, 0.2); */

`;