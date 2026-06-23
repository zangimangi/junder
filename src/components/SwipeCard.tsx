import { useRef } from "react";

import { useSwipe } from "../hooks/useSwipe";
import type { Profile } from "../types/profile";

import "./SwipeCard.css";

type SwipeDirection = "left" | "right";

type SwipeCardProps = {
  profile: Profile;
  onSwipe: (direction: SwipeDirection) => void;
};

export function SwipeCard({
  profile,
  onSwipe,
}: SwipeCardProps): React.JSX.Element {
  const {
    position,
    startDrag,
    moveDrag,
    endDrag,
  } = useSwipe();

  const draggingRef = useRef(false);

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement>
  ): void => {
    draggingRef.current = true;

    startDrag(event.clientX, event.clientY);
  };

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement>
  ): void => {
    if (!draggingRef.current) {
      return;
    }

    moveDrag(event.clientX, event.clientY);
  };

  const finishSwipe = (): void => {
    if (!draggingRef.current) {
      return;
    }

    draggingRef.current = false;

    const result = endDrag();

    if (result !== null) {
      onSwipe(result);
    }
  };

  const handleTouchStart = (
    event: React.TouchEvent<HTMLDivElement>
  ): void => {
    const touch = event.touches[0];

    startDrag(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (
    event: React.TouchEvent<HTMLDivElement>
  ): void => {
    const touch = event.touches[0];

    moveDrag(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = (): void => {
    const result = endDrag();

    if (result !== null) {
      onSwipe(result);
    }
  };

  const rotation = position.x / 20;

  return (
    <div
      className="swipe-card"
      style={{
        transform: `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg)`,
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={finishSwipe}
      onMouseLeave={finishSwipe}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {position.x > 40 && (
        <div className="badge like-badge">
          LIKE
        </div>
      )}

      {position.x < -40 && (
        <div className="badge nope-badge">
          NOPE
        </div>
      )}

      <img
        src={profile.image}
        alt={profile.name}
        className="profile-image"
      />

      <div className="card-content">
        <h2>
          {profile.name}, {profile.age}
        </h2>

        <p>{profile.bio}</p>
      </div>
    </div>
  );
}