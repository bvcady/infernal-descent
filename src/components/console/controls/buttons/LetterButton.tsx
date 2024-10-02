import { LetterButtonWrapper } from "../styles/ButtonsStyled";

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
      {letter.toLocaleUpperCase()}
    </LetterButtonWrapper>
  );
};
