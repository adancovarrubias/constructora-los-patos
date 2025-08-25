import React from 'react';
import styles from './ContentSection.module.css';

export interface ContentSectionProps {
  /** A unique identifier for the section, useful for anchor links. */
  id?: string;
  /** The main title of the section, displayed as an `h2` element. */
  title?: string;
  /** A subtitle or descriptive text displayed below the title. */
  subtitle?: string;
  /** The background color variant. 'default' is transparent, 'muted' applies a subtle background color. */
  variant?: 'default' | 'muted';
  /** The content to be rendered inside the section. */
  children: React.ReactNode;
  /** Optional additional class names to apply to the root section element. */
  className?: string;
  /** Optional additional class names to apply to the inner content container. */
  contentClassName?: string;
}

/**
 * A reusable component for structuring content sections with consistent styling.
 * It provides standardized padding, max-width, and typography for titles and subtitles,
 * and supports different background variants.
 */
export const ContentSection: React.FC<ContentSectionProps> = ({
  id,
  title,
  subtitle,
  variant = 'default',
  children,
  className,
  contentClassName,
}) => {
  const sectionClasses = [
    styles.section,
    variant === 'muted' ? styles.bgMuted : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const contentClasses = [styles.sectionContent, contentClassName]
    .filter(Boolean)
    .join(' ');

  return (
    <section id={id} className={sectionClasses}>
      <div className={contentClasses}>
        {title && <h2 className={styles.sectionTitle}>{title}</h2>}
        {subtitle && <p className={styles.sectionSubtitle}>{subtitle}</p>}
        {children}
      </div>
    </section>
  );
};