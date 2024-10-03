import { Box } from "@mui/material";

export const WelcomeScreen = () => {
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
