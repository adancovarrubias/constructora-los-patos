import React from "react";
import { Helmet } from "react-helmet";
import { useDevelopmentByName } from "../helpers/useDevelopmentByName";
import { DevelopmentContactForm } from "../components/DevelopmentContactForm";
import { DevelopmentPageSkeleton } from "../components/DevelopmentPageSkeleton";
import { DevelopmentModelCard } from "../components/DevelopmentModelCard";
import { PremiumGallery, type GalleryImage } from "../components/PremiumGallery";
import { MilosModelShowcase } from "../components/MilosModelShowcase";
import { KiosModelShowcase } from "../components/KiosModelShowcase";
import { YarosModelShowcase } from "../components/YarosModelShowcase";
import { HeroSection } from "../components/HeroSection";
import { ContentSection } from "../components/ContentSection";
import { BreadcrumbNav } from "../components/BreadcrumbNav";
import { Button } from "../components/Button";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { DEVELOPMENT_NAMES, LAS_CEIBAS_MODELS, modelNameIncludes } from "../helpers/developmentConstants";
import styles from "./desarrollos.las-ceibas-manzanillo.module.css";

const LasCeibasManzanilloPage: React.FC = () => {
  const {
    data: development,
    isFetching,
    error,
  } = useDevelopmentByName(DEVELOPMENT_NAMES.LAS_CEIBAS);

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
              No pudimos encontrar la información para Las Ceibas Manzanillo. Por
              favor, intenta de nuevo más tarde.
            </p>
            <Button asChild variant="outline">
              <ArrowLeft size={16} /> Volver a Desarrollos
            </Button>
          </div>
        </ContentSection>
      );
    }

    // Transform images for PremiumGallery with proper categories
    const galleryImages: GalleryImage[] = development.galleryImages && development.galleryImages.length > 0
      ? development.galleryImages.map((img, index) => ({
          url: img.url,
          alt: img.alt || `${development.name} - Imagen ${index + 1}`,
          category: index === 0 ? "Exterior" : "Interior"
        }))
      : [{ 
          url: development.imageUrl || "", 
          alt: development.name,
          category: "Exterior"
        }];

    const images = galleryImages.map(img => ({ url: img.url, alt: img.alt }));

    return (
      <>
        {/* Hero Section */}
        <HeroSection
          backgroundImageUrl={images[0].url}
          logoUrl="https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/8810fd63-b789-4d57-8bac-3139f4fbb0c6.png"
          logoAlt="Logotipo oficial de Las Ceibas Manzanillo - Desarrollo residencial exclusivo cerca de la playa"
          title={development.tagline}
          location={development.location}
          height="primary"
        />

        {/* Project Description */}
        <ContentSection
          id="las-ceibas-descripcion"
          title="Tu Nuevo Hogar en Manzanillo"
        >
          <p className={styles.sectionText}>{development.description}</p>
        </ContentSection>

        {/* Exclusive Models */}
        <ContentSection
          id="las-ceibas-modelos"
          title="Modelos Exclusivos"
          subtitle="Elige el espacio perfecto que se adapte a tu estilo de vida."
          variant="muted"
        >
          <h3 className={styles.featuredModelTitle}>Modelos Disponibles</h3>
          
          <article aria-label="Modelo Milos">
            {development.models.find(model => modelNameIncludes(model.name, LAS_CEIBAS_MODELS.MILOS)) && (
              <MilosModelShowcase 
                model={development.models.find(model => modelNameIncludes(model.name, LAS_CEIBAS_MODELS.MILOS))!} 
              />
            )}
          </article>

          <article aria-label="Modelo Kios">
            {development.models.find(model => modelNameIncludes(model.name, LAS_CEIBAS_MODELS.KIOS)) && (
              <KiosModelShowcase 
                model={development.models.find(model => modelNameIncludes(model.name, LAS_CEIBAS_MODELS.KIOS))!} 
              />
            )}
          </article>

          <article aria-label="Modelo Yaros">
            {development.models.find(model => modelNameIncludes(model.name, LAS_CEIBAS_MODELS.YAROS)) && (
              <YarosModelShowcase 
                model={development.models.find(model => modelNameIncludes(model.name, LAS_CEIBAS_MODELS.YAROS))!} 
              />
            )}
          </article>
          
          <div className={styles.modelsGrid} role="list" aria-label="Modelos adicionales disponibles">
            {development.models
              .filter(model => 
                !modelNameIncludes(model.name, LAS_CEIBAS_MODELS.MILOS) && 
                !modelNameIncludes(model.name, LAS_CEIBAS_MODELS.KIOS) &&
                !modelNameIncludes(model.name, LAS_CEIBAS_MODELS.YAROS)
              )
              .map((model) => (
                <DevelopmentModelCard key={model.id} model={model} />
              ))}
          </div>
        </ContentSection>

        {/* Amenities and Services */}
        {development.features &&
          Array.isArray(development.features) &&
          development.features.length > 0 && (
            <ContentSection
              id="las-ceibas-amenidades"
              title="Amenidades y Servicios"
              subtitle="Todo lo que necesitas para vivir cómodamente y con seguridad."
            >
              <div className={styles.amenitiesGrid} role="list" aria-label="Lista de amenidades disponibles">
                {(development.features as string[]).map((feature) => (
                  <div key={feature} className={styles.amenityItem} role="listitem">
                    <CheckCircle
                      size={24}
                      className={styles.amenityIcon}
                      aria-hidden="true"
                    />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </ContentSection>
          )}

        {/* Image Gallery */}
        <ContentSection
          id="las-ceibas-galeria"
          title="Galería"
          subtitle="Visualiza tu vida en Las Ceibas. Explora nuestros espacios exteriores e interiores."
          variant="muted"
        >
          <PremiumGallery 
            images={galleryImages} 
            className={styles.premiumGallery}
            aria-label="Galería de imágenes de Las Ceibas Manzanillo mostrando exteriores e interiores"
          />
        </ContentSection>

        {/* Contact and Form */}
        <ContentSection
          id="las-ceibas-contacto"
          title="¿Interesado? Contáctanos"
        >
          <div className={styles.cta}>
            <p className={styles.ctaText}>
              ¡Ven a conocer tu nuevo hogar en Manzanillo! Agenda una cita y
              nosotros te llevamos.
            </p>
          </div>
          <div role="form" aria-label="Formulario de contacto para Las Ceibas Manzanillo">
            <DevelopmentContactForm
              developmentName={development.name}
              source="Página de Las Ceibas Manzanillo"
            />
          </div>
        </ContentSection>
      </>
    );
  };

  return (
    <>
      <Helmet>
        <title>Las Ceibas Manzanillo - Condominios Exclusivos a Minutos de la Playa | Milos, Kios, Yaros 2024</title>
        <meta
          name="description"
          content="Condominios exclusivos a minutos de la playa en Manzanillo, Colima. Las Ceibas ofrece 3 modelos únicos con precios competitivos: Milos, Kios y Yaros. Vive el estilo de vida costero que siempre soñaste. ¡Te llevamos a conocerlo!"
        />
        <meta name="keywords" content="condominios manzanillo playa, milos kios yaros precios, condos exclusivos manzanillo, condominios cerca playa colima, las ceibas manzanillo, condominios costeros, vida playa manzanillo" />
        <link rel="canonical" href="https://constructoralosPatos.com/desarrollos/las-ceibas-manzanillo" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Las Ceibas Manzanillo - Condominios Exclusivos a Minutos de la Playa" />
        <meta property="og:description" content="Condominios exclusivos a minutos de la playa en Manzanillo, Colima. 3 modelos únicos con precios competitivos: Milos, Kios y Yaros. Vive el estilo de vida costero que siempre soñaste." />
        <meta property="og:image" content="https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/8810fd63-b789-4d57-8bac-3139f4fbb0c6.png" />
        <meta property="og:url" content="https://constructoralosPatos.com/desarrollos/las-ceibas-manzanillo" />
        <meta property="og:type" content="product" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Las Ceibas Manzanillo - Condominios Exclusivos a Minutos de la Playa" />
        <meta name="twitter:description" content="Condominios exclusivos a minutos de la playa con 3 modelos únicos y precios competitivos: Milos, Kios y Yaros. Vive el estilo de vida costero en Manzanillo." />
        <meta name="twitter:image" content="https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/8810fd63-b789-4d57-8bac-3139f4fbb0c6.png" />
        
        {/* Schema.org Product */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Las Ceibas Manzanillo",
            "description": "Condominios exclusivos a minutos de la playa en Manzanillo con estilo de vida costero",
            "brand": {
              "@type": "Brand",
              "name": "Constructora Los Patos"
            },
            "category": "Condominios",
            "image": "https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/8810fd63-b789-4d57-8bac-3139f4fbb0c6.png",
            "url": "https://constructoralosPatos.com/desarrollos/las-ceibas-manzanillo",
            "offers": {
              "@type": "AggregateOffer",
              "availability": "https://schema.org/InStock",
              "priceCurrency": "MXN",
              "description": "Precios competitivos disponibles"
            },
            "additionalProperty": [
              {
                "@type": "PropertyValue",
                "name": "Ubicación",
                "value": "Manzanillo, Colima"
              },
              {
                "@type": "PropertyValue",
                "name": "Proximidad a playa",
                "value": "A minutos de la playa"
              },
              {
                "@type": "PropertyValue",
                "name": "Modelos disponibles",
                "value": "Milos, Kios, Yaros"
              },
              {
                "@type": "PropertyValue",
                "name": "Características",
                "value": "Condominios exclusivos con precios competitivos"
              },
              {
                "@type": "PropertyValue",
                "name": "Estilo de vida",
                "value": "Costero a minutos de la playa"
              }
            ]
          })}
        </script>
      </Helmet>
      <div className={styles.pageContainer}>
        <BreadcrumbNav
          links={[{ to: "/desarrollos", label: "Desarrollos" }]}
          currentPage="Las Ceibas Manzanillo"
        />
        <main role="main">{renderContent()}</main>
      </div>
    </>
  );
};

export default LasCeibasManzanilloPage;