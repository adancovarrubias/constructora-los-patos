import React from "react";
import { Selectable } from "kysely";
import { DevelopmentModels } from "../helpers/schema";
import { BedDouble, Bath, Square } from "lucide-react";
import styles from "./DevelopmentModelCard.module.css";

interface DevelopmentModelCardProps {
  model: Selectable<DevelopmentModels>;
  className?: string;
}

const formatCurrency = (value: number | string | null | undefined) => {
  if (value === null || value === undefined) return "N/A";
  const num = typeof value === "string" ? parseFloat(value) : value;
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
};

export const DevelopmentModelCard: React.FC<DevelopmentModelCardProps> = ({
  model,
  className,
}) => {
  return (
    <div className={`${styles.card} ${className || ""}`}>
      <div className={styles.header}>
        <h3 className={styles.name}>{model.name}</h3>
        <p className={styles.price}>Desde {formatCurrency(model.price)}</p>
      </div>
      {model.description && (
        <p className={styles.description}>{model.description}</p>
      )}
      <div className={styles.details}>
        {model.bedrooms && (
          <span className={styles.detailItem}>
            <BedDouble size={16} /> {model.bedrooms} Recámaras
          </span>
        )}
        {model.bathrooms && (
          <span className={styles.detailItem}>
            <Bath size={16} /> {model.bathrooms} Baños
          </span>
        )}
        {model.sizeM2 && (
          <span className={styles.detailItem}>
            <Square size={16} /> {model.sizeM2} m²
          </span>
        )}
      </div>
    </div>
  );
};