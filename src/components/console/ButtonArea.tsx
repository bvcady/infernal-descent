import { ReactNode } from "react";
import { ButtonAreaWrapper } from "./Console.styles";
import { useStore } from "zustand";
import { windowStore } from "@/stores/WindowStore";

interface Props {
  children?: ReactNode;
  isMobile?: boolean;
}

export const ButtonArea = ({ children, isMobile }: Props) => {
  const { cellSize } = useStore(windowStore);
  return (
    <ButtonAreaWrapper
      w={cellSize / 2}
      style={{ visibility: isMobile ? "visible" : "hidden" }}
    >
      {children}
    </ButtonAreaWrapper>
  );
};
