import styled from "@emotion/styled";

export const Wrapper = styled("div")<{p: number}>`
  background-color: grey;
  padding: ${({p}) => p}px;
  border-radius: 0.25rem;
  box-shadow: 0 0.5rem 1rem 0.25rem rgba(0, 0, 0, 0.2);
  margin-bottom: 2rem;
  border-bottom-right-radius: 2rem;
  width: fit-content;
  z-index: 1;
`;

export const ScreenPadding = styled("div")<{w: number}>`
  width: ${({w}) => w}px;
  aspect-ratio: 160/144;
  position: relative;
  border-radius: ${({w}) => w/10/8}px;
  overflow: hidden;
`;

export const ButtonAreaWrapper = styled("div")`
  width: 100%;
  display: grid;
  place-items: center;
  grid-template-columns: repeat(3, 1fr);
`;
