import { ReactNode } from "react";
import { Wrapper } from "./Console.styles";

interface Props {
  children?: ReactNode;
  p: number;
}
export const Console = ({ children, p }: Props) => {
  return <Wrapper p={p}>{children}</Wrapper>;
};
