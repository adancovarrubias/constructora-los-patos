import React from "react";
import { Helmet } from "react-helmet-async";
import { useDevelopmentByName } from "../helpers/useDevelopmentByName";
import { DevelopmentContactForm } from "../components/DevelopmentContactForm";
import { DevelopmentPageSkeleton } from "../components/DevelopmentPageSkeleton";
import { DevelopmentModelCard } from "../components/DevelopmentModelCard";
import { PremiumGallery, type GalleryImage } from "../components/PremiumGallery";
import { AndaluciaModelShowcase } from "../components/AndaluciaModelShowcase";
import { TurinModelShowcase } from "../components/TurinModelShowcase";
import { MilanModelShowcase } from "../components/MilanModelShowcase";
import { HeroSection } from "../components/HeroSection";
import { ContentSection } from "../components/ContentSection";
import { BreadcrumbNav } from "../components/BreadcrumbNav";
import { Button } from "../components/Button";
import { ArrowLeft, CheckCircle, Dumbbell, Waves, UtensilsCrossed, Play, Dog, Building2 } from "lucide-react";
import { DEVELOPMENT_NAMES, TORRES_COLON_MODELS, modelNameIncludes } from "../helpers/developmentConstants";
import styles from "./desarrollos.torres-colon.module.css";

