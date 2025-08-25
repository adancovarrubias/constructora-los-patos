import React from "react";
import { Skeleton } from "./Skeleton";
import styles from "./DevelopmentCardSkeleton.module.css";

export const DevelopmentCardSkeleton: React.FC = () => {
  return (
    <div className={styles.card}>
      <Skeleton className={styles.imageSkeleton} />
      <div className={styles.content}>
        <Skeleton className={styles.titleSkeleton} />
        <Skeleton className={styles.taglineSkeleton} />
        <Skeleton className={styles.descriptionSkeleton} />
        <Skeleton className={styles.descriptionSkeleton} />
        <div className={styles.modelsSkeleton}>
          <Skeleton className={styles.modelItemSkeleton} />
          <Skeleton className={styles.modelItemSkeleton} />
          <Skeleton className={styles.modelItemSkeleton} />
        </div>
        <Skeleton className={styles.buttonSkeleton} />
      </div>
    </div>
  );
};