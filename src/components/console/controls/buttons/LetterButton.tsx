import { LetterButtonWrapper } from "./LetterButtonStyles";

interface Props {
  callback?: () => void;
  color?: string;
  letter: string;
}

export const LetterButton = ({ callback, color, letter }: Props) => {
  return (
    <LetterButtonWrapper
      color={color}
      onClick={(e) => {
        e.preventDefault();
        callback?.();
      }}
    >
      <span style={{ marginLeft: "5%" }}>{letter.toLocaleUpperCase()}</span>
    </LetterButtonWrapper>
  );
};
