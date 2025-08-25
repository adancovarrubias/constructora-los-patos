import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DevelopmentWithModels } from "../endpoints/developments_GET.schema";
import { Button } from "./Button";
import { Badge } from "./Badge";
import { getDevelopmentUrl } from "../helpers/developmentUtils";
import { MapPin, BedDouble, Bath, Square, ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./DevelopmentCard.module.css";

interface DevelopmentCardProps {
  development: DevelopmentWithModels;
}

// Mexican peso formatter - handles various input types from database
// Uses Mexican locale for proper number formatting and currency display
const formatMexicanPesos = (value: number | string | null | undefined) => {
  if (value === null || value === undefined) return "N/A";
  const numericValue = typeof value === "string" ? parseFloat(value) : value;
  
  // Format as Mexican pesos without decimal places (standard for real estate pricing)
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numericValue);
};

export const DevelopmentCard: React.FC<DevelopmentCardProps> = ({
  development,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  // Image gallery logic - prioritizes database gallery, falls back to main image
  // This handles cases where developments might not have full galleries yet
  const propertyImages = development.galleryImages && development.galleryImages.length > 0
    ? development.galleryImages
    : [
        {
          url: development.imageUrl || "/placeholder-house.jpg",
          alt: `Vista principal de ${development.name}`
        }
      ];
  
  console.log(`Development ${development.name} has ${propertyImages.length} images:`, propertyImages);
  
  // Defensive programming - ensure image index stays within valid range
  const safeImageIndex = Math.min(activeImageIndex, propertyImages.length - 1);
  const showImageNavigation = propertyImages.length > 1;
  
  console.log(`Development ${development.name} showImageNavigation:`, showImageNavigation);

  // Image navigation handlers - circular navigation for better UX
  const navigateToNextImage = () => {
    if (!showImageNavigation) return;
    setActiveImageIndex((safeImageIndex + 1) % propertyImages.length);
  };

  const navigateToPreviousImage = () => {
    if (!showImageNavigation) return;
    setActiveImageIndex((safeImageIndex - 1 + propertyImages.length) % propertyImages.length);
  };

  // Direct image selection for thumbnails and indicators
  const selectImageByIndex = (targetIndex: number) => {
    if (targetIndex < 0 || targetIndex >= propertyImages.length) return;
    setActiveImageIndex(targetIndex);
  };

  return (
    <article className={styles.card}>
      <div className={styles.imageContainer}>
        <div className={styles.imageWrapper}>
          <img
            src={propertyImages[safeImageIndex].url}
            alt={propertyImages[safeImageIndex].alt}
            className={styles.image}
          />
          
          {/* Location overlay - always visible for quick property identification */}
          <div className={styles.location}>
            <MapPin size={16} />
            <span>{development.location}</span>
          </div>
          
          {/* Image gallery navigation - only shown when multiple images available */}
          {showImageNavigation && (
            <>
              {/* Previous/Next navigation buttons */}
              <button
                className={`${styles.navButton} ${styles.navButtonPrev}`}
                onClick={navigateToPreviousImage}
                aria-label="Imagen anterior"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                className={`${styles.navButton} ${styles.navButtonNext}`}
                onClick={navigateToNextImage}
                aria-label="Siguiente imagen"
              >
                <ChevronRight size={20} />
              </button>
              
              {/* Dot indicators for quick navigation */}
              <div className={styles.imageIndicators}>
                {propertyImages.map((_, index) => (
                  <button
                    key={`indicator-${index}`}
                    className={`${styles.indicator} ${
                      index === safeImageIndex ? styles.indicatorActive : ""
                    }`}
                    onClick={() => selectImageByIndex(index)}
                    aria-label={`Ver imagen ${index + 1} de ${propertyImages.length}`}
                  />
                ))}
              </div>

              {/* Thumbnail navigation - provides visual preview of available images */}
              <div className={styles.thumbnailContainer}>
                {propertyImages.map((image, index) => (
                  <button
                    key={`thumbnail-${index}`}
                    className={`${styles.thumbnail} ${
                      index === safeImageIndex ? styles.thumbnailActive : ""
                    }`}
                    onClick={() => selectImageByIndex(index)}
                  >
                    <img
                      src={image.url}
                      alt={image.alt}
                      className={styles.thumbnailImage}
                    />
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <div className={styles.content}>
        {/* Development header information */}
        <h2 className={styles.name}>{development.name}</h2>
        <p className={styles.tagline}>"{development.tagline}"</p>
        <p className={styles.description}>{development.description}</p>

        {/* Amenities section - only displayed if features are available */}
        {development.features && Array.isArray(development.features) && (
          <div className={styles.amenities}>
            <h4 className={styles.sectionTitle}>Amenidades</h4>
            <div className={styles.badgeContainer}>
              {(development.features as string[]).map((amenity) => (
                <Badge key={amenity} variant="secondary">
                  {amenity}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Property models section - core selling information */}
        <div className={styles.models}>
          <h4 className={styles.sectionTitle}>Modelos Disponibles</h4>
          {development.models.map((propertyModel) => (
            <div key={propertyModel.id} className={styles.model}>
              <div className={styles.modelHeader}>
                <h5 className={styles.modelName}>{propertyModel.name}</h5>
                <p className={styles.modelPrice}>
                  Desde {formatMexicanPesos(propertyModel.price)}
                </p>
              </div>
              
              {/* Property specifications - bedroom, bathroom, and size info */}
              <div className={styles.modelDetails}>
                {propertyModel.bedrooms && (
                  <span>
                    <BedDouble size={14} /> {propertyModel.bedrooms} Rec.
                  </span>
                )}
                {propertyModel.bathrooms && (
                  <span>
                    <Bath size={14} /> {propertyModel.bathrooms} Baños
                  </span>
                )}
                {propertyModel.sizeM2 && (
                  <span>
                    <Square size={14} /> {propertyModel.sizeM2} m²
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <Button asChild size="lg" className={styles.ctaButton}>
          <Link to={getDevelopmentUrl(development.name)}>
            Más Información
          </Link>
        </Button>
      </div>
    </article>
  );
};