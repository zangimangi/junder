import type { Profile } from "../types/profile";

import "./MatchModal.css";

type MatchModalProps = {
  open: boolean;
  profile: Profile | null;
  onClose: () => void;
};

export function MatchModal({
  open,
  profile,
  onClose,
}: MatchModalProps): React.JSX.Element | null {
  if (!open || profile === null) {
    return null;
  }

  return (
    <div className="match-overlay">
      <div className="match-modal">
        <h1>It's a Junder!</h1>

        <p>
          You and {profile.name} liked each other.
        </p>

        <div className="match-images">
          <img
            src={profile.image}
            alt={profile.name}
          />
        </div>

        <button
          type="button"
          className="match-button"
          onClick={onClose}
        >
          Continue
        </button>
      </div>
    </div>
  );
}