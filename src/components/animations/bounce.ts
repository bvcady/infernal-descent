import { keyframes } from "@emotion/react";

export const bounce = keyframes`
  from {
    transform: translateY(-10%);
  }
  50% {
    transform: translateY(-20%);
  }
  to {
    transform: translateY(-10%);
  }
`;