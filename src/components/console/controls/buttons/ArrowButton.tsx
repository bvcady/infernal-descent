import { useRef } from "react";
import { ArrowButtonWrapper } from "../styles/ButtonsStyled";
import { useStore } from "zustand";
import { windowStore } from "@/stores/WindowStore";

interface Props {
  callback: () => void;
  rotation?: string;
  dir: "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight";
}
export const ArrowButton = ({ dir, rotation = "0deg" }: Props) => {
  const { cellSize } = useStore(windowStore);
  const keyboardRef = useRef<HTMLButtonElement>(null);
  const handleClick = (
    dir: "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight"
  ) => {
    const event = new KeyboardEvent("keyup", {
      key: dir,
      bubbles: true,
    });
    keyboardRef?.current?.dispatchEvent(event);
  };

  return (
    <ArrowButtonWrapper
      style={{
        width: cellSize * 1.25,
        height: cellSize * 1.25,
        borderWidth: `${cellSize / 12}px`,
      }}
      ref={keyboardRef}
      {...{ position: dir, rotation }}
      onClick={(e) => {
        e.preventDefault();
        handleClick(dir);
      }}
    ></ArrowButtonWrapper>
  );
};
