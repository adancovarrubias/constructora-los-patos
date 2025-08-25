import React from 'react';
import styles from './WhatsAppFloat.module.css';

// Custom WhatsApp icon component - using inline SVG for better control over styling
// and to avoid external dependencies. Icon matches WhatsApp's official branding guidelines.
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M16.6 14.2c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1-.2-.1-1-.4-1.9-1.2-.7-.6-1.2-1.4-1.3-1.6-.1-.2 0-.4.1-.5.1-.1.2-.3.4-.4.1-.1.2-.2.2-.3.1-.1.1-.2 0-.4-.1-.1-1.5-1.8-1.5-1.8-.6-.6-.8-.5-.8-.5-.1 0-.2 0-.4.1 -1.1.5-1.5 1.5-1.5 2.6 0 1.4 1 3.2 1.1 3.4.1.2 2.1 3.2 5.1 4.5.7.3 1.2.5 1.7.6.8.2 1.5.1 2.1-.1.7-.3 1.5-1.2 1.7-2.3.2-1.1.2-2 0-2.2 0-.2-.2-.3-.4-.4zM12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z" />
  </svg>
);

WhatsAppIcon.displayName = 'WhatsAppIcon';

interface WhatsAppFloatProps {
  className?: string;
  customMessage?: string;
  developmentName?: string;
}

export const WhatsAppFloat = ({ 
  className, 
  customMessage, 
  developmentName 
}: WhatsAppFloatProps) => {
  // Constructora Los Patos contact configuration
  // Using Mexico country code format for WhatsApp Business API
  const businessPhoneNumber = '5213331101112';
  
  // Generate contextual message based on props or use default
  const getInitialMessage = (): string => {
    if (customMessage) {
      return customMessage;
    }
    
    if (developmentName) {
      return `¡Hola! Me interesa conocer más sobre ${developmentName}.`;
    }
    
    // Default message for general inquiry
    return '¡Hola! Me interesa conocer más sobre sus desarrollos inmobiliarios.';
  };

  const initialContactMessage = getInitialMessage();
  const encodedMessage = encodeURIComponent(initialContactMessage);
  
  // WhatsApp Business API URL format - opens in new tab to preserve user's browsing session
  const whatsappBusinessUrl = `https://wa.me/${businessPhoneNumber}?text=${encodedMessage}`;

  return (
    <a
      href={whatsappBusinessUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.floatButton} ${className || ''}`}
      aria-label="Contactar por WhatsApp"
    >
      <WhatsAppIcon className={styles.icon} />
    </a>
  );
};