import React from 'react';
import { MapPin } from 'lucide-react';
import styles from './HeroSection.module.css';

type HeroHeight = 'primary' | 'secondary' | 'compact';

export interface HeroSectionProps {
  /** The URL for the background image of the hero section. */
  backgroundImageUrl: string;
  /** The URL for the logo image to be displayed. */
  logoUrl?: string;
  /** The alt text for the logo image. */
  logoAlt?: string;
  /** The main title or tagline for the hero section. */
  title: React.ReactNode;
  /** The location text to be displayed, e.g., "Guadalajara, Jalisco". */
  location?: string;
  /** Defines the height of the hero section using predefined sizes. Defaults to 'primary'. */
  height?: HeroHeight;
  /** Optional additional class names to apply to the root element. */
  className?: string;
}

/**
 * A reusable hero section component for creating impactful page headers.
 * It supports a background image, overlay, logo, title, and location display.
 * The height is configurable to adapt to different page needs.
 */
export const HeroSection: React.FC<HeroSectionProps> = ({
  backgroundImageUrl,
  logoUrl,
  logoAlt,
  title,
  location,
  height = 'primary',
  className,
}) => {
  const heightClass = {
    primary: styles.heightPrimary,
    secondary: styles.heightSecondary,
    compact: styles.heightCompact,
  }[height];

  return (
    <header
      className={`${styles.hero} ${heightClass} ${className ?? ''}`}
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      role="banner"
    >
      <div className={styles.heroOverlay} aria-hidden="true" />
      <div className={styles.heroContent}>
        {logoUrl && (
          <img
            src={logoUrl}
            alt={logoAlt || 'Logo'}
            className={styles.heroLogo}
            width="180"
            height="65"
            loading="lazy"
          />
        )}
        <div className={styles.heroTextContainer}>
          <h1 className={styles.heroTitle}>{title}</h1>
          {location && (
            <p className={styles.heroLocation}>
              <MapPin size={18} aria-hidden="true" /> {location}
            </p>
          )}
        </div>
      </div>
    </header>
  );
};