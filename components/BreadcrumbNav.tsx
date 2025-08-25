import React from 'react';
import { Link } from 'react-router-dom';
import styles from './BreadcrumbNav.module.css';

export interface BreadcrumbLink {
  /** The destination URL for the link. */
  to: string;
  /** The text label for the link. */
  label: string;
}

export interface BreadcrumbNavProps {
  /** An array of link objects that precede the current page. */
  links: BreadcrumbLink[];
  /** The label for the current, non-interactive page in the breadcrumb trail. */
  currentPage: string;
  /** Optional additional class names to apply to the nav element. */
  className?: string;
}

/**
 * A navigation component that provides breadcrumbs to show the user's location
 * in the site hierarchy. It is designed for accessibility and consistent styling.
 */
export const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({
  links,
  currentPage,
  className,
}) => {
  return (
    <nav
      className={`${styles.breadcrumb} ${className ?? ''}`}
      aria-label="Navegación de migas de pan"
    >
      {links.map((link) => (
        <React.Fragment key={link.to}>
          <Link to={link.to}>{link.label}</Link>
          <span className={styles.separator} aria-hidden="true">
            /
          </span>
        </React.Fragment>
      ))}
      <span aria-current="page">{currentPage}</span>
    </nav>
  );
};