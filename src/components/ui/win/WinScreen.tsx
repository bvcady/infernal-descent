import { DefaultItem } from "@/components/items/default/DefaultItem";
import { windowStore } from "@/stores/WindowStore";
import { miniFont } from "@/utils/defaultValues";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useStore } from "zustand";

export const WinScreen = () => {
  const {
    toggleShowAHint,
    toggleShowBHint,
    toggleShowStartHint,
    toggleShowXHint,
    toggleShowZHint,
  } = useStore(windowStore);

  useEffect(() => {
    toggleShowAHint("");
    toggleShowBHint(false);
    toggleShowZHint(false);
    toggleShowXHint(false);
    toggleShowStartHint(true);
  }, []);

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
        sx={{ mixBlendMode: "screen" }}
      >
        <Box
          width={`${cellSize * 6}px`}
          sx={{
            position: "absolute",
            // bottom: "0px",
            zIndex: 0,
            left: "50%",
            transform: "translateX(-50%)",
            aspectRatio: "160/144",
            backgroundPosition: "bottom",
            backgroundSize: "contain",
            filter: "invert()",
            backgroundRepeat: "no-repeat",
            backgroundImage: `url("../../images/lisa/altar.png")`,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              zIndex: 2,
              fontFamily: miniFont.style.fontFamily,
              fontSize: cellSize / 2,
              color: "black",
            }}
          >{`YOU'VE WON`}</span>
          <DefaultItem
            itemStyle={{ position: "absolute", top: "30%", marginLeft: "4px" }}
            customSpriteName="skull"
          />
        </Box>
      </Box>
    </>
  );
};
