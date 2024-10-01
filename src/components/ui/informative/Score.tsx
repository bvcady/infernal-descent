import { miniFont } from "@/utils/defaultValues";
import { styled } from "@mui/material";
import { Box } from "@mui/system";
import { ReactNode } from "react";
import { GridWrapper } from "../../level/GridWrapper";

const ScoreWrapper = styled(Box)`
  color: white;
  font-family: ${miniFont.style.fontFamily};
`;

interface Props {
  width?: number;
  height?: number;
  children?: ReactNode;
}
export const Score = ({ width = 10, height = 10, children }: Props) => {
  return (
    <GridWrapper {...{ width, height }}>
      <ScoreWrapper>{children}</ScoreWrapper>
    </GridWrapper>
  );
};
