import styled from "@emotion/styled";

export const Wrapper = styled("div")<{p: number}>`
  background-color: grey;
  padding: ${({p}) => p}px; 
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 0.25rem;
  box-shadow: 0 0.5rem 1rem 0.25rem rgba(0, 0, 0, 0.2);
  margin-bottom: 2rem;
  border-bottom-right-radius: 2rem;
  min-width: ${({p}) => p * 2 * 10}px;
  width: ${({p}) => p * 2 * 10}px;
  max-width: ${({p}) => p * 2 * 10}px;
  height: ${({p}) => p * 2 * 10 *1.333}px;
  overflow: hidden;
  z-index: 1;
`;

export const ScreenPadding = styled("div")<{w: number}>`
  width: ${({w}) => w}px;
  min-height: ${({w}) => w / ( 160/144)}px;
  height: ${({w}) => w / ( 160/144)}px;
  max-height: ${({w}) => w / ( 160/144)}px;
  position: relative;
  border-radius: ${({w}) => w/10/8}px;
  overflow: hidden;
`;

export const ButtonAreaWrapper = styled("div")`
  margin-top: auto;
  width: 100%;
  height: 100%;
  max-height: fit-content;
  display: grid;
  place-items: center;
  grid-template-columns: repeat(3, 1fr);
`;
