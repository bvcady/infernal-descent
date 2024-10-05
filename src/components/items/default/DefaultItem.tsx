import { levelStore } from "@/stores/LevelStore";
import { playerStore } from "@/stores/PlayerStore";
import { windowStore } from "@/stores/WindowStore";
import { Item } from "@/types/Item";
import { Box, styled } from "@mui/material";

import {
  CSSProperties,
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { useStore } from "zustand";

interface Props {
  item?: Item;
  isStatic?: boolean;
  customSpriteName?: string;
  itemRef?: MutableRefObject<HTMLDivElement | undefined>;
  itemStyle?: CSSProperties;
  spriteStyle?: CSSProperties;
  positionOverride?: { x: number; y: number };
  playPickUpSound?: () => void;
}

const AnimatedWrapper = styled(Box)``;

const DefaultWrapper = styled(Box)``;

export const DefaultItem = ({
  item,
  isStatic,
  customSpriteName,
  itemStyle = {},
  spriteStyle = {},
  playPickUpSound,
  positionOverride,
}: Props) => {
  const itemRef = useRef<HTMLDivElement>();
  const requestRef = useRef(0);

  const { cellSize, toggleShowAHint } = useStore(windowStore);
  const { player, inventory, addItem, heal, updateShards } =
    useStore(playerStore);
  const { setItems, items } = useStore(levelStore);

  const bgPath = `url("../../images/Monochrome/Tilemap/${
    customSpriteName || item?.name || "key"
  }.png")`;

  const playerIsOn = useMemo(
    () => player?.x === item?.x && player?.y === item?.y,
    [player]
  );

  useEffect(() => {
    if (
      !inventory.items.find(
        (i) => i.name === item?.name && item?.type === "Obtainable"
      )
    )
      toggleShowAHint(!!playerIsOn);
  }, [playerIsOn]);

  const animate = (time: number) => {
    const speed = 1500;
    const isUp = time % speed < speed / 2;

    if (itemRef.current) {
      if (playerIsOn) {
        itemRef.current.style.zIndex = "1000";
      } else {
        itemRef.current.style.zIndex = "unset";
      }
      itemRef.current.style.transform = isUp
        ? `translateY(calc(${playerIsOn ? "-75%" : "0%"} )) `
        : `translateY(calc(${playerIsOn ? "-75%" : "0%"} - 10%)) `;
    }

    requestRef.current = requestAnimationFrame((time) => animate(time));
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(!isStatic ? animate : () => {});
    return () => cancelAnimationFrame(requestRef.current);
  }, [playerIsOn]);

  const handleGrab = useCallback(
    (e: KeyboardEvent) => {
      if (playerIsOn && e.key === "a" && item && !isStatic) {
        toggleShowAHint(false);
        if (item.type === "Obtainable") {
          addItem(item);
        } else if (item.type === "Stat") {
          if (item.name === "heart_whole") {
            heal(2);
          }
          if (item.name === "heart_half") {
            heal(1);
          }
          if (item.name === "shard_one") {
            updateShards(1);
          }
        }
        setItems(
          items.filter(
            (item) => !(item.x === player?.x && item.y === player?.y)
          )
        );
        playPickUpSound?.();
      }
    },
    [playerIsOn, player, items, item, isStatic]
  );

  useEffect(() => {
    addEventListener("keyup", handleGrab);
    return () => removeEventListener("keyup", handleGrab);
  }, [handleGrab]);

  return (
    <AnimatedWrapper
      ref={itemRef}
      className={item?.name}
      sx={{
        pointerEvents: "none",
        userSelect: "none",
        gridColumnStart: item ? item?.x + 1 : (positionOverride?.x || 0) + 1,
        gridRowStart: item ? item?.y + 1 : (positionOverride?.y || 0) + 1,
        gridColumnEnd: "span 1",
        gridRowEnd: "span 1",
        display: "grid",
        placeItems: "center",
        ...itemStyle,
      }}
    >
      <DefaultWrapper
        width={cellSize}
        height={cellSize}
        sx={{
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundImage: bgPath,
          ...spriteStyle,
        }}
      />
    </AnimatedWrapper>
  );
};
