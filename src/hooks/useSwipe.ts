import { useState } from "react";

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

  const [startPoint, setStartPoint] = useState({
    x: 0,
    y: 0,
  });

  const startDrag = (x: number, y: number): void => {
    setIsDragging(true);
    setStartPoint({ x, y });
  };

  const moveDrag = (x: number, y: number): void => {
    if (!isDragging) {
      return;
    }

    setPosition({
      x: x - startPoint.x,
      y: y - startPoint.y,
    });
  };

  const endDrag = (): "left" | "right" | null => {
    setIsDragging(false);

    if (position.x > 120) {
      return "right";
    }

    if (position.x < -120) {
      return "left";
    }

    setPosition({
      x: 0,
      y: 0,
    });

    return null;
  };

  const reset = (): void => {
    setPosition({
      x: 0,
      y: 0,
    });
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