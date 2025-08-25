import { Skeleton } from "./Skeleton";
import styles from "./DevelopmentPageSkeleton.module.css";

export const DevelopmentPageSkeleton = () => {
  return (
    <div className={styles.container}>
      <Skeleton className={styles.hero} />
      <div className={styles.content}>
        <Skeleton className={styles.title} />
        <Skeleton className={styles.text} />
        <Skeleton className={styles.textShort} />
        
        <div className={styles.section}>
          <Skeleton className={styles.sectionTitle} />
          <div className={styles.grid}>
            <div className={styles.card}>
              <Skeleton className={styles.cardTitle} />
              <Skeleton className={styles.cardText} />
              <Skeleton className={styles.cardText} />
            </div>
            <div className={styles.card}>
              <Skeleton className={styles.cardTitle} />
              <Skeleton className={styles.cardText} />
              <Skeleton className={styles.cardText} />
            </div>
            <div className={styles.card}>
              <Skeleton className={styles.cardTitle} />
              <Skeleton className={styles.cardText} />
              <Skeleton className={styles.cardText} />
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <Skeleton className={styles.sectionTitle} />
          <div className={styles.galleryGrid}>
            <Skeleton className={styles.galleryItem} />
            <Skeleton className={styles.galleryItem} />
            <Skeleton className={styles.galleryItem} />
            <Skeleton className={styles.galleryItem} />
          </div>
        </div>
      </div>
    </div>
  );
};