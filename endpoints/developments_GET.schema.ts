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
    const errorObject = superjson.parse(await result.text());
        throw new Error((errorObject as any)?.error || 'Unknown error');
  }

  return superjson.parse<OutputType>(await result.text());
};