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
  // Add cache busting parameter to avoid stale cache
  const cacheBuster = `?t=${Date.now()}`;
  const result = await fetch(`/_api/developments${cacheBuster}`, {
    method: "GET",
    ...init,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "Pragma": "no-cache",
      ...(init?.headers ?? {}),
    },
  });

  if (!result.ok) {
    const errorText = await result.text();
    console.error('❌ Frontend API Error:', {
      status: result.status,
      statusText: result.statusText,
      headers: Object.fromEntries(result.headers.entries()),
      errorText: errorText
    });
    
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
  console.log('✅ Frontend API Success:', {
    status: result.status,
    responseLength: responseText.length,
    responsePreview: responseText.substring(0, 100) + '...'
  });
  
  try {
    // Try superjson first (for old endpoint compatibility)
    const parsed = superjson.parse<OutputType>(responseText);
    console.log('✅ Superjson parsing successful:', parsed.length, 'developments');
    return parsed;
  } catch (superjsonError) {
    console.log('⚠️ Superjson failed, trying regular JSON:', superjsonError.message);
    // If superjson fails, try regular JSON parsing
    const jsonData = JSON.parse(responseText);
    console.log('✅ Regular JSON parsing successful:', jsonData.length, 'developments');
    
    // Transform the simple API response to match expected format
    const transformed = jsonData.map((dev: any) => ({
      ...dev,
      galleryImages: dev.galleryImages || [],
      models: dev.models || []
    }));
    console.log('✅ Data transformation complete:', transformed);
    return transformed;
  }
};