import { schema, OutputType } from "./contact_POST.schema";
import { db } from "../helpers/db";
import superjson from "superjson";

export async function handle(request: Request) {
  try {
    const json = superjson.parse(await request.text());
    const validatedInput = schema.parse(json);

    const submission = await db
      .insertInto("contactSubmissions")
      .values({
        name: validatedInput.name,
        email: validatedInput.email,
        phone: validatedInput.phone,
        message: validatedInput.message,
      })
      .returning("id")
      .executeTakeFirstOrThrow();

    const response: OutputType = {
      success: true,
      submissionId: submission.id,
    };

    return new Response(superjson.stringify(response), {
      headers: { "Content-Type": "application/json" },
      status: 201,
    });
  } catch (error) {
    console.error("Error processing contact form:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return new Response(superjson.stringify({ error: errorMessage }), {
      status: 400,
    });
  }
}