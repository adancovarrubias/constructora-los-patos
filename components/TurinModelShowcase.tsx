import React from "react";
import { BedDouble, Bath, Square, Car, Shirt, Utensils, Sofa, Building } from "lucide-react";
import styles from "./TurinModelShowcase.module.css";

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const TurinModelShowcase: React.FC = () => {
  const features = [
    { icon: BedDouble, text: "2 recámaras" },
    { icon: Bath, text: "2 baños completos" },
    { icon: Utensils, text: "Cocina integrada" },
    { icon: Sofa, text: "Sala - comedor" },
    { icon: Shirt, text: "Área de servicio" },
    { icon: Car, text: "Estacionamiento" },
  ];

  return (
    <div className={styles.showcase}>
      <div className={styles.modelInfo}>
        <div className={styles.header}>
          <h3 className={styles.name}>Turín</h3>
          <div className={styles.priceArea}>
            <p className={styles.price}>{formatCurrency(2824430)}</p>
            <div className={styles.area}>
              <Square size={18} /> 69.16 m²
            </div>
          </div>
        </div>
        
        <div className={styles.locationBadge}>
          <Building size={16} />
          <span>Departamento Urbano en Torres Colón</span>
        </div>

        <p className={styles.description}>
          Amplitud y elegancia se unen en el modelo Turín. Con dos baños completos y espacios generosos, es la opción perfecta para quienes buscan un extra de comodidad y estilo en la ciudad.
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
            src="https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/297f8fbf-1508-4bf2-906f-e4a6387f556c.gif"
            alt="Plano del modelo Turín - Torres Colón"
            className={styles.floorPlanImage}
          />
          <img
            src="https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/ea74ba11-1c41-4f0e-9ec1-07d7adf21f83.gif"
            alt="Interior del modelo Turín - Torres Colón"
            className={styles.interiorImage}
          />
        </div>
        <p className={styles.floorPlanCaption}>Plano arquitectónico del modelo Turín</p>
      </div>
    </div>
  );
};