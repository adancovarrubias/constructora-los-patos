import React from "react";
import { BedDouble, Bath, Square, Car, Shirt, Utensils, Sofa, Home } from "lucide-react";
import styles from "./BonanzaModelShowcase.module.css";

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const BonanzaModelShowcase: React.FC = () => {
  const features = [
    { icon: BedDouble, text: "2 recámaras" },
    { icon: Bath, text: "1 baño completo" },
    { icon: Sofa, text: "Sala - comedor" },
    { icon: Utensils, text: "Cocina" },
    { icon: Shirt, text: "Patio de servicio" },
    { icon: Car, text: "Estacionamiento" },
  ];

  return (
    <div className={styles.showcase}>
      <div className={styles.modelInfo}>
        <div className={styles.header}>
          <h3 className={styles.name}>Bonanza</h3>
          <div className={styles.priceArea}>
            <p className={styles.price}>Desde {formatCurrency(950000)}</p>
            <div className={styles.area}>
              <Square size={18} /> 65 m²
            </div>
          </div>
        </div>
        
        <div className={styles.locationBadge}>
          <Home size={16} />
          <span>Casa Residencial en Ecoterra Paraíso</span>
        </div>

        <p className={styles.description}>
          Vive en armonía con la naturaleza a solo 35 minutos de la playa. El modelo Bonanza ofrece un diseño funcional y acogedor, perfecto para disfrutar de la tranquilidad y el paraíso.
        </p>

        <div className={styles.features}>
          {features.map((feature, index) => (
            <div key={index} className={styles.feature}>
              <feature.icon size={20} />
              <span>{feature.text}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className={styles.floorPlan}>
        <div className={styles.imageContainer}>
          <img
            src="https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/469ca930-075c-45ec-bb42-940929b85612.gif"
            alt="Plano del modelo Bonanza - Ecoterra Paraíso"
            className={styles.floorPlanImage}
          />
          <img
            src="https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/a9ba31c7-353f-4484-85f5-40a4aadaddc3.gif"
            alt="Interior del modelo Bonanza - Ecoterra Paraíso"
            className={styles.interiorImage}
          />
        </div>
        <p className={styles.floorPlanCaption}>Plano arquitectónico del modelo Bonanza</p>
      </div>
    </div>
  );
};