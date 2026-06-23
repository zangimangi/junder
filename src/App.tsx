import { useState } from "react";

import { Header } from "./components/Header";
import { Notification } from "./components/Notification";
import { SwipeCard } from "./components/SwipeCard";
import { MatchModal } from "./components/MatchModal";
import { ActionButtons } from "./components/ActionButtons";

import { profiles } from "./data/profiles";

import type { Profile } from "./types/profile";

import "./App.css";

type SwipeDirection = "left" | "right";

export default function App(): React.JSX.Element {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const [matchedProfile, setMatchedProfile] =
    useState<Profile | null>(null);

  const [matchOpen, setMatchOpen] =
    useState<boolean>(false);

  const [notificationSeed, setNotificationSeed] =
    useState<number>(0);

  const currentProfile: Profile =
    profiles[currentIndex];

  const nextProfile = (): void => {
    setCurrentIndex((prev) => {
      const next = prev + 1;

      if (next >= profiles.length) {
        return 0;
      }

      return next;
    });
  };

  const handleSwipe = (
    direction: SwipeDirection
  ): void => {
    const profile = profiles[currentIndex];

    setNotificationSeed((prev) => prev + 1);

    if (direction === "right") {
      const matched =
        Math.random() < profile.matchRate;

      if (matched) {
        setMatchedProfile(profile);
        setMatchOpen(true);
        return;
      }
    }

    nextProfile();
  };

  const closeMatch = (): void => {
    setMatchOpen(false);
    setMatchedProfile(null);
    nextProfile();
  };

  const stackProfiles: Profile[] = [
    profiles[currentIndex],
    profiles[(currentIndex + 1) % profiles.length],
    profiles[(currentIndex + 2) % profiles.length],
  ];

  return (
    <div className="app">
      <Header />

      <Notification
        key={notificationSeed}
        active={true}
      />

      <main className="main">
        <div className="card-stack">
          {stackProfiles
            .slice()
            .reverse()
            .map((profile, index) => {
              const isTopCard =
                profile.id === currentProfile.id;

              return (
                <div
                  key={profile.id}
                  className="stack-layer"
                  style={{
                    zIndex: index,
                    transform: `scale(${
                      1 - index * 0.04
                    }) translateY(${
                      index * 12
                    }px)`,
                  }}
                >
                  {isTopCard && (
                    <SwipeCard
                      profile={profile}
                      onSwipe={handleSwipe}
                    />
                  )}

                  {!isTopCard && (
                    <div className="preview-card">
                      <img
                        src={profile.image}
                        alt={profile.name}
                        className="preview-image"
                      />
                    </div>
                  )}
                </div>
              );
            })}
        </div>

        <ActionButtons
          onAction={handleSwipe}
        />
      </main>

      <MatchModal
        open={matchOpen}
        profile={matchedProfile}
        onClose={closeMatch}
      />
    </div>
  );
}