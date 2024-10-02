import { ReactNode } from "react";
import { ButtonAreaWrapper } from "./Console.styles";

interface Props {
  children?: ReactNode;
}

export const ButtonArea = ({ children }: Props) => {
  return <ButtonAreaWrapper>{children}</ButtonAreaWrapper>;
};
