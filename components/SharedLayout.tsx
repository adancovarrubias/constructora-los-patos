import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { WhatsAppFloat } from "./WhatsAppFloat";
import styles from "./SharedLayout.module.css";

interface SharedLayoutProps {
  children: React.ReactNode;
}

/**
 * SharedLayout Component - Constructora Los Patos
 * 
 * ARCHITECTURE OVERVIEW:
 * This component implements a responsive layout architecture that serves as the foundation
 * for all pages in the Constructora Los Patos website. It provides consistent branding,
 * navigation, and user experience across desktop and mobile devices.
 * 
 * KEY ARCHITECTURAL DECISIONS:
 * - Sticky header with z-index layering for optimal navigation accessibility
 * - Mobile-first responsive design with progressive enhancement for desktop
 * - Integrated WhatsApp floating button for lead generation optimization
 * - Semantic HTML structure for SEO and accessibility compliance
 */
export const SharedLayout: React.FC<SharedLayoutProps> = ({ children }) => {
  // Mobile menu state management - controls hamburger menu visibility
  const [isMobileNavigationMenuOpen, setIsMobileNavigationMenuOpen] = useState(false);
  
  // Get current location for contextual WhatsApp messages
  const location = useLocation();

  /**
   * NAVIGATION STRATEGY:
   * Centralized navigation configuration allows for easy maintenance and ensures
   * consistency across desktop and mobile experiences. Each route is carefully
   * chosen to reflect our business structure and user journey optimization.
   */
  const primaryNavigationLinks = [
    { to: "/", label: "Inicio" },
    { to: "/nosotros", label: "Nosotros" },
    { to: "/desarrollos", label: "Desarrollos" }, // Primary conversion page
    { to: "/politica-de-calidad", label: "Política de Calidad" }, // Trust building
    { to: "/contacto", label: "Contacto" }, // Secondary conversion page
  ];

  /**
   * MOBILE MENU INTERACTION HANDLERS:
   * These handlers manage the mobile hamburger menu state and provide smooth
   * user experience transitions. The menu automatically closes on navigation
   * to prevent user confusion and maintain clean UX flow.
   */
  const toggleMobileNavigationMenu = () => {
    setIsMobileNavigationMenuOpen(!isMobileNavigationMenuOpen);
  };

  const closeMobileNavigationMenu = () => {
    setIsMobileNavigationMenuOpen(false);
  };

  /**
   * CONTEXTUAL WHATSAPP MESSAGING STRATEGY:
   * Generates personalized WhatsApp messages based on the current page/route.
   * This improves lead qualification and user experience by providing relevant context.
   */
  const generateContextualWhatsAppMessage = (): string => {
    const currentPath = location.pathname;
    
    // Development-specific messages for targeted lead generation
    if (currentPath === '/desarrollos/torres-colon') {
      return '¡Hola! Me interesa conocer más sobre Torres Colón.';
    }
    
    if (currentPath === '/desarrollos/ecoterra-paraiso') {
      return '¡Hola! Me interesa conocer más sobre Ecoterra Paraíso.';
    }
    
    if (currentPath === '/desarrollos/las-ceibas-manzanillo') {
      return '¡Hola! Me interesa conocer más sobre Las Ceibas.';
    }
    
    if (currentPath === '/desarrollos') {
      return '¡Hola! Me interesa conocer más sobre sus desarrollos inmobiliarios.';
    }
    
    // Default message for all other pages
    return '¡Hola! Me interesa conocer más sobre sus desarrollos inmobiliarios.';
  };

  return (
    <div className={styles.layout}>
      {/* 
        HEADER ARCHITECTURE:
        Sticky positioning ensures navigation is always accessible during scroll.
        The header uses CSS Grid for optimal alignment and responsive behavior.
        Z-index management prevents conflicts with page content and modals.
      */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          {/* 
            BRAND IDENTITY:
            Logo serves as both brand identifier and home navigation link.
            Animated GIF enhances brand personality while maintaining professionalism.
          */}
          <Link to="/" className={styles.logo}>
            <img
              src="https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/fd229655-4c4e-408d-9ea3-ec40c2d2bef7.gif"
              alt="Constructora Los Patos Logo"
              className={styles.logoImage}
            />
          </Link>
          
          {/* 
            DESKTOP NAVIGATION STRATEGY:
            Horizontal navigation optimized for desktop screens (768px+).
            Uses React Router's NavLink for automatic active state management.
            Hover effects and active indicators provide clear user feedback.
          */}
          <nav className={styles.desktopNavigation}>
            {primaryNavigationLinks.map((navigationLink) => (
              <NavLink
                key={navigationLink.to}
                to={navigationLink.to}
                className={({ isActive }) =>
                  `${styles.desktopNavigationLink} ${isActive ? styles.active : ""}`
                }
                end={navigationLink.to === "/"}
              >
                {navigationLink.label}
              </NavLink>
            ))}
          </nav>

          {/* 
            HAMBURGER MENU LOGIC:
            Three-line hamburger transforms to X when active using CSS animations.
            Accessibility attributes ensure screen reader compatibility.
            Only visible on mobile breakpoints (< 768px) via CSS media queries.
          */}
          <button
            className={`${styles.hamburgerMenuButton} ${isMobileNavigationMenuOpen ? styles.open : ""}`}
            onClick={toggleMobileNavigationMenu}
            aria-label="Menu de hamburguesa"
            aria-expanded={isMobileNavigationMenuOpen}
          >
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
          </button>
        </div>

        {/* 
          MOBILE NAVIGATION ARCHITECTURE:
          Collapsible menu with smooth height transitions for premium feel.
          Vertical layout optimized for touch interaction on mobile devices.
          Auto-close on navigation prevents user confusion and maintains flow.
        */}
        <div className={`${styles.mobileNavigationMenu} ${isMobileNavigationMenuOpen ? styles.mobileNavigationMenuOpen : ""}`}>
          <nav className={styles.mobileNavigation}>
            {primaryNavigationLinks.map((navigationLink) => (
              <NavLink
                key={navigationLink.to}
                to={navigationLink.to}
                className={({ isActive }) =>
                  `${styles.mobileNavigationLink} ${isActive ? styles.active : ""}`
                }
                end={navigationLink.to === "/"}
                onClick={closeMobileNavigationMenu}
              >
                {navigationLink.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      {/* 
        MOBILE MENU BACKDROP:
        Semi-transparent overlay provides visual focus on navigation menu.
        Click-to-close functionality improves user experience and accessibility.
        Z-index positioning ensures proper layering with page content.
      */}
      {isMobileNavigationMenuOpen && (
        <div 
          className={styles.mobileMenuBackdrop} 
          onClick={closeMobileNavigationMenu}
        />
      )}

      {/* 
        MAIN CONTENT AREA:
        Flexible container that grows to fill available space.
        Ensures footer stays at bottom regardless of content height.
      */}
      <main className={styles.main}>{children}</main>
      
      {/* 
        FOOTER ARCHITECTURE:
        Contains essential business information and legal compliance.
        Consistent branding with primary color scheme.
        Contact information strategically placed for lead generation.
      */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p>
            &copy; {new Date().getFullYear()} Constructora Los Patos. Todos los
            derechos reservados.
          </p>
          <p>
            Av. Miguel Ángel #7, Real Vallarta, Zapopan, Jalisco 45020 | Tel:
            33-31-10-11-12
          </p>
        </div>
      </footer>
      
      {/* 
        WHATSAPP INTEGRATION STRATEGY:
        Floating WhatsApp button provides immediate communication channel.
        Positioned to be accessible but not intrusive to main content.
        Critical for lead generation and customer service optimization.
      */}
      <WhatsAppFloat customMessage={generateContextualWhatsAppMessage()} />
    </div>
  );
};