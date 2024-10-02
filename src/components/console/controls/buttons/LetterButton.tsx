import { useRef } from "react";
import { LetterButtonWrapper } from "./LetterButtonStyles";

interface Props {
  color?: string;
  letter: string;
}

export const LetterButton = ({ color, letter }: Props) => {
  const keyboardRef = useRef<HTMLButtonElement>(null);

  const handleClick = (key: string, type: "keydown" | "keyup") => {
    const event = new KeyboardEvent(type, {
      key: key.toLocaleLowerCase(),
      bubbles: true,
    });
    keyboardRef?.current?.dispatchEvent(event);
  };

  return (
    <LetterButtonWrapper
      ref={keyboardRef}
      color={color}
      onTouchStart={(e) => {
        e.preventDefault();
        handleClick(letter, "keydown");
      }}
      onTouchEnd={(e) => {
        e.preventDefault();
        handleClick(letter, "keyup");
      }}
      onMouseDown={(e) => {
        e.preventDefault();
        handleClick(letter, "keydown");
      }}
      onMouseUp={(e) => {
        e.preventDefault();
        handleClick(letter, "keyup");
      }}
    >
      <span style={{ marginLeft: "5%" }}>{letter.toLocaleUpperCase()}</span>
    </LetterButtonWrapper>
  );
};
