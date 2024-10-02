import { ReactNode } from "react";
import { DirectionalPadWrapper } from "../styles/ButtonsStyled";

interface Props {
  children: ReactNode;
}

export const DirectionalPad = ({ children }: Props) => {
  return (
    <DirectionalPadWrapper>
      {children}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: "33%",
          right: "33%",
          background: "lightgrey",
          zIndex: -1,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: "33%",
          bottom: "33%",
          background: "lightgrey",
          zIndex: -1,
        }}
      />
      <div
        style={{
          gridArea: "x",
          filter: "blur(5px)",
          borderRadius: "0.25rem",
          width: "100%",
          height: "100%",
          background: "rgba(0, 0, 0, 0.05)",
        }}
      ></div>
    </DirectionalPadWrapper>
  );
};
