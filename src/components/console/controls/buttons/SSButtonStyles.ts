import { Box, ButtonBase, styled } from "@mui/material";

export const SSButtonContainer = styled(Box)<{w: number}>`
  --w: ${({w}) => w}px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  border-radius: calc(var(--w) /4);
  width: calc(var(--w) * 2);
  /* height: calc(var(--w)); */
  padding: calc(var(--w) / 4);
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;

  box-shadow: inset calc(var(--w)/4) calc(var(--w)/12) 8px 0 rgba(0, 0, 0, 0.2);
  
  button {
    /* min-width: 5px;
    min-height: 6px; */
    
    box-shadow: inset 0 calc(var(--w)/20) 0 0 rgba(255,255,255, 0.2);
    width: calc(var(--w) * 2);
    align-self: flex-start;

    :last-of-type {
      align-self: flex-end;
    }
  }
`;

export const SSButtonWrapper = styled(ButtonBase)`
  aspect-ratio: 5/1;
  border-radius: var(--w);
  background-color: #252533;
`;


//   style={{
//     display: "flex",
//     flexDirection: "column",
//     gap: "0.5rem",
//     transform: "translateX(24px)",
//   }}
