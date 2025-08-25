import { z } from "zod";
import superjson from "superjson";

export const schema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().min(1, { message: "Phone number is required." }),
  message: z.string().min(1, { message: "Message is required." }),
});

export type InputType = z.infer<typeof schema>;

export type OutputType = {
  success: boolean;
  submissionId: number;
};

export const postContact = async (
  body: InputType,
  init?: RequestInit
): Promise<OutputType> => {
  const validatedInput = schema.parse(body);
  const result = await fetch(`/_api/contact`, {
    method: "POST",
    body: superjson.stringify(validatedInput),
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