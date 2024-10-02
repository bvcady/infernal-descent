import { Box } from "@mui/material";
import { useEffect } from "react";

interface Props {
  setSeed: (s: string) => void;
}

export const WelcomeScreen = ({ setSeed }: Props) => {
  const updateSeed = (e: KeyboardEvent) => {
    if (e.key === "s") {
      const r = (Math.random() + 1)
        .toString(36)
        .substring(4)
        .toLocaleUpperCase();
      setSeed(r);
    }
  };

  useEffect(() => {
    addEventListener("keyup", (e) => updateSeed(e));
    return () => removeEventListener("keyup", (e) => updateSeed(e));
  }, []);

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
          width={"100%"}
          height={"80%"}
          sx={{
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundImage: "url(../../images/logo_inferno_descent.png)",
            backgroundSize: "contain",
          }}
        />
      </Box>
    </>
  );
};
