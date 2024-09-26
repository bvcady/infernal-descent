"use client";

import { useGrid } from "@/hooks/useGrid";
import { scale } from "@/utils/scale";
import { Box } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { Rock } from "../cells/Rock";
import { Path } from "../cells/Path";
import { Player } from "../tiles/Player";
import { Chest } from "../tiles/Chest";
import { Key } from "../tiles/Key";
import { Rubble } from "../tiles/Rubble";
import { RockBottom } from "../tiles/RockBottom";

const maxWidth = 5;
const stepSize = 10;
const cellSize = 24;

export const Map = () => {
  const [dimensions, setDimensions] = useState({ x: 30, y: 30 });
  const [density, setDensity] = useState(1);
  const setDimension = () => {
    const x =
      Math.floor(scale([0, 1], [2, maxWidth])(Math.random())) * stepSize;
    console.log({ x });
    setDensity(Math.floor(Math.random() * 5));
    return setDimensions({
      x,
      y: Math.floor(x * (9 / 16)),
    });
  };
  useEffect(() => {
    setDimension();
  }, []);
  const { x: width, y: height } = dimensions;
  const [seed, setSeed] = useState<string>(
    (Math.random() + 1).toString(36).substring(7)
  );
  const { cells, start, exit, POI } = useGrid({
    width: dimensions.x,
    height: dimensions.y,
    seed,
    density,
  });

  const updateSeed = () => {
    const r = (Math.random() + 1).toString(36).substring(4).toLocaleUpperCase();
    setDimension();
    setSeed(r);
  };

  return (
    <Box
      position={"relative"}
      width={"fit-content"}
      height={"fit-content"}
      overflow={"hidden"}
      borderRadius={"4px"}
    >
      <Box
        position={"relative"}
        // bgcolor={"black"}
        onClick={updateSeed}
        width={maxWidth * cellSize * stepSize}
        height={(Math.floor(maxWidth) / (16 / 9)) * cellSize * stepSize}
        borderRadius={"4px"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        sx={{
          cursor: "pointer",
          mixBlendMode: "screen",
          zIndex: 3,
        }}
      >
        <Box
          position={"absolute"}
          padding={cellSize}
          minWidth={"fit-content"}
          maxWidth={"fit-content"}
          p={cellSize}
          sx={{
            display: "grid",
            gridTemplateColumns: `repeat(${width}, ${cellSize}px)`,
            gridTemplateRows: `repeat(${height}, ${cellSize}px)`,
          }}
        >
          {cells.map((c) => (
            <Fragment key={`cell - ${seed} - ${c.x} - ${c.y}`}>
              <Box
                sx={{
                  display: "grid",
                  placeItems: "center",
                  position: "relative",
                }}
                width={cellSize}
                height={cellSize}
              >
                {c.isRock ? <Rock cellSize={cellSize} cell={c} /> : null}
                {c.isPath ? <Path cellSize={cellSize} cell={c} /> : null}
                {c.isLava ? <Path cellSize={cellSize} cell={c} /> : null}
                {/* {c.isOutside && c.neighbours?.top?.isRock ? (
                  <Path cellSize={cellSize} cell={c} />
                ) : null} */}
              </Box>
            </Fragment>
          ))}
        </Box>
        <Box
          position={"absolute"}
          padding={cellSize}
          minWidth={"fit-content"}
          maxWidth={"fit-content"}
          p={cellSize}
          sx={{
            display: "grid",
            gridTemplateColumns: `repeat(${width}, ${cellSize}px)`,
            gridTemplateRows: `repeat(${height}, ${cellSize}px)`,
            placeItems: "center",
          }}
        >
          {cells
            .filter(
              (c) => c.neighbours?.top?.isRock && !c.isRock && !c.isOutside
            )
            .map((cell) => (
              <RockBottom
                key={`rubble - ${cell.x} - ${cell.y}`}
                cell={cell}
                cellSize={cellSize}
              />
            ))}
          {cells
            .filter((c) => c.isLava)
            .map((cell) => (
              <Rubble
                key={`rubble - ${cell.x} - ${cell.y}`}
                cell={cell}
                cellSize={cellSize}
              />
            ))}
          <Player cellSize={cellSize} cell={start} />
          <Chest cellSize={cellSize} cell={exit} />
          <Key cellSize={cellSize} cell={POI} />
        </Box>
      </Box>
      <Box bgcolor={"#200827"} position={"absolute"} sx={{ inset: "0" }} />
    </Box>
  );
};
