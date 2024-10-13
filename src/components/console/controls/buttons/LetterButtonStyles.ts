import { miniFont } from "@/utils/defaultValues";
import { ButtonBase, styled, css } from "@mui/material";
import { Box } from "@mui/system";

export const LetterButtonContainer = styled(Box)`
  --rot: 12deg;
  width: calc(var(--uiW)*2.25);
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: inset 0 calc(var(--uiW)/4) 8px 0 rgba(0, 0, 0, 0.2);
  padding: calc(var(--uiW)/7.5);
  border-radius: var(--uiW);
  rotate: calc(-1*var(--rot));
  border: calc(var(--uiW)/20) solid blanchedalmond;

  button {
    color: #333333DD;
    font-size: calc(var(--uiW) / 2.5);
    width: var(--uiW);
    aspect-ratio: 1;
    rotate: var(--rot);
    box-shadow: inset 2px 2px 2px 0 rgba(255, 255,255, 0.3), 2px 2px 2px 0 rgba(0, 0, 0, 0.1);
    span:first-of-type {
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
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ color }) =>
    color
      ? css`
          background-color: ${color};
        `
      : css`
          background-color: white;
        `}

`;