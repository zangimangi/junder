import "./ActionButtons.css";

type SwipeDirection = "left" | "right";

type ActionButtonsProps = {
  onAction: (direction: SwipeDirection) => void;
};

export function ActionButtons({
  onAction,
}: ActionButtonsProps): React.JSX.Element {
  return (
    <div className="action-buttons">
      <button
        type="button"
        className="action-button nope"
        onClick={() => onAction("left")}
      >
        ✕
      </button>

      <button
        type="button"
        className="action-button like"
        onClick={() => onAction("right")}
      >
        ♥
      </button>
    </div>
  );
}