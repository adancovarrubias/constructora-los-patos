import React from "react";
import { BedDouble, Bath, Square, Car, Shirt, Utensils, Sofa, Building } from "lucide-react";
import styles from "./AndaluciaModelShowcase.module.css";

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const AndaluciaModelShowcase: React.FC = () => {
  const features = [
    { icon: BedDouble, text: "2 recámaras" },
    { icon: Bath, text: "1 baño completo" },
    { icon: Utensils, text: "Cocina integrada" },
    { icon: Sofa, text: "Sala - comedor" },
    { icon: Shirt, text: "Área de servicio" },
    { icon: Car, text: "Estacionamiento" },
  ];

  return (
    <div className={styles.showcase}>
      <div className={styles.modelInfo}>
        <div className={styles.header}>
          <h3 className={styles.name}>Andalucía</h3>
          <div className={styles.priceArea}>
            <p className={styles.price}>{formatCurrency(2400000)}</p>
            <div className={styles.area}>
              <Square size={18} /> 58.64 m²
            </div>
          </div>
        </div>
        
        <div className={styles.locationBadge}>
          <Building size={16} />
          <span>Departamento Urbano en Torres Colón</span>
        </div>

        <p className={styles.description}>
          Un espacio diseñado para la vida moderna. El modelo Andalucía ofrece una distribución inteligente que maximiza el confort y la funcionalidad, ideal para familias jóvenes y profesionales.
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
            src="https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/55e8795e-849a-4f6a-b753-10f01d54cdd5.gif"
            alt="Plano del modelo Andalucía - Torres Colón"
            className={styles.floorPlanImage}
          />
          <img
            src="https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/21db2f8d-3e2a-4ba6-9c5e-7b7d719be17e.gif"
            alt="Interior del modelo Andalucía - Torres Colón"
            className={styles.interiorImage}
          />
        </div>
        <p className={styles.floorPlanCaption}>Plano arquitectónico del modelo Andalucía</p>
      </div>
    </div>
  );
};