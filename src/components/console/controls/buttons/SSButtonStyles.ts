import { Box, ButtonBase, styled } from "@mui/material";

export const SSButtonContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  border-radius: calc(var(--uiW) /4);
  background-color: rgba(0, 0, 0, 0.4);
  border: calc(var(--uiW)/20) solid blanchedalmond;
  border-bottom: none;
  width: calc(var(--uiW) * 2);
  /* height: calc(var(--uiW)); */
  padding: calc(var(--uiW) / 2);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;

  box-shadow: inset calc(var(--uiW)/4) calc(var(--uiW)/12) 8px 0 rgba(0, 0, 0, 0.2);
  
  button {
    /* min-width: 5px;
    min-height: 6px; */
    
    box-shadow: inset 0 calc(var(--uiW)/20) 0 0 rgba(255,255,255, 0.2);
    width: calc(var(--uiW) * 2);
    align-self: flex-start;

    :last-of-type {
      align-self: flex-end;
    }
  }
`;

export const SSButtonWrapper = styled(ButtonBase)`
  aspect-ratio: 5/1;
  border-radius: var(--uiW);
  background-color: #252533;
`;


//   style={{
//     display: "flex",
//     flexDirection: "column",
//     gap: "0.5rem",
//     transform: "translateX(24px)",
//   }}
