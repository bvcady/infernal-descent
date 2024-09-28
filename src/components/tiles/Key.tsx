import { Cell } from "@/types/Cell";
import { useEffect, useRef } from "react";
import { DefaultTile } from "../cells/DefaultTile";

interface Props {
  cell?: Cell;
}

const d = 17;

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

  return <DefaultTile cell={cell} tileNumber={15 + 6 * d} noBackground />;
};