const TorresColonPage: React.FC = () => {
  const {
    data: development,
    isFetching,
    error,
  } = useDevelopmentByName(DEVELOPMENT_NAMES.TORRES_COLON);

  const amenities = [
    { icon: Waves, text: "Alberca" },
    { icon: UtensilsCrossed, text: "Área de asadores" },
    { icon: Dumbbell, text: "Gimnasio" },
    { icon: Play, text: "Juegos infantiles" },
    { icon: Dog, text: "Parque para mascotas" },
    { icon: Building2, text: "Espacios comerciales" },
  ];

  const galleryImages: GalleryImage[] = [
    {
      url: "https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/f65604d1-4f44-4185-84bc-c6ef76659a9a.gif",
      alt: "Juegos infantiles - Torres Colón",
      category: "Amenidades"
    },
    {
      url: "https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/4402c4d8-5c5a-4c57-a6a6-80df86b38e3a.gif",
      alt: "Área de asadores en azotea - Torres Colón",
      category: "Amenidades"
    },
    {
      url: "https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/83481ce6-c050-4930-ac0b-952b2218cf8e.gif",
      alt: "Gimnasio moderno - Torres Colón",
      category: "Amenidades"
    },
    {
      url: "https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/40576222-9d49-4445-aab1-3c1d4de47808.gif",
      alt: "Modelo del desarrollo - Torres Colón",
      category: "Vista General"
    },
    {
      url: "https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/7976e53e-6b99-4aad-8b4e-7c0a1eef8a8f.png",
      alt: "Mapa de ubicación - Torres Colón",
      category: "Ubicación"
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
              No pudimos encontrar la información para Torres Colón. Por
              favor, intenta de nuevo más tarde.
            </p>
            <Button asChild variant="outline">
              <ArrowLeft size={16} aria-hidden="true" /> Volver a Desarrollos
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
          logoUrl="https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/97dc4246-e6ac-4117-93e0-11434537b532.png"
          logoAlt="Logotipo de Torres Colón"
          title="Departamentos Modernos en el Corazón de Guadalajara"
          location={development.location}
          height="secondary"
        />

        {/* Project Description */}
        <ContentSection
          id="torres-colon-descripcion"
          title="Vida Urbana de Calidad"
          subtitle="Ubicación estratégica en Guadalajara con espacios funcionales y arquitectura contemporánea."
        >
          <p className={styles.sectionText}>{development.description}</p>
        </ContentSection>

        {/* Apartment Models */}
        <ContentSection
          id="torres-colon-modelos"
          title="Modelos Disponibles"
          subtitle="Opciones versátiles que se adaptan a diferentes necesidades y presupuestos."
          variant="muted"
        >
          {/* Featured Model - Andalucía */}
          {development.models.find(model => modelNameIncludes(model.name, TORRES_COLON_MODELS.ANDALUCIA)) && (
            <article className={styles.featuredModel}>
              <h3 className={styles.featuredModelTitle}>Modelo Destacado</h3>
              <AndaluciaModelShowcase />
            </article>
          )}
          
          {/* Mid-Range Model - Turín */}
          {development.models.find(model => modelNameIncludes(model.name, TORRES_COLON_MODELS.TURIN)) && (
            <article className={styles.featuredModel}>
              <h3 className={styles.featuredModelTitle}>Opción de Rango Medio</h3>
              <TurinModelShowcase />
            </article>
          )}
          
          {/* Premium Model - Milán */}
          {development.models.find(model => modelNameIncludes(model.name, TORRES_COLON_MODELS.MILAN)) && (
            <article className={styles.featuredModel}>
              <h3 className={styles.featuredModelTitle}>Modelo Premium</h3>
              <MilanModelShowcase />
            </article>
          )}
          
          {/* Additional Models Grid */}
          <div className={styles.modelsGrid}>
            {development.models
              .filter(model => 
                !modelNameIncludes(model.name, TORRES_COLON_MODELS.ANDALUCIA) && 
                !modelNameIncludes(model.name, TORRES_COLON_MODELS.TURIN) &&
                !modelNameIncludes(model.name, TORRES_COLON_MODELS.MILAN)
              )
              .map((model) => (
                <article key={model.id}>
                  <DevelopmentModelCard model={model} />
                </article>
              ))}
          </div>
        </ContentSection>

        {/* Image Gallery */}
        <ContentSection
          id="torres-colon-galeria"
          title="Galería"
          subtitle="Descubre los espacios y amenidades que hacen de Torres Colón tu hogar ideal."
        >
          <PremiumGallery images={galleryImages} className={styles.premiumGallery} />
        </ContentSection>

        {/* Amenities */}
        <ContentSection
          id="torres-colon-amenidades"
          title="Amenidades de Primer Nivel"
          subtitle="Disfruta de un estilo de vida exclusivo sin salir de casa."
          variant="muted"
        >
          <div className={styles.amenitiesGrid}>
            {amenities.map((amenity) => (
              <article key={amenity.text} className={styles.amenityItem}>
                <div className={styles.amenityIconWrapper}>
                  <amenity.icon size={32} className={styles.amenityIcon} aria-hidden="true" />
                </div>
                <h3 className={styles.amenityTitle}>{amenity.text}</h3>
              </article>
            ))}
          </div>
        </ContentSection>

        {/* Contact and CTA */}
        <ContentSection
          id="torres-colon-contacto"
          title="Reserva tu Cita"
          subtitle="Conoce de primera mano las características y beneficios de vivir en Torres Colón."
        >
          <DevelopmentContactForm
            developmentName={development.name}
            source="Página de Torres Colón"
          />
        </ContentSection>
      </>
    );
  };

  return (
    <>
      <Helmet>
        <title>Torres Colón Guadalajara - Departamentos Modernos desde $2.4M | Andalucía, Turín, Milán 2024</title>
        <meta
          name="description"
          content="Torres Colón: residencias desde $2.4M en ubicación privilegiada de Guadalajara. 3 modelos exclusivos: Andalucía, Turín y Milán con metrajes de 65-120m². Amenidades completas: alberca, gimnasio, área de asadores. ¡Agenda tu visita!"
        />
        <meta name="keywords" content="departamentos guadalajara centro, deptos modernos gdl, andalucia turin milan torres colon, departamentos 2024 guadalajara, alberca gimnasio guadalajara, torres colon, departamentos desde 2.4 millones" />
        <link rel="canonical" href="https://constructoralosPatos.com/desarrollos/torres-colon" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Torres Colón Guadalajara - Departamentos Modernos desde $2.4M" />
        <meta property="og:description" content="Departamentos modernos desde $2.4M en el centro de Guadalajara. 3 modelos exclusivos: Andalucía, Turín y Milán con metrajes de 65-120m². Amenidades premium: alberca, gimnasio, área de asadores." />
        <meta property="og:image" content="https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/97dc4246-e6ac-4117-93e0-11434537b532.png" />
        <meta property="og:url" content="https://constructoralosPatos.com/desarrollos/torres-colon" />
        <meta property="og:type" content="product" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Torres Colón Guadalajara - Departamentos Modernos desde $2.4M" />
        <meta name="twitter:description" content="Departamentos modernos desde $2.4M con 3 modelos exclusivos: Andalucía, Turín y Milán. Metrajes 65-120m². Amenidades premium en el centro de Guadalajara." />
        <meta name="twitter:image" content="https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/97dc4246-e6ac-4117-93e0-11434537b532.png" />
        
        {/* Schema.org Product */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Torres Colón",
            "description": "Departamentos modernos y bien ubicados en el corazón de Guadalajara con amenidades de primer nivel",
            "brand": {
              "@type": "Brand",
              "name": "Constructora Los Patos"
            },
            "category": "Departamentos",
            "image": "https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/97dc4246-e6ac-4117-93e0-11434537b532.png",
            "url": "https://constructoralosPatos.com/desarrollos/torres-colon",
            "offers": {
              "@type": "AggregateOffer",
              "availability": "https://schema.org/InStock",
              "priceCurrency": "MXN",
              "lowPrice": "2400000"
            },
            "additionalProperty": [
              {
                "@type": "PropertyValue",
                "name": "Ubicación",
                "value": "Guadalajara, Jalisco"
              },
              {
                "@type": "PropertyValue",
                "name": "Amenidades",
                "value": "Alberca, Gimnasio, Área de asadores, Juegos infantiles, Parque para mascotas"
              },
              {
                "@type": "PropertyValue",
                "name": "Modelos disponibles",
                "value": "Andalucía, Turín, Milán"
              },
              {
                "@type": "PropertyValue",
                "name": "Metrajes",
                "value": "65-120 m²"
              },
              {
                "@type": "PropertyValue",
                "name": "Precio desde",
                "value": "$2.4M MXN"
              }
            ]
          })}
        </script>
      </Helmet>
      <div className={styles.pageContainer}>
        <BreadcrumbNav
          links={[{ to: "/desarrollos", label: "Desarrollos" }]}
          currentPage="Torres Colón"
        />
        <main>{renderContent()}</main>
      </div>
    </>
  );
};

export default TorresColonPage;