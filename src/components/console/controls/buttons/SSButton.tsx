import { SSButtonWrapper } from "../styles/ButtonsStyled";

interface Props {
  callback?: () => void;
}

export const SSButton = ({ callback }: Props) => {
  return (
    <SSButtonWrapper
      onClick={(e) => {
        e.preventDefault();
        callback?.();
      }}
    />
  );
};
