import React from "react";
import { Selectable } from "kysely";
import { DevelopmentModels } from "../helpers/schema";
import { BedDouble, Bath, Square, Car, Shirt, Utensils, Sofa, Sparkles } from "lucide-react";
import styles from "./KiosModelShowcase.module.css";

interface KiosModelShowcaseProps {
  model: Selectable<DevelopmentModels>;
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

export const KiosModelShowcase: React.FC<KiosModelShowcaseProps> = ({ model }) => {
  const kiosFeatures = [
    { icon: BedDouble, text: "2 recámaras con closet" },
    { icon: Bath, text: "2 baños completos" },
    { icon: Utensils, text: "Cocina integral con barra" },
    { icon: Sofa, text: "Sala - comedor" },
    { icon: Shirt, text: "Cuarto de lavado" },
    { icon: Car, text: "1 Estacionamiento" },
  ];

  return (
    <div className={styles.showcase}>
      <div className={styles.modelInfo}>
        <div className={styles.header}>
          <h3 className={styles.name}>{model.name}</h3>
          <div className={styles.priceArea}>
            <p className={styles.price}>Desde {formatCurrency(model.price)}</p>
            <div className={styles.area}>
              <Square size={18} /> 64.68 m²
            </div>
          </div>
        </div>
        
        <div className={styles.sunRoofBadge}>
          <Sparkles size={16} />
          <span>Con opción a SUN ROOF</span>
        </div>

        <div className={styles.upgradeHighlight}>
          <Bath size={16} />
          <span>¡Upgrade! 2 baños completos</span>
        </div>

        <div className={styles.features}>
          {kiosFeatures.map((feature, index) => (
            <div key={index} className={styles.feature}>
              <feature.icon size={18} />
              <span>{feature.text}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className={styles.floorPlan}>
        <img
          src="https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/4cb0fe2c-f436-483f-8a05-9500b0670c82.gif"
          alt="Plano del modelo Kios - Las Ceibas Manzanillo"
          className={styles.floorPlanImage}
        />
        <p className={styles.floorPlanCaption}>Plano arquitectónico del modelo Kios</p>
      </div>
    </div>
  );
};