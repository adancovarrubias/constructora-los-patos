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
  } catch (error) {
    console.error("Error fetching developments:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return new Response(superjson.stringify({ error: errorMessage }), {
      status: 500,
    });
  }
}