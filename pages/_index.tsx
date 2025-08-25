import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { HeroSection } from "../components/HeroSection";
import { ContentSection } from "../components/ContentSection";
import { Building, ShieldCheck, Users } from "lucide-react";
import styles from "./_index.module.css";

const HomePage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Constructora Los Patos - 40 Años Construyendo Hogares en Guadalajara y Manzanillo | Desde 1984</title>
        <meta
          name="description"
          content="Constructora Los Patos, 40 años de experiencia construyendo hogares de calidad en Guadalajara y Manzanillo desde 1984. Especialistas en desarrollos residenciales: casas, departamentos y condominios. Descubre Torres Colón, Las Ceibas y Ecoterra Paraíso."
        />
        <meta name="keywords" content="constructora guadalajara, constructora los patos, desarrollos residenciales guadalajara, casas departamentos manzanillo, constructora desde 1984, torres colon, las ceibas, ecoterra paraiso, condominios guadalajara" />
        <link rel="canonical" href="https://constructoralosPatos.com/" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Constructora Los Patos - 40 Años Construyendo Hogares en Guadalajara y Manzanillo" />
        <meta property="og:description" content="Constructora Los Patos, 40 años de experiencia construyendo hogares de calidad en Guadalajara y Manzanillo desde 1984. Especialistas en desarrollos residenciales: casas, departamentos y condominios." />
        <meta property="og:image" content="https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/fd229655-4c4e-408d-9ea3-ec40c2d2bef7.gif" />
        <meta property="og:url" content="https://constructoralosPatos.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Constructora Los Patos" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Constructora Los Patos - 40 Años Construyendo Hogares en Guadalajara y Manzanillo" />
        <meta name="twitter:description" content="Constructora Los Patos, 40 años de experiencia construyendo hogares de calidad en Guadalajara y Manzanillo desde 1984." />
        <meta name="twitter:image" content="https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/fd229655-4c4e-408d-9ea3-ec40c2d2bef7.gif" />
        
        {/* Schema.org LocalBusiness */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": "https://constructoralosPatos.com/#organization",
            "name": "Constructora Los Patos",
            "description": "Constructora especializada en desarrollos residenciales de calidad en Guadalajara y Manzanillo, fundada en 1984 con 40 años de experiencia.",
            "foundingDate": "1984-06-04",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Guadalajara",
              "addressRegion": "Jalisco",
              "addressCountry": "MX"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "customer service",
              "areaServed": ["Guadalajara", "Manzanillo"]
            },
            "areaServed": ["Guadalajara", "Manzanillo", "Jalisco", "Colima"],
            "serviceType": ["Construcción residencial", "Desarrollos inmobiliarios", "Departamentos", "Condominios", "Casas"],
            "url": "https://constructoralosPatos.com",
            "logo": "https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/fd229655-4c4e-408d-9ea3-ec40c2d2bef7.gif",
            "sameAs": [],
            "yearEstablished": "1984",
            "slogan": "Construimos hogares, creamos historias desde 1984"
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <HeroSection
        backgroundImageUrl="https://images.unsplash.com/photo-1582407947304-fd86f028f716"
        logoUrl="https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/fd229655-4c4e-408d-9ea3-ec40c2d2bef7.gif"
        logoAlt="Logotipo animado de Constructora Los Patos - empresa constructora fundada en 1984 especializada en desarrollos residenciales de calidad en Guadalajara y Manzanillo"
        title="Construimos hogares, creamos historias desde 1984."
        height="primary"
        className={styles.homeHero}
      />

      <main>
        {/* Company History and Values Section */}
        <ContentSection
          id="home-about"
          title="Nuestra Trayectoria"
          subtitle="Con casi cuatro décadas de experiencia, en Constructora Los Patos ofrecemos una gama completa de servicios de construcción. Nuestro compromiso es con la confiabilidad, eficiencia, y la satisfacción del cliente en cada etapa del proyecto, garantizando siempre la mejor relación costo-beneficio."
          variant="muted"
        >
          <div className={styles.homeValuesGrid}>
            <article className={styles.homeValueCard}>
              <Building className={styles.homeValueIcon} aria-hidden="true" />
              <h3 className={styles.homeValueTitle}>Experiencia</h3>
              <p className={styles.homeValueText}>
                Décadas de experiencia en la construcción de desarrollos
                residenciales de alta calidad.
              </p>
            </article>
            <article className={styles.homeValueCard}>
              <ShieldCheck className={styles.homeValueIcon} aria-hidden="true" />
              <h3 className={styles.homeValueTitle}>Calidad</h3>
              <p className={styles.homeValueText}>
                Compromiso inquebrantable con los más altos estándares de
                calidad y durabilidad.
              </p>
            </article>
            <article className={styles.homeValueCard}>
              <Users className={styles.homeValueIcon} aria-hidden="true" />
              <h3 className={styles.homeValueTitle}>Confianza</h3>
              <p className={styles.homeValueText}>
                La satisfacción de nuestros clientes es nuestra máxima
                prioridad en cada proyecto.
              </p>
            </article>
          </div>

          <div className={styles.homeHeroCtaContainer}>
            <Button asChild size="lg" className={styles.homeHeroCta}>
              <Link to="/desarrollos">Ver Desarrollos</Link>
            </Button>
          </div>
        </ContentSection>

        {/* Call to Action Section */}
        <ContentSection
          id="home-cta"
          title="Descubre tu próximo hogar con nosotros."
          subtitle="Explora nuestros desarrollos y encuentra el espacio perfecto para tu futuro."
          className={styles.homeCtaSection}
        >
          <div className={styles.homeCtaContainer}>
            <Button asChild variant="secondary" size="lg">
              <Link to="/desarrollos">Explorar Proyectos</Link>
            </Button>
          </div>
        </ContentSection>
      </main>
    </>
  );
};

export default HomePage;