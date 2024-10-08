import { windowStore } from "@/stores/WindowStore";
import { miniFont } from "@/utils/defaultValues";
import { ButtonBase, styled } from "@mui/material";
import { useStore } from "zustand";

interface Props {
  callback?: () => void;
  label?: string;
}

const CustomButton = styled(ButtonBase)`
  color: black;
  font-family: ${miniFont.style.fontFamily};
  display: grid;
  background-color: white;
  max-width: fit-content;
  height: fit-content;
  border-radius: 4px;
`;

export const Button = ({ callback, label }: Props) => {
  const { cellSize } = useStore(windowStore);
  return (
    <CustomButton
      sx={{
        marginBottom: "1rem",
        padding: `${cellSize / 4}px`,
        zIndex: 1000,
        pointerEvents: "all",
        cursor: "pointer",
      }}
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
