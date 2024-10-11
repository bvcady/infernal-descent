import { ReactNode } from "react";
import { ButtonAreaWrapper } from "./Console.styles";

interface Props {
  children?: ReactNode;
  isMobile?: boolean;
}

export const ButtonArea = ({ children, isMobile }: Props) => {
  return (
    <ButtonAreaWrapper style={{ visibility: isMobile ? "visible" : "hidden" }}>
      {children}
    </ButtonAreaWrapper>
  );
};
