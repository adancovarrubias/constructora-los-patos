import { db } from "../helpers/db";
import { OutputType } from "./developments_GET.schema";
import superjson from "superjson";
import { Selectable } from "kysely";
import { Developments, DevelopmentModels } from "../helpers/schema";

function parseGalleryImages(galleryImages: any): Array<{ url: string; alt: string }> {
  // Handle null or undefined
  if (!galleryImages) {
    return [];
  }

  // If it's already an array, validate each item
  if (Array.isArray(galleryImages)) {
    return galleryImages.filter((item): item is { url: string; alt: string } => {
      return (
        item &&
        typeof item === 'object' &&
        typeof item.url === 'string' &&
        typeof item.alt === 'string'
      );
    });
  }

  // Try to parse as JSON if it's a string
  if (typeof galleryImages === 'string') {
    try {
      const parsed = JSON.parse(galleryImages);
      if (Array.isArray(parsed)) {
        return parsed.filter((item): item is { url: string; alt: string } => {
          return (
            item &&
            typeof item === 'object' &&
            typeof item.url === 'string' &&
            typeof item.alt === 'string'
          );
        });
      }
    } catch (error) {
      console.warn('Failed to parse galleryImages JSON:', error);
    }
  }

  // Fallback to empty array for any other type
  return [];
}

export async function handle(request: Request) {
  try {
    // Temporary mock data while DB connection is being configured
    const mockDevelopments = [
      {
        id: 1,
        name: "Torres Colón",
        slug: "torres-colon",
        description: "Desarrollo residencial premium con amenidades de lujo",
        location: "Colón, Panamá",
        price: "Desde $180,000",
        status: "En construcción",
        galleryImages: [
          { url: "/images/torres-colon-1.jpg", alt: "Vista exterior Torres Colón" },
          { url: "/images/torres-colon-2.jpg", alt: "Lobby Torres Colón" }
        ],
        models: []
      },
      {
        id: 2,
        name: "Ecoterra Paraíso",
        slug: "ecoterra-paraiso",
        description: "Vivir en armonía con la naturaleza",
        location: "Paraíso, Panamá",
        price: "Desde $120,000",
        status: "Disponible",
        galleryImages: [
          { url: "/images/ecoterra-1.jpg", alt: "Vista Ecoterra Paraíso" },
          { url: "/images/ecoterra-2.jpg", alt: "Áreas verdes Ecoterra" }
        ],
        models: []
      },
      {
        id: 3,
        name: "Las Ceibas Manzanillo",
        slug: "las-ceibas-manzanillo",
        description: "Exclusivo proyecto frente al mar",
        location: "Manzanillo, Colón",
        price: "Desde $95,000",
        status: "Pre-venta",
        galleryImages: [
          { url: "/images/ceibas-1.jpg", alt: "Vista al mar Las Ceibas" },
          { url: "/images/ceibas-2.jpg", alt: "Playa Las Ceibas" }
        ],
        models: []
      }
    ];

    return new Response(superjson.stringify(mockDevelopments), {
      headers: { "Content-Type": "application/json" },
    });

    // Original DB code (commented out temporarily)
    /*
    const developments = await db.selectFrom("developments").selectAll().execute();
    const models = await db.selectFrom("developmentModels").selectAll().execute();

    const modelsByDevelopmentId = models.reduce((acc, model) => {
      if (model.developmentId) {
        if (!acc[model.developmentId]) {
          acc[model.developmentId] = [];
        }
        acc[model.developmentId].push(model);
      }
      return acc;
    }, {} as Record<number, Selectable<DevelopmentModels>[]>);

    const developmentsWithModels: OutputType = developments.map(
      (dev: Selectable<Developments>) => ({
        ...dev,
        galleryImages: parseGalleryImages(dev.galleryImages),
        models: modelsByDevelopmentId[dev.id] || [],
      })
    );

    return new Response(superjson.stringify(developmentsWithModels), {
      headers: { "Content-Type": "application/json" },
    });
    */
  } catch (error) {
    console.error("Error fetching developments:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return new Response(superjson.stringify({ error: errorMessage }), {
      status: 500,
    });
  }
}