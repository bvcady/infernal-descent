import { ReactNode } from "react";
import { ButtonAreaWrapper } from "./Console.styles";
import { useStore } from "zustand";
import { windowStore } from "@/stores/WindowStore";

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
