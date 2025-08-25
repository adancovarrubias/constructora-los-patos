import React from "react";
import { Helmet } from "react-helmet-async";
import { useDevelopments } from "../helpers/useDevelopments";
import { HeroSection } from "../components/HeroSection";
import { ContentSection } from "../components/ContentSection";
import { BreadcrumbNav } from "../components/BreadcrumbNav";
import { DevelopmentCard } from "../components/DevelopmentCard";
import { DevelopmentCardSkeleton } from "../components/DevelopmentCardSkeleton";
import { StateMessage } from "../components/StateMessage";
import styles from "./desarrollos.module.css";

const DevelopmentsPage: React.FC = () => {
  const { data: developments, isFetching, error } = useDevelopments();

  const renderContent = () => {
    if (isFetching) {
      return (
        <div className={styles.grid} aria-label="Cargando desarrollos">
          <DevelopmentCardSkeleton />
          <DevelopmentCardSkeleton />
          <DevelopmentCardSkeleton />
        </div>
      );
    }

    if (error) {
      return (
        <StateMessage
          type="error"
          title="Error al cargar los desarrollos"
          message="Ocurrió un problema al obtener la información. Por favor, inténtalo de nuevo más tarde."
        />
      );
    }

    if (!developments || developments.length === 0) {
      return (
        <StateMessage
          type="empty"
          title="No hay desarrollos disponibles"
          message="Actualmente no tenemos desarrollos para mostrar. Vuelve a visitar esta página pronto."
        />
      );
    }

    return (
      <section className={styles.grid} aria-label="Desarrollos inmobiliarios disponibles">
        {developments.map((dev) => (
          <article key={dev.id} className={styles.grid__item}>
            <DevelopmentCard development={dev} />
          </article>
        ))}
      </section>
    );
  };

  return (
    <>
      <Helmet>
        <title>Desarrollos Inmobiliarios - Casas y Departamentos en Guadalajara y Manzanillo | Los Patos 2024</title>
        <meta
          name="description"
          content="Descubre nuestros 3 desarrollos inmobiliarios principales: Torres Colón en Guadalajara, Las Ceibas y Ecoterra Paraíso en Manzanillo. Casas, departamentos y condominios de calidad con 40 años de experiencia."
        />
        <meta name="keywords" content="desarrollos inmobiliarios, torres colon guadalajara, las ceibas manzanillo, ecoterra paraiso, constructora los patos" />
        <link rel="canonical" href="https://constructoralospatos.com/desarrollos" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Desarrollos Inmobiliarios - Casas y Departamentos en Guadalajara y Manzanillo | Los Patos 2024" />
        <meta property="og:description" content="Descubre nuestros 3 desarrollos inmobiliarios principales: Torres Colón en Guadalajara, Las Ceibas y Ecoterra Paraíso en Manzanillo. Casas, departamentos y condominios de calidad." />
        <meta property="og:image" content="https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/9f39eb16-6ac8-44ef-809f-34a6e92a2b4f.gif" />
        <meta property="og:url" content="https://constructoralospatos.com/desarrollos" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Desarrollos Inmobiliarios - Casas y Departamentos Los Patos 2024" />
        <meta name="twitter:description" content="Descubre nuestros 3 desarrollos principales: Torres Colón en Guadalajara, Las Ceibas y Ecoterra Paraíso en Manzanillo." />
        <meta name="twitter:image" content="https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/9f39eb16-6ac8-44ef-809f-34a6e92a2b4f.gif" />
        
        {/* Schema.org RealEstateAgent */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RealEstateAgent",
            "name": "Constructora Los Patos - Desarrollos Inmobiliarios",
            "description": "Desarrollos inmobiliarios residenciales de calidad en Guadalajara y Manzanillo. Torres Colón, Las Ceibas y Ecoterra Paraíso.",
            "url": "https://constructoralospatos.com/desarrollos",
            "areaServed": [
              {
                "@type": "City",
                "name": "Guadalajara",
                "containedInPlace": {
                  "@type": "State",
                  "name": "Jalisco"
                }
              },
              {
                "@type": "City", 
                "name": "Manzanillo",
                "containedInPlace": {
                  "@type": "State",
                  "name": "Colima"
                }
              }
            ],
            "serviceType": ["Venta de departamentos", "Venta de condominios", "Venta de casas", "Desarrollos residenciales"],
            "parentOrganization": {
              "@type": "Organization",
              "name": "Constructora Los Patos",
              "foundingDate": "1984-06-04"
            },
            "makesOffer": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Product",
                  "name": "Torres Colón",
                  "description": "Desarrollo residencial en Guadalajara"
                }
              },
              {
                "@type": "Offer", 
                "itemOffered": {
                  "@type": "Product",
                  "name": "Las Ceibas",
                  "description": "Desarrollo residencial en Manzanillo"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Product", 
                  "name": "Ecoterra Paraíso",
                  "description": "Desarrollo residencial en Manzanillo"
                }
              }
            ]
          })}
        </script>
      </Helmet>

      {/* Breadcrumb Navigation */}
      <BreadcrumbNav
        links={[{ to: "/", label: "Inicio" }]}
        currentPage="Desarrollos"
      />

      {/* Hero Section */}
      <HeroSection
        backgroundImageUrl="https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/9f39eb16-6ac8-44ef-809f-34a6e92a2b4f.gif"
        title="Nuestros Desarrollos"
        height="secondary"
      />

      <main>
        {/* Main Content Section */}
        <ContentSection
          id="desarrollos-content"
          subtitle="Proyectos que reflejan nuestro compromiso con la calidad, el diseño y el bienestar de las familias."
        >
          {renderContent()}
        </ContentSection>

        {/* Footer Section */}
        <ContentSection
          id="desarrollos-footer"
          className={styles.footer}
        >
          <p className={styles.footer__slogan}>
            "Construimos sueños para hacer historias."
          </p>
        </ContentSection>
      </main>
    </>
  );
};

export default DevelopmentsPage;