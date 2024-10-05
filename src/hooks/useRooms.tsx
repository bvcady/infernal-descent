import { runStore } from "@/stores/RunStore";
import { Room } from "@/types/Room";
import { shuffle } from "@/utils/noise";
import { scale } from "@/utils/scale";
import Alea from "alea";

import { getAllRoomOptions, shovelRoom } from "@/resources/rooms/RoomOptions";
import { useEffect } from "react";
import { useStore } from "zustand";

interface Props {
  seed: string;
}

export const useRooms = ({ seed }: Props) => {
  const [w, h] = [12, 12];
  const { setRooms, setCurrentRoom } = useStore(runStore, (state) => state);

  const generateRooms = () => {
    console.clear();
    const r = Alea(seed);

    const { introRoomSituations } = getAllRoomOptions(r);

    const targetTotal = Math.floor(scale([0, 1], [18, 30])(r.next()));

    const nBossRooms = Math.floor(targetTotal - 7 / 4);
    const roomGrid = new Array(h)
      .fill("")
      .map((_, y) =>
        new Array(w).fill("").map((_, x) => {
          return {
            id: crypto.randomUUID(),
            x,
            y,
            isCollapsed: false,
            maxExits: 0,
            itemsToPlace: [],
            hazardsToPlace: [],
            tbdNeighbours: [],
            neighbours: {
              top: undefined,
              left: undefined,
              right: undefined,
              bottom: undefined,
            },
            size: 0,
          };
        })
      )
      .flat() as Room[];

    const totalRooms = [] as Room[];

    if (totalRooms.length === 0) {
      const introRoom = shuffle([...roomGrid], r)[0];
      const id = [...roomGrid].findIndex((room) => introRoom.id === room.id);
      // Take into account the edges that dont allow an exit.
      introRoom.maxExits = 2;
      const exitRequirements = new Array(introRoom.maxExits).fill("to do");
      exitRequirements[0] = shovelRoom.nextRoomRequirement || "to do";

      const nb = shuffle(exitRequirements, r);

      introRoom.tbdNeighbours = nb;
      introRoom.size = 1;
      introRoom.isCollapsed = true;
      introRoom.isBossRoom = false;
      introRoom.density = 0;
      introRoom.emptiness = 0;
      introRoom.itemsToPlace = shovelRoom.items || [];
      introRoom.entryRequirement = undefined;
      introRoom.isCollapsed = true;
      roomGrid[id] = introRoom;
      totalRooms.push(introRoom);
    }

    const collapseNextRoom = () => {
      // Find all rooms that border another already collapsed room that still allows a room to be placed next to it.

      let nNeighbours = 0;

      const options = [...roomGrid]
        .map((r) => {
          const top = [...totalRooms]?.find(
            (c) => c.x === r.x && c.y === r.y - 1 && c.isCollapsed
          );
          const bottom = [...totalRooms]?.find(
            (c) => c.x === r.x && c.y === r.y + 1 && c.isCollapsed
          );
          const left = [...totalRooms]?.find(
            (c) => c.x === r.x - 1 && c.y === r.y && c.isCollapsed
          );
          const right = [...totalRooms]?.find(
            (c) => c.x === r.x + 1 && c.y === r.y && c.isCollapsed
          );

          const count =
            Number(+!!top) +
            Number(+!!bottom) +
            Number(+!!left) +
            Number(+!!right);

          return { top, bottom, left, right, middle: r, count };
        })
        .filter(({ top, bottom, left, right, middle }) => {
          return (top || bottom || left || right) && !middle.isCollapsed;
        })
        .filter(
          ({ top, bottom, left, right }) =>
            top?.tbdNeighbours.length !== 0 &&
            bottom?.tbdNeighbours.length !== 0 &&
            left?.tbdNeighbours.length !== 0 &&
            right?.tbdNeighbours?.length !== 0
        )
        .sort((a, b) => {
          return a.count - b.count;
        });

      nNeighbours = options[0].count;

      const pickedOption = shuffle(
        options.filter((o) => o.count === nNeighbours),
        r
      )[0];

      if (!pickedOption) {
        return [...totalRooms];
      }

      // debugger;
      const { top, bottom, right, left } = pickedOption;

      const nextRoom = pickedOption.middle;
      const neighbouringRooms = [top, left, bottom, right].filter((r) => !!r);

      const isHallWay = r.next() > 0.75;

      const tbdFromNeighbour = shuffle([...neighbouringRooms], r)[0]
        .tbdNeighbours[0];

      nextRoom.entryRequirement = tbdFromNeighbour;

      if (!isHallWay) {
        if (totalRooms.length < targetTotal / 2) {
          const rs = shuffle(introRoomSituations, r)[0];
          // what is the theme of the room?
          nextRoom.itemsToPlace = rs.items || [];

          nextRoom.size = Math.floor(scale([0, 1], [1, 3])(r.next()));
          nextRoom.density = scale([0, 3], [4, 25])(r.next() * nextRoom.size);
          nextRoom.emptiness = Math.floor(
            scale([0, targetTotal], [1, 5])(r.next() * targetTotal)
          );

          nextRoom.maxExits = r.next() > 0.66 ? 3 : 2;

          const randDirs = new Array(nextRoom.maxExits - 1).fill("to do");
          randDirs[0] = rs.nextRoomRequirement;

          nextRoom.tbdNeighbours = randDirs;
        } else {
          nextRoom.size = Math.floor(scale([0, 1], [2, 5])(r.next()));
          nextRoom.maxExits = r.next() > 0.66 ? 3 : 2;
          //TODO: Random assignment of room requirement
          //TODO: Add two - three 'boss' rooms
          nextRoom.emptiness = Math.floor(
            scale([0, targetTotal], [1, 40])(r.next() * targetTotal)
          );
          nextRoom.density = scale(
            [0, targetTotal],
            [1, 25]
          )(r.next() * targetTotal);

          const randDirs = new Array(nextRoom.maxExits - 1).fill("to do");
          nextRoom.tbdNeighbours = randDirs;

          if (
            nextRoom.size === 3 &&
            totalRooms?.filter((room) => room.isBossRoom).length < 3
          ) {
            nextRoom.isBossRoom = r.next() > 0.33;
            nextRoom.entryRequirement = {
              requirements: [{ name: "skull", type: "Item", amount: 1 }],
              forcedEntry: {
                name: "heart",
                type: "Stat",
                amount: 3,
                reduce: 3,
                lessThan: true,
              },
            };
          }
        }
      } else {
        nextRoom.size = 3;
        nextRoom.maxExits = r.next() > 0.5 ? 2 : 3;
        nextRoom.density = 100;
        nextRoom.emptiness = Math.floor(
          scale([0, targetTotal], [1, 40])(r.next() * targetTotal)
        );
        const randDirs = new Array(nextRoom.maxExits - 1).fill("to do");
        nextRoom.tbdNeighbours = randDirs;
      }

      const randDirs = new Array(nextRoom.maxExits).fill("to do");
      randDirs[0] = tbdFromNeighbour;
      if (!nextRoom.entryRequirement) {
        nextRoom.entryRequirement = tbdFromNeighbour;
      }
      if (!nextRoom.tbdNeighbours?.length) {
        nextRoom.tbdNeighbours = randDirs.slice(1) || [];
      }

      for (const n of neighbouringRooms) {
        n.tbdNeighbours = n.tbdNeighbours.slice(1);

        const totId = totalRooms.findIndex((r) => r.id === n.id);
        const gridId = roomGrid.findIndex((r) => r.id === n.id);
        totalRooms[totId] = n;
        roomGrid[gridId] = n;
      }

      nextRoom.isCollapsed = true;

      const indexOfRoom = [...roomGrid].findIndex(
        (room) => room.id === nextRoom.id
      );

      if (indexOfRoom >= 0) roomGrid[indexOfRoom] = nextRoom;

      totalRooms.push(nextRoom);

      if (totalRooms.length >= targetTotal) {
        return [...totalRooms];
      }
      return collapseNextRoom();
    };

    const collapsedRooms = collapseNextRoom();
    // const collapseRoom = () => {R

    const roomsWithNeighbours = [...collapsedRooms].map((room) => {
      const neighbours = {
        top: totalRooms.find((r) => r.x === room.x && r.y === room.y - 1),
        bottom: totalRooms.find((r) => r.x === room.x && r.y === room.y + 1),
        left: totalRooms.find((r) => r.x === room.x - 1 && r.y === room.y),
        right: totalRooms.find((r) => r.x === room.x + 1 && r.y === room.y),
      };
      return { ...room, neighbours };
    });

    // console.log(roomsWithNeighbours.map((r) => r.entryRequirement));
    const selectedRoom = roomsWithNeighbours[0];
    setCurrentRoom(selectedRoom);
    setRooms(
      roomsWithNeighbours.map((r) => {
        if (r.x === selectedRoom?.x && r.y === selectedRoom?.y) {
          return { ...r, isVisited: true };
        }
        return r;
      })
    );
  };

  useEffect(() => {
    if (seed) generateRooms();
  }, [seed]);
};
