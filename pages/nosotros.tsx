import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Award, Users, ShieldCheck, HeartHandshake, Lightbulb, Star } from "lucide-react";
import { Button } from "../components/Button";
import styles from "./nosotros.module.css";

const NosotrosPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Nosotros | Constructora Los Patos</title>
        <meta
          name="description"
          content="Conozca a Constructora Los Patos, una empresa con décadas de experiencia comprometida con la calidad, la eficiencia y la satisfacción del cliente en cada proyecto."
        />
        <meta
          name="keywords"
          content="constructora, los patos, empresa construcción, experiencia, calidad"
        />
        <link rel="canonical" href="https://constructoralospatos.com/nosotros" />
      </Helmet>
      <main className={styles.pageContainer}>
        <header className={styles.hero} role="banner">
          <div className={styles.heroOverlay}></div>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Nuestra Historia y Compromiso</h1>
            <p className={styles.heroSubtitle}>
              Más de 35 años construyendo confianza, calidad y futuros.
            </p>
          </div>
        </header>

        <section className={styles.contentSection} aria-labelledby="about-title">
          <div className={styles.contentWrapper}>
            <div className={styles.introText}>
              <h2 id="about-title" className={styles.sectionTitle}>Acerca de Nosotros</h2>
              <p className={styles.mainParagraph}>
                En Constructora Los Patos ofrecemos una gama completa de
                servicios de construcción, respaldada por décadas de
                experiencia. Nuestro compromiso es con la confiabilidad,
                eficiencia, rentabilidad y, sobre todo, la satisfacción del
                cliente en cada etapa del proceso constructivo.
              </p>
              <p className={styles.secondaryParagraph}>
                Con un equipo de más de 500 profesionales, nos dedicamos a la
                excelencia y la responsabilidad social, asegurando que cada
                proyecto no solo cumpla, sino que supere las expectativas,
                entregando siempre a tiempo y dentro del presupuesto.
              </p>
            </div>

            <h3 id="values-title" className={styles.srOnly}>Nuestros Valores</h3>
            <ul className={styles.valuesList} aria-labelledby="values-title">
              <li className={styles.valueCard}>
                <Award className={styles.valueIcon} aria-hidden="true" />
                <h3 className={styles.valueTitle}>Experiencia Comprobada</h3>
                <p className={styles.valueText}>
                  Desde 1984, hemos liderado el sector con proyectos que definen
                  la calidad y la innovación en el desarrollo residencial.
                </p>
              </li>
              <li className={styles.valueCard}>
                <Users className={styles.valueIcon} aria-hidden="true" />
                <h3 className={styles.valueTitle}>Equipo Profesional</h3>
                <p className={styles.valueText}>
                  Nuestro equipo de más de 500 empleados es nuestro mayor
                  activo, aportando talento y dedicación a cada obra.
                </p>
              </li>
              <li className={styles.valueCard}>
                <ShieldCheck className={styles.valueIcon} aria-hidden="true" />
                <h3 className={styles.valueTitle}>Compromiso con la Calidad</h3>
                <p className={styles.valueText}>
                  Garantizamos los más altos estándares de calidad, eficiencia y
                  rentabilidad en todos nuestros desarrollos.
                </p>
              </li>
              <li className={styles.valueCard}>
                <HeartHandshake className={styles.valueIcon} aria-hidden="true" />
                <h3 className={styles.valueTitle}>Responsabilidad Social</h3>
                <p className={styles.valueText}>
                  Construimos comunidades sostenibles, contribuyendo activamente
                  al bienestar social y al desarrollo de nuestro entorno.
                </p>
              </li>
              <li className={styles.valueCard}>
                <Lightbulb className={styles.valueIcon} aria-hidden="true" />
                <h3 className={styles.valueTitle}>Innovación y Tecnología</h3>
                <p className={styles.valueText}>
                  Aplicamos tecnología moderna y métodos innovadores de
                  construcción para entregar proyectos eficientes y de
                  vanguardia.
                </p>
              </li>
              <li className={styles.valueCard}>
                <Star className={styles.valueIcon} aria-hidden="true" />
                <h3 className={styles.valueTitle}>Satisfacción del Cliente</h3>
                <p className={styles.valueText}>
                  Nuestro enfoque en el servicio al cliente y seguimiento
                  post-venta garantiza una experiencia excepcional en cada
                  proyecto.
                </p>
              </li>
            </ul>
          </div>
        </section>

        <section className={styles.ctaSection} aria-labelledby="cta-title">
          <div className={styles.ctaContent}>
            <h2 id="cta-title" className={styles.ctaTitle}>
              ¿Listo para construir tu futuro con nosotros?
            </h2>
            <p className={styles.ctaText}>
              Ponte en contacto para una cotización o explora los proyectos que
              hemos traído a la vida.
            </p>
            <div className={styles.ctaButtons}>
              <Button asChild size="lg">
                <Link to="/contacto">Contáctanos</Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link to="/desarrollos">Ver Desarrollos</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default NosotrosPage;