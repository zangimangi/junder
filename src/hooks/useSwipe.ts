import { useRef, useState } from "react";

type UseSwipeReturn = {
  position: {
    x: number;
    y: number;
  };
  isDragging: boolean;
  startDrag: (x: number, y: number) => void;
  moveDrag: (x: number, y: number) => void;
  endDrag: () => "left" | "right" | null;
  reset: () => void;
};

export const useSwipe = (): UseSwipeReturn => {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  const [isDragging, setIsDragging] = useState(false);

  const startPointRef = useRef({ x: 0, y: 0 });
  const positionRef = useRef({ x: 0, y: 0 });
  const dragAxisRef = useRef<"horizontal" | "vertical" | "none">("none");

  const startDrag = (x: number, y: number): void => {
    setIsDragging(true);
    startPointRef.current = { x, y };
    dragAxisRef.current = "none";
    positionRef.current = { x: 0, y: 0 };
    setPosition({ x: 0, y: 0 });
  };

  const moveDrag = (x: number, y: number): void => {
    if (!isDragging) {
      return;
    }

    const deltaX = x - startPointRef.current.x;
    const deltaY = y - startPointRef.current.y;

    if (dragAxisRef.current === "none") {
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 8) {
        dragAxisRef.current = "horizontal";
      } else if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 8) {
        dragAxisRef.current = "vertical";
      }
    }

    if (dragAxisRef.current === "horizontal") {
      const easedX = deltaX * 0.92;
      const easedY = deltaY * 0.16;
      const nextPosition = {
        x: easedX,
        y: easedY,
      };
      positionRef.current = nextPosition;
      setPosition(nextPosition);
    } else if (dragAxisRef.current === "vertical") {
      const nextPosition = {
        x: 0,
        y: deltaY,
      };
      positionRef.current = nextPosition;
      setPosition(nextPosition);
    }
  };

  const endDrag = (): "left" | "right" | null => {
    setIsDragging(false);

    const shouldSwipe =
      dragAxisRef.current === "horizontal" &&
      (positionRef.current.x > 120 || positionRef.current.x < -120);

    const swipeDirection = positionRef.current.x > 0 ? "right" : "left";
    const nextPosition = { x: 0, y: 0 };
    positionRef.current = nextPosition;
    setPosition(nextPosition);
    dragAxisRef.current = "none";

    if (shouldSwipe) {
      return swipeDirection;
    }

    return null;
  };

  const reset = (): void => {
    setPosition({
      x: 0,
      y: 0,
    });
    positionRef.current = { x: 0, y: 0 };
    dragAxisRef.current = "none";
    setIsDragging(false);
  };

  return {
    position,
    isDragging,
    startDrag,
    moveDrag,
    endDrag,
    reset,
  };
};