import { useEffect, useRef } from "react";
import { SSButtonWrapper } from "./SSButtonStyles";

interface Props {
  callback?: () => void;
}

export const SSButton = ({ callback }: Props) => {
  const keyboardRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    addEventListener("keyup", (e) => {
      e.preventDefault();
      if (e.repeat) {
        return;
      }
      if (e.key === "s") {
        keyboardRef?.current?.click();
      }
    });
  }, []);

  return (
    <SSButtonWrapper
      ref={keyboardRef}
      onClick={(e) => {
        e.preventDefault();
        callback?.();
      }}
    />
  );
};
