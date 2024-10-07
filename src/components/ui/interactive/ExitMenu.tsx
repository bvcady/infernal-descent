import { DefaultItem } from "@/components/items/default/DefaultItem";
import { windowStore } from "@/stores/WindowStore";
import { Room } from "@/types/Room";
import { miniFont } from "@/utils/defaultValues";
import { Box } from "@mui/material";
import { Fragment } from "react";
import { createPortal } from "react-dom";
import { useStore } from "zustand";

interface Props {
  exit: Room;
}

export const ExitMenu = ({ exit }: Props) => {
  const entryOptions = exit.entryRequirement;
  const { cellSize } = useStore(windowStore);
  if (entryOptions === "to do") {
    return null;
  }
  const requirements = entryOptions?.requirements;
  const forcedEntry = entryOptions?.forcedEntry;

  return (
    <>
      {createPortal(
        <Box
          pt={"8px"}
          position={"absolute"}
          bgcolor={"#b0b0b0"}
          border={"4px solid black"}
          display={"flex"}
          sx={{
            inset: cellSize * 1.75,
            zIndex: 0,
            fontFamily: miniFont.style.fontFamily,
          }}
        >
          {requirements?.type === "Item" ? (
            <Box
              width={`${cellSize * 4}px`}
              sx={{
                position: "absolute",
                bottom: "-45%",
                border: "4px solid black",
                left: "50%",
                transform: "translateX(-50%)",
                aspectRatio: "160/144",
                backgroundColor: "white",
                backgroundPosition: "bottom",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundImage: `url("../../images/lisa/item.png")`,
              }}
            >
              <DefaultItem
                spriteStyle={{
                  marginTop: `${cellSize / 2}px`,
                  width: cellSize * 1.25,
                  height: cellSize * 1.25,
                }}
                customSpriteName={requirements?.name}
              />
            </Box>
          ) : null}
          {requirements?.type === "Stat" && requirements?.name === "shard" ? (
            <Box
              width={`${cellSize * 4}px`}
              sx={{
                position: "absolute",
                bottom: "-12.5%",
                border: "4px solid black",
                left: "50%",
                transform: "translateX(-50%)",
                aspectRatio: "160/144",
                backgroundColor: "white",
                backgroundPosition: "bottom",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundImage: `url("../../images/lisa/item.png")`,
              }}
            >
              <DefaultItem
                spriteStyle={{
                  marginTop: `${cellSize / 2}px`,
                  width: cellSize * 1.25,
                  height: cellSize * 1.25,
                }}
                customSpriteName={requirements?.name}
              />
            </Box>
          ) : null}
          {requirements?.type === "Stat" &&
          requirements?.name === "health_gained" ? (
            <Box
              width={`${cellSize * 4}px`}
              sx={{
                position: "absolute",
                bottom: "-12.5%",
                border: "4px solid black",
                left: "50%",
                transform: "translateX(-50%)",
                aspectRatio: "160/144",
                backgroundColor: "white",
                backgroundPosition: "bottom",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundImage: `url("../../images/lisa/item.png")`,
              }}
            >
              <DefaultItem
                spriteStyle={{
                  marginTop: `${cellSize / 2}px`,
                  width: cellSize * 1.25,
                  height: cellSize * 1.25,
                }}
                customSpriteName={requirements?.name}
              />
            </Box>
          ) : null}
          <Box
            width={"80%"}
            margin={"0 auto"}
            sx={{
              display: "flex",
              flexDirection: "column",
              paddingTop: "12.5%",
              zIndex: 2,
            }}
          >
            <span
              style={{
                fontSize: "1.25rem",
                backgroundColor: "black",
                color: "white",
                position: "absolute",
                padding: "4px",
                top: 0,
                left: 0,
              }}
            >
              ROOM EXIT
            </span>

            {requirements ? (
              <span>
                Requires:{" "}
                <span
                  style={{
                    backgroundColor: "green",
                    color: "white",
                    padding: "4px 8px",
                    display: "inline-block",
                  }}
                >
                  {requirements.pretty?.toUpperCase()}{" "}
                  {requirements.amount && `x ${requirements.amount}`}
                </span>{" "}
              </span>
            ) : null}

            {forcedEntry ? (
              <Fragment>
                <span style={{ marginTop: "4px" }}>
                  {requirements ? "Otherwise:" : "Entry Cost:"}{" "}
                  <span
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      padding: "4px 8px",
                      display: "inline-block",
                    }}
                  >
                    {"- "}
                    {forcedEntry.pretty?.toUpperCase()}{" "}
                    {entryOptions.forcedEntry?.reduce &&
                      `x ${
                        entryOptions.forcedEntry?.name === "heart"
                          ? entryOptions.forcedEntry?.reduce / 2
                          : entryOptions.forcedEntry?.reduce
                      }`}
                  </span>
                </span>
              </Fragment>
            ) : (
              <Fragment>
                <span>Can NOT be forced.</span>
              </Fragment>
            )}
          </Box>
        </Box>,
        document.getElementById("ui-screen") || document.body
      )}
    </>
  );
};
