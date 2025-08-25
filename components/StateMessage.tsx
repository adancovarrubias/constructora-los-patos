import React from "react";
import { AlertTriangle, Info, LoaderCircle } from "lucide-react";
import styles from "./StateMessage.module.css";

type StateMessageProps = {
  /** The type of state to display, determines icon and color. */
  type: "error" | "empty" | "loading";
  /** The main title of the message. */
  title: string;
  /** The descriptive text for the message. */
  message: string;
  /** Optional additional class names for custom styling. */
  className?: string;
};

const typeConfig = {
  error: {
    Icon: AlertTriangle,
    className: styles.error,
    ariaRole: "alert" as const,
  },
  empty: {
    Icon: Info,
    className: styles.empty,
    ariaRole: "status" as const,
  },
  loading: {
    Icon: LoaderCircle,
    className: styles.loading,
    ariaRole: "status" as const,
  },
};

/**
 * A component to display various states like error, empty, or loading
 * in a consistent and accessible manner.
 */
export const StateMessage: React.FC<StateMessageProps> = ({
  type,
  title,
  message,
  className,
}) => {
  const { Icon, className: typeClassName, ariaRole } = typeConfig[type];

  return (
    <div
      className={`${styles.container} ${typeClassName} ${className ?? ""}`}
      role={ariaRole}
      aria-live={type === "error" ? "assertive" : "polite"}
    >
      <div className={styles.iconWrapper}>
        <Icon className={styles.icon} aria-hidden="true" />
      </div>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.message}>{message}</p>
    </div>
  );
};