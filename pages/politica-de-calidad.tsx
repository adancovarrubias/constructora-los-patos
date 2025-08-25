import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import {
  Target,
  Compass,
  ShieldCheck,
  Lightbulb,
  Users,
  TrendingUp,
  Recycle,
  Zap,
} from "lucide-react";
import { Button } from "../components/Button";
import styles from "./politica-de-calidad.module.css";

const PoliticaDeCalidadPage: React.FC = () => {
  const [imageError, setImageError] = useState(false);
  
  const handleImageError = () => {
    console.log("Error loading lifestyle image, showing fallback");
    setImageError(true);
  };
  const qualityPrinciples = [
    {
      icon: Target,
      title: "Liderazgo y Compromiso",
      description:
        "Fomentamos un liderazgo que inspira y se compromete con la calidad en todos los niveles de la organización.",
    },
    {
      icon: Compass,
      title: "Dirección Estratégica",
      description:
        "Nuestras decisiones se basan en una dirección estratégica clara, alineada con nuestra misión y visión a largo plazo.",
    },
    {
      icon: ShieldCheck,
      title: "Análisis de Riesgos",
      description:
        "Identificamos y gestionamos proactivamente los riesgos para garantizar la estabilidad y el éxito de cada proyecto.",
    },
    {
      icon: Lightbulb,
      title: "Innovación Constante",
      description:
        "Buscamos y aplicamos continuamente nuevas tecnologías y métodos para mejorar nuestros procesos y resultados.",
    },
    {
      icon: Users,
      title: "Capacidad Profesional",
      description:
        "Invertimos en el desarrollo de nuestro talento humano, asegurando un equipo altamente capacitado y motivado.",
    },
    {
      icon: Zap,
      title: "Adaptación al Cambio",
      description:
        "Mantenemos la flexibilidad para adaptarnos a cambios abruptos del entorno, convirtiendo desafíos en oportunidades.",
    },
    {
      icon: Recycle,
      title: "Optimización de Recursos",
      description:
        "Nos comprometemos a utilizar los recursos de manera eficiente y sostenible, maximizando el valor para nuestros clientes.",
    },
    {
      icon: TrendingUp,
      title: "Mejora Continua",
      description:
        "La mejora continua es el pilar de nuestra operación, buscando siempre superar los estándares y las expectativas.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Política de Calidad | Constructora Los Patos</title>
        <meta
          name="description"
          content="Nuestra política de calidad se basa en el liderazgo, la innovación y la mejora continua para garantizar la satisfacción total de nuestros clientes."
        />
      </Helmet>
      <div className={styles.pageContainer}>
        <section className={styles.hero}>
          <div className={styles.heroOverlay}></div>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Política de Calidad</h1>
            <p className={styles.heroSubtitle}>
              Nuestro compromiso con la excelencia en cada detalle.
            </p>
          </div>
        </section>

        <section className={styles.contentSection}>
          <div className={styles.contentWrapper}>
            <div className={styles.introText}>
              <h2 className={styles.sectionTitle}>
                Nuestro Fundamento para la Excelencia
              </h2>
              <p className={styles.mainParagraph}>
                En Constructora Los Patos, nuestra Política de Calidad es la
                brújula que guía cada una de nuestras acciones. A través de ella,
                aseguramos el cumplimiento de nuestros objetivos, misión, visión
                y valores, consolidando la confianza de nuestros clientes y
                colaboradores.
              </p>
            </div>

            <div className={styles.principlesGrid}>
              {qualityPrinciples.map((principle, index) => (
                <div key={index} className={styles.principleCard}>
                  <principle.icon className={styles.principleIcon} />
                  <h3 className={styles.principleTitle}>{principle.title}</h3>
                  <p className={styles.principleText}>
                    {principle.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.lifestyleSection}>
          <div className={styles.lifestyleContent}>
            <div className={styles.lifestyleText}>
              <h2 className={styles.sectionTitle}>
                Construyendo Espacios para la Vida
              </h2>
              <p className={styles.lifestyleParagraph}>
                Nuestra calidad no solo se refleja en la solidez de nuestras
                construcciones, sino en la felicidad de las familias que las
                habitan. Diseñamos hogares que se convierten en el escenario de
                historias, recuerdos y sueños cumplidos.
              </p>
              <Button asChild size="lg" className={styles.lifestyleButton}>
                <Link to="/desarrollos">Conoce nuestros desarrollos</Link>
              </Button>
            </div>
            <div className={styles.lifestyleImageContainer}>
              {imageError ? (
                <div className={styles.imagePlaceholder}>
                  <Users size={64} className={styles.placeholderIcon} />
                  <p className={styles.placeholderText}>
                    Profesionales comprometidos con la calidad y el bienestar de las familias
                  </p>
                </div>
              ) : (
                <img
                  src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Familia feliz disfrutando de su nuevo hogar construido por Constructora Los Patos, demostrando nuestro compromiso con la calidad y el bienestar familiar"
                  className={styles.lifestyleImage}
                  loading="eager"
                  onError={handleImageError}
                />
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default PoliticaDeCalidadPage;