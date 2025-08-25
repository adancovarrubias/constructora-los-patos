import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postContact, InputType } from "../endpoints/contact_POST.schema";

export const useContactMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: InputType) => postContact(data),
    onSuccess: () => {
      // Optionally invalidate queries if needed, e.g., a list of submissions
      // For now, we don't have a query to invalidate.
      console.log("Contact form submitted successfully.");
    },
    onError: (error) => {
      console.error("Failed to submit contact form:", error);
    },
  });
};