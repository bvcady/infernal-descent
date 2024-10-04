import { miniFont } from "@/utils/defaultValues";
import { ButtonBase, styled, css } from "@mui/material";
import { Box } from "@mui/system";

export const LetterButtonContainer = styled(Box)<{ w: number }>`
  --rot: 12deg;
  --w: ${({ w }) => w }px;
  width: calc(var(--w)*2.25);
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: inset 0 calc(var(--w)/4) 8px 0 rgba(0, 0, 0, 0.2);
  padding: calc(var(--w)/7.5);
  border-radius: var(--w);
  rotate: calc(-1*var(--rot));
  button {
    color: #333333DD;
    font-size: calc(var(--w) / 2.5);
    width: var(--w);
    aspect-ratio: 1;
    rotate: var(--rot);
    box-shadow: inset 2px 2px 2px 0 rgba(255, 255,255, 0.3), 2px 2px 2px 0 rgba(0, 0, 0, 0.1);
    span {
      transform: translateY(-33%);
    }
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
        `
      : css`
          background-color: white;
        `}
  /* box-shadow: inset 0 0 0 2px blanchedalmond,
    inset 1px 1px 4px 0px rgba(0, 0, 0, 0.2); */

`;