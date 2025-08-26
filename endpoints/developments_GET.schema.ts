import { z } from "zod";
import superjson from "superjson";
import { Selectable } from "kysely";
import { Developments, DevelopmentModels } from "../helpers/schema";

// No input schema for this GET request
export const schema = z.object({});

export type InputType = z.infer<typeof schema>;

export type DevelopmentWithModels = Omit<Selectable<Developments>, 'galleryImages'> & {
  galleryImages: Array<{ url: string; alt: string }>;
  models: Selectable<DevelopmentModels>[];
};

export type OutputType = DevelopmentWithModels[];

export const getDevelopments = async (
  init?: RequestInit
): Promise<OutputType> => {
  const result = await fetch(`/_api/developments`, {
    method: "GET",
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  if (!result.ok) {
    const errorText = await result.text();
    let errorMessage = 'Unknown error';
    
    try {
      // Try to parse as superjson first (for old endpoint compatibility)
      const errorObject = superjson.parse(errorText);
      errorMessage = (errorObject as any)?.error || errorMessage;
    } catch {
      // If superjson fails, try regular JSON
      try {
        const errorObject = JSON.parse(errorText);
        errorMessage = errorObject?.error || errorMessage;
      } catch {
        // If both fail, use the text as is
        errorMessage = errorText || errorMessage;
      }
    }
    
    throw new Error(errorMessage);
  }

  const responseText = await result.text();
  
  try {
    // Try superjson first (for old endpoint compatibility)
    return superjson.parse<OutputType>(responseText);
  } catch {
    // If superjson fails, try regular JSON parsing
    const jsonData = JSON.parse(responseText);
    
    // Transform the simple API response to match expected format
    return jsonData.map((dev: any) => ({
      ...dev,
      galleryImages: dev.galleryImages || [],
      models: dev.models || []
    }));
  }
};