import { ReactNode } from "react";
import { DirectionalPadWrapper } from "../styles/ButtonsStyled";

interface Props {
  children: ReactNode;
}

export const DirectionalPad = ({ children }: Props) => {
  return <DirectionalPadWrapper>{children}</DirectionalPadWrapper>;
};
