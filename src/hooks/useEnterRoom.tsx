import { levelStore } from "@/stores/LevelStore";
import { playerStore } from "@/stores/PlayerStore";
import { runStore } from "@/stores/RunStore";
import { Room } from "@/types/Room";
import { useCallback, useEffect } from "react";
import { useStore } from "zustand";

export const useEnterRoom = () => {
  const {
    player,
    inventory,
    stats,
    removeItem,
    removeTile,
    heal,
    updateShards,
  } = useStore(playerStore);
  const { updateRooms, rooms, currentRoom } = useStore(runStore);
  const { walls, items, tiles } = useStore(levelStore);

  const checkCanEnter = (nextRoom?: Room): boolean => {
    if (!nextRoom) {
      return false;
    }
    const exit = player?.exit;

    if (!exit && !player) {
      return false;
    }

    if (exit?.isVisited) {
      return true;
    }

    const reqs = exit?.entryRequirement;
    if (reqs === "to do") {
      return true;
    }

    const requirements = reqs?.requirements;
    const forced = reqs?.forcedEntry;

    if (!requirements && !forced) {
      return true;
    }

    if (requirements?.type === "Item") {
      const possibleItem = inventory.items.find(
        (item) => item.name === requirements.name
      );
      if (possibleItem) {
        if (requirements.reduce) {
          removeItem(possibleItem);
        }
        return true;
      }
      const possibleTile = inventory.tiles.find(
        (tile) => tile?.item?.name === requirements.name
      );
      if (possibleTile) {
        if (requirements.reduce) {
          removeTile(possibleTile?.n);
        }
        return true;
      }
    }

    if (requirements?.type === "Stat") {
      if (requirements.name === "health" && requirements.amount) {
        if (stats.health >= requirements?.amount) {
          return true;
        }
      }
      if (requirements.name === "shards" && requirements.amount) {
        if (stats.shards >= requirements?.amount) {
          updateShards(-(requirements.reduce || 0));
          return true;
        }
      }
      if (requirements.name === "steps" && requirements.amount) {
        if (stats.steps >= requirements?.amount) {
          return true;
        }
      }
      if (require.name === "weight") {
        return true;
      }
    }

    if (requirements?.type === "Room") {
      if (requirements.name === "health_lost") {
        if (currentRoom?.health_lost && !currentRoom?.health_gained) {
          return true;
        }
      }
      if (requirements.name === "health_gained") {
        if (!currentRoom?.health_lost && currentRoom?.health_gained) {
          return true;
        }
      }
    }

    if (forced) {
      if (forced.type === "Stat") {
        if (forced.name === "health") {
          heal(-(forced.reduce || 0));
        }
        if (forced.name === "shards") {
          updateShards(-(forced.reduce || 0));
        }
      }
      return true;
    }

    return false;
  };

  const handleKeyUp = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "a") {
        if (player && player.exit) {
          const nextRoom = [...rooms].find((r) => r.id === player?.exit?.id);
          if (checkCanEnter(nextRoom)) {
            updateRooms(nextRoom, { walls, items, tiles });
          }
        }
      }
    },
    [inventory, player, stats, rooms, currentRoom]
  );

  useEffect(() => {
    addEventListener("keyup", handleKeyUp);
    return () => removeEventListener("keyup", handleKeyUp);
  }, [player]);
};
