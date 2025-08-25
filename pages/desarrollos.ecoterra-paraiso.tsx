import React from "react";
import { Helmet } from "react-helmet-async";
import { useDevelopmentByName } from "../helpers/useDevelopmentByName";
import { DevelopmentContactForm } from "../components/DevelopmentContactForm";
import { DevelopmentPageSkeleton } from "../components/DevelopmentPageSkeleton";
import { BonanzaModelShowcase } from "../components/BonanzaModelShowcase";
import { PremiumGallery, type GalleryImage } from "../components/PremiumGallery";
import { HeroSection } from "../components/HeroSection";
import { ContentSection } from "../components/ContentSection";
import { BreadcrumbNav } from "../components/BreadcrumbNav";
import { Button } from "../components/Button";
import { ArrowLeft, School, ShoppingCart, Droplets, Trees, Bus } from "lucide-react";
import { DEVELOPMENT_NAMES } from "../helpers/developmentConstants";
import styles from "./desarrollos.ecoterra-paraiso.module.css";

const EcoterraParaisoPage: React.FC = () => {
  const {
    data: development,
    isFetching,
    error,
  } = useDevelopmentByName(DEVELOPMENT_NAMES.ECOTERRA);

  const communityServices = [
    { icon: School, text: "Escuelas" },
    { icon: Trees, text: "Áreas deportivas" },
    { icon: ShoppingCart, text: "Zona comercial" },
    { icon: Droplets, text: "Pozos de agua" },
    { icon: Bus, text: "Transporte público" },
  ];

  const galleryImages: GalleryImage[] = [
    {
      url: "https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/b2da5df8-aa72-492d-8099-65e067bbf705.gif",
      alt: "Vista aérea de edificios departamentales con detalles arquitectónicos modernos en Ecoterra Paraíso, mostrando la distribución y diseño del desarrollo residencial",
      category: "Exteriores"
    },
    {
      url: "https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/32b1dbbd-c8ee-4120-a67d-30eeda1c710f.gif",
      alt: "Vista panorámica del desarrollo Ecoterra Paraíso con logotipo oficial, destacando la ubicación estratégica y el entorno natural del proyecto",
      category: "Exteriores"
    },
    {
      url: "https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/8a859b7b-544a-40db-80e1-d7e5228ab4e2.gif",
      alt: "Vista aérea de las casas modelo Bonanza con característicos techos rojos en Ecoterra Paraíso, mostrando la distribución urbana y espacios verdes",
      category: "Vistas"
    }
  ];

  const renderContent = () => {
    if (isFetching) {
      return <DevelopmentPageSkeleton />;
    }

    if (error || !development) {
      return (
        <ContentSection>
          <div className={styles.errorState} role="alert">
            <h2>Error al Cargar el Desarrollo</h2>
            <p>
              No pudimos encontrar la información para Ecoterra Paraíso. Por
              favor, intenta de nuevo más tarde.
            </p>
            <Button asChild variant="outline">
              <ArrowLeft size={16} /> Volver a Desarrollos
            </Button>
          </div>
        </ContentSection>
      );
    }

    const images =
      development.galleryImages && development.galleryImages.length > 0
        ? development.galleryImages
        : [{ url: development.imageUrl || "", alt: development.name }];

    return (
      <>
        {/* Hero Section */}
        <HeroSection
          backgroundImageUrl={images[0].url}
          logoUrl="https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/33713fe5-6c63-44d3-8b02-f7fcb38d5dbf.png"
          logoAlt="Logotipo oficial de Ecoterra Paraíso - Desarrollo de casas económicas cerca de la playa en Manzanillo"
          title={development.tagline}
          location={development.location}
          height="secondary"
        />

        {/* Project Description */}
        <ContentSection
          id="ecoterra-descripcion"
          title="Tu Casa Cerca del Mar"
        >
          <p className={styles.sectionText}>{development.description}</p>
        </ContentSection>

        {/* Bonanza Model */}
        <ContentSection
          id="ecoterra-modelo"
          title="Modelo Bonanza"
          subtitle="Un hogar funcional y acogedor, diseñado para tu familia."
          variant="muted"
        >
          <article className={styles.modelContainer} aria-label="Información detallada del modelo Bonanza">
            <BonanzaModelShowcase />
          </article>
        </ContentSection>

        {/* Planned Community */}
        <ContentSection
          id="ecoterra-comunidad"
          title="Una Comunidad Planeada"
          subtitle="Disfruta de servicios que mejoran tu calidad de vida."
        >
          <div className={styles.servicesGrid} role="list" aria-label="Servicios disponibles en la comunidad">
            {communityServices.map((service) => (
              <div key={service.text} className={styles.serviceItem} role="listitem">
                <div className={styles.serviceIconWrapper}>
                  <service.icon size={32} className={styles.serviceIcon} aria-hidden="true" />
                </div>
                <h3 className={styles.serviceTitle}>{service.text}</h3>
              </div>
            ))}
          </div>
        </ContentSection>

        {/* Image Gallery */}
        <ContentSection
          id="ecoterra-galeria"
          title="Galería"
          subtitle="Imagina los momentos que vivirás aquí."
          variant="muted"
        >
          <PremiumGallery 
            images={galleryImages} 
            className={styles.premiumGallery}
            aria-label="Galería de imágenes de Ecoterra Paraíso mostrando vistas aéreas y exteriores del desarrollo"
          />
        </ContentSection>

        {/* Contact and Form */}
        <ContentSection
          id="ecoterra-contacto"
          title="Solicita Más Información"
        >
          <div className={styles.cta}>
            <p className={styles.ctaText}>
              No dejes pasar la oportunidad de tener tu propia casa cerca de la playa. ¡Contáctanos hoy!
            </p>
          </div>
          <div role="form" aria-label="Formulario de contacto para Ecoterra Paraíso">
            <DevelopmentContactForm
              developmentName={development.name}
              source="Página de Ecoterra Paraíso"
            />
          </div>
        </ContentSection>
      </>
    );
  };

  return (
    <>
      <Helmet>
        <title>Ecoterra Paraíso Manzanillo - Casas desde $950,000 a 35min de la Playa | Modelo Bonanza 2024</title>
        <meta
          name="description"
          content="Casas desde $950,000 a solo 35 minutos de la playa en Manzanillo, Colima. Modelo Bonanza 2 recámaras en comunidad planeada con escuelas, áreas deportivas, pozos de agua y transporte público. ¡Tu casa cerca del mar!"
        />
        <meta name="keywords" content="casas baratas manzanillo, viviendas economicas colima, casas 950000 pesos, modelo bonanza 2 recamaras, casas cerca playa manzanillo, vivienda social manzanillo, ecoterra paraiso, comunidad planeada" />
        <link rel="canonical" href="https://constructoralosPatos.com/desarrollos/ecoterra-paraiso" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Ecoterra Paraíso Manzanillo - Casas desde $950,000 a 35min de la Playa" />
        <meta property="og:description" content="Casas desde $950,000 a 35 minutos de la playa en Manzanillo. Modelo Bonanza 2 recámaras en comunidad planeada con escuelas, áreas deportivas y todos los servicios." />
        <meta property="og:image" content="https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/33713fe5-6c63-44d3-8b02-f7fcb38d5dbf.png" />
        <meta property="og:url" content="https://constructoralosPatos.com/desarrollos/ecoterra-paraiso" />
        <meta property="og:type" content="product" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Ecoterra Paraíso Manzanillo - Casas desde $950,000 a 35min de la Playa" />
        <meta name="twitter:description" content="Casas desde $950,000 a 35 minutos de la playa. Modelo Bonanza 2 recámaras en comunidad planeada con todos los servicios en Manzanillo." />
        <meta name="twitter:image" content="https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/33713fe5-6c63-44d3-8b02-f7fcb38d5dbf.png" />
        
        {/* Schema.org Product */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Ecoterra Paraíso",
            "description": "Casas económicas a 35 minutos de la playa en una comunidad planeada con todos los servicios",
            "brand": {
              "@type": "Brand",
              "name": "Constructora Los Patos"
            },
            "category": "Casas",
            "image": "https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/33713fe5-6c63-44d3-8b02-f7fcb38d5dbf.png",
            "url": "https://constructoralosPatos.com/desarrollos/ecoterra-paraiso",
            "offers": {
              "@type": "AggregateOffer",
              "availability": "https://schema.org/InStock",
              "priceCurrency": "MXN",
              "lowPrice": "950000"
            },
            "additionalProperty": [
              {
                "@type": "PropertyValue",
                "name": "Ubicación",
                "value": "Manzanillo, Colima"
              },
              {
                "@type": "PropertyValue",
                "name": "Distancia a playa",
                "value": "35 minutos"
              },
              {
                "@type": "PropertyValue",
                "name": "Tipo de comunidad",
                "value": "Comunidad planeada con servicios completos"
              },
              {
                "@type": "PropertyValue",
                "name": "Modelo disponible",
                "value": "Bonanza - 2 recámaras"
              },
              {
                "@type": "PropertyValue",
                "name": "Precio desde",
                "value": "$950,000 MXN"
              },
              {
                "@type": "PropertyValue",
                "name": "Servicios comunidad",
                "value": "Escuelas, áreas deportivas, zona comercial, pozos de agua, transporte público"
              }
            ]
          })}
        </script>
      </Helmet>
      <div className={styles.pageContainer}>
        <BreadcrumbNav
          links={[{ to: "/desarrollos", label: "Desarrollos" }]}
          currentPage="Ecoterra Paraíso"
        />
        <main role="main">{renderContent()}</main>
      </div>
    </>
  );
};

export default EcoterraParaisoPage;