import { useEffect, useState } from "react";

import "./Notification.css";

type NotificationProps = {
  active: boolean;
};

const notifications: string[] = [
  "ジュン liked you",
  "Hiro sent you a super like",
  "Jun viewed your profile",
  "ヒロキ liked you",
  "たかだ sent a message",
];

export const Notification = ({
  active,
}: NotificationProps): JSX.Element | null => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!active) {
      return;
    }

    const random =
      notifications[Math.floor(Math.random() * notifications.length)];

    setMessage(random);

    const timer = window.setTimeout(() => {
      setMessage("");
    }, 3000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [active]);

  if (!message) {
    return null;
  }

  return <div className="notification">{message}</div>;
};