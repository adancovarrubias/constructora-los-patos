import React from "react";
import { BedDouble, Bath, Square, Car, Shirt, Utensils, Sofa, Building } from "lucide-react";
import styles from "./MilanModelShowcase.module.css";

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const MilanModelShowcase: React.FC = () => {
  const features = [
    { icon: BedDouble, text: "2 recámaras" },
    { icon: Bath, text: "2 baños completos" },
    { icon: Utensils, text: "Cocina integrada" },
    { icon: Sofa, text: "Sala - comedor amplia" },
    { icon: Shirt, text: "Área de servicio" },
    { icon: Car, text: "Estacionamiento" },
  ];

  return (
    <div className={styles.showcase}>
      <div className={styles.modelInfo}>
        <div className={styles.header}>
          <h3 className={styles.name}>Milán</h3>
          <div className={styles.priceArea}>
            <p className={styles.price}>{formatCurrency(2982492)}</p>
            <div className={styles.area}>
              <Square size={18} /> 73.06 m²
            </div>
          </div>
        </div>
        
        <div className={styles.locationBadge}>
          <Building size={16} />
          <span>Departamento Urbano en Torres Colón</span>
        </div>

        <p className={styles.description}>
          El modelo Milán representa la máxima expresión de lujo y espacio. Con una distribución generosa y acabados de primera, es ideal para quienes buscan un estilo de vida superior sin sacrificar la comodidad urbana.
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
            src="https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/958918b3-d01c-4fa8-a16c-4da83f476bf3.gif"
            alt="Plano del modelo Milán - Torres Colón"
            className={styles.floorPlanImage}
          />
          <img
            src="https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/55b8b001-57ac-460b-af16-bc8db26165c0.gif"
            alt="Interior del modelo Milán - Torres Colón"
            className={styles.interiorImage}
          />
        </div>
        <p className={styles.floorPlanCaption}>Plano arquitectónico del modelo Milán</p>
      </div>
    </div>
  );
};