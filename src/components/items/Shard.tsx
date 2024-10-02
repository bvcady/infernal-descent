import { levelStore } from "@/stores/LevelStore";
import { playerStore } from "@/stores/PlayerStore";
import { windowStore } from "@/stores/WindowStore";
import { Item } from "@/types/Item";
import { useEffect, useMemo, useRef } from "react";
import { useStore } from "zustand";
import { DefaultTile } from "../tiles/default/DefaultTile";
import { Cell } from "@/types/Cell";

interface Props {
  cell: Item;
  isStatic?: boolean;
}

export const Shard = ({ cell, isStatic }: Props) => {
  const itemRef = useRef<HTMLDivElement>();
  const requestRef = useRef(0);
  const { player, addItem } = useStore(playerStore);
  const { setItems, items } = useStore(levelStore);
  const { toggleShowXHint } = useStore(windowStore);

  const playerIsOn = useMemo(
    () => player?.x === cell?.x && player?.y === cell?.y,
    [player]
  );

  useEffect(() => {
    toggleShowXHint(playerIsOn);
  }, [playerIsOn]);

  const handleGrab = (e: KeyboardEvent) => {
    if (playerIsOn && e) {
      if (e.key === "x") {
        toggleShowXHint(false);
        setItems(
          items.filter((item) => !(item.x === cell?.x && item.y === cell.y))
        );
        addItem(cell);
      }
    }
  };

  useEffect(() => {
    addEventListener("keyup", handleGrab);
    return () => removeEventListener("keyup", handleGrab);
  }, [playerIsOn]);

  const animate = (time: number) => {
    const speed = 1500;
    const isUp = time % speed < speed / 2;

    // if (playSound) {
    //   setShouldPlay(true);
    // } else {
    //   setShouldPlay(false);
    // }

    if (itemRef.current && !isStatic) {
      if (playerIsOn) {
        itemRef.current.style.zIndex = "1000";
      } else {
        itemRef.current.style.zIndex = "unset";
      }
      itemRef.current.style.transform = isUp
        ? `translateY(calc(${playerIsOn ? "-75%" : "0%"} ))`
        : `translateY(calc(${playerIsOn ? "-75%" : "0%"} - 10%))`;
    }

    requestRef.current = requestAnimationFrame((time) => animate(time));
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [playerIsOn]);

  return (
    <DefaultTile
      tileRef={itemRef}
      className="itemKey"
      cell={cell as Cell}
      customPath="images/Monochrome/Tilemap/shard.png"
      noBackground
    />
  );
};
