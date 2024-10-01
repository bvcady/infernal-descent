import { Cell } from "@/types/Cell";
import { useEffect, useRef } from "react";
import { DefaultTile } from "../tiles/default/DefaultTile";

interface Props {
  cell?: Cell;
}

export const Key = ({ cell }: Props) => {
  const keyRef = useRef<HTMLDivElement>();
  const requestRef = useRef(0);

  const animate = (time: number) => {
    const speed = 1500;
    const isUp = time % speed < speed / 2;

    // if (playSound) {
    //   setShouldPlay(true);
    // } else {
    //   setShouldPlay(false);
    // }

    if (keyRef.current) {
      keyRef.current.style.transform = isUp
        ? "translateY(0%)"
        : "translateY(-5%)";
    }

    requestRef.current = requestAnimationFrame((time) => animate(time));
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  return (
    <DefaultTile
      cell={cell}
      customPath="images/Monochrome/Tilemap/threat3.png"
      noBackground
      style={{
        transform: "rotate(90deg) scale(1, -1)",
      }}
    />
  );
};
