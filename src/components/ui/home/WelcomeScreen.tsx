import { windowStore } from "@/stores/WindowStore";
import { Box } from "@mui/material";
import { createPortal } from "react-dom";
import { useStore } from "zustand";
import { Button } from "../interactive/Button";

interface Props {
  dead?: boolean;
}
export const WelcomeScreen = ({ dead }: Props) => {
  const { cellSize } = useStore(windowStore);
  return (
    <>
      <Box
        width={"100%"}
        height={"100%"}
        position={"relative"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignContent={"center"}
      >
        <Box
          width={"100%"}
          height={"80%"}
          sx={{
            transform: dead ? "translateY(-12.5%)" : undefined,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundImage: "url(../../images/logo_inferno_descent.png)",
            backgroundSize: "contain",
          }}
        />
        {dead
          ? createPortal(
              <Box
                width={`${cellSize * 6}px`}
                sx={{
                  position: "absolute",
                  bottom: "0px",
                  zIndex: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  aspectRatio: "160/144",
                  backgroundPosition: "bottom",
                  backgroundSize: "contain",
                  filter: "invert()",
                  backgroundRepeat: "no-repeat",
                  backgroundImage: `url("../../images/lisa/dead.png")`,
                }}
              />,
              document.getElementById("ui-screen") || document.body
            )
          : null}
      </Box>
    </>
  );
};
