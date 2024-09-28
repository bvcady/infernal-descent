import { miniFont } from "@/utils/defaultValues";
import { ButtonBase, styled } from "@mui/material";

interface Props {
  callback?: () => void;
  label?: string;
  width?: number;
}

const CustomButton = styled(ButtonBase)`
  color: black;
  font-family: ${miniFont.style.fontFamily};
  display: grid;
  background-color: white;
  height: fit-content;
  padding: 4px;
`;

export const Button = ({ callback, label, width = 3 }: Props) => {
  // const tiles = new Array(width * 2).fill("").map((_, i) => i);
  return (
    <CustomButton
      onClick={() => {
        callback?.();
      }}
    >
      {/* {tiles.map((tile) => (
        <DefaultTile key={tile} />
      ))} */}
      {label}
    </CustomButton>
  );
};
