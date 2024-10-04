import { levelStore } from "@/stores/LevelStore";
import { playerStore } from "@/stores/PlayerStore";
import { windowStore } from "@/stores/WindowStore";
import { Item } from "@/types/Item";
import { CSSProperties, useCallback, useEffect, useMemo, useRef } from "react";
import { useStore } from "zustand";
import { DefaultTile } from "../tiles/default/DefaultTile";
import { Cell } from "@/types/Cell";
import { usePlaySound } from "@/hooks/usePlaySound";

interface Props {
  cell?: Item;
  isStatic?: boolean;
  style?: CSSProperties;
}

export const Shovel = ({ cell, isStatic, style = {} }: Props) => {
  const itemRef = useRef<HTMLDivElement>();
  const requestRef = useRef(0);
  const { player, addItem, inventory } = useStore(playerStore);
  const { setItems, items } = useStore(levelStore);
  const { toggleShowAHint } = useStore(windowStore);

  // public/Audio/Impact Sounds/Audio/impactMining_002.ogg
  const { play } = usePlaySound({
    soundFile: "../../Audio/Impact Sounds/Audio/impactMining_002.ogg",
    options: {
      volume: 0.4,
    },
  });

  const playerIsOn = useMemo(
    () => cell && player?.x === cell?.x && player?.y === cell?.y,
    [player]
  );

  useEffect(() => {
    if (!inventory.items.find((item) => item.item.name === "shovel"))
      toggleShowAHint(!!playerIsOn);
  }, [playerIsOn]);

  const handleGrab = useCallback(
    (e: KeyboardEvent) => {
      if (playerIsOn && cell && e.key === "a") {
        toggleShowAHint(false);
        addItem(cell);
        setItems(
          items.filter(
            (item) => !(item.x === player?.x && item.y === player?.y)
          )
        );
        play();
      }
    },
    [playerIsOn, player, items, addItem, setItems]
  );

  useEffect(() => {
    addEventListener("keyup", handleGrab);
    return () => removeEventListener("keyup", handleGrab);
  }, [handleGrab]);

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
        ? `translateY(calc(${
            playerIsOn ? "-75%" : "0%"
          } )) rotate(180deg) scale(-1, 1)`
        : `translateY(calc(${
            playerIsOn ? "-75%" : "0%"
          } - 10%)) rotate(180deg) scale(-1, 1)`;
    }

    requestRef.current = requestAnimationFrame((time) => animate(time));
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  return (
    <DefaultTile
      style={{ ...style }}
      tileRef={itemRef}
      className="itemKey"
      cell={cell as Cell}
      customPath="images/Monochrome/Tilemap/shovel.png"
      noBackground
    />
  );
};
