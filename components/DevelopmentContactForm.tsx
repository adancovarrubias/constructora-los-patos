import React from "react";
import { z } from "zod";
import { useForm, Form, FormItem, FormLabel, FormControl, FormMessage } from "./Form";
import { Input } from "./Input";
import { Textarea } from "./Textarea";
import { Button } from "./Button";
import { useContactMutation } from "../helpers/useContactMutation";
import { schema as contactSchema } from "../endpoints/contact_POST.schema";
import { toast } from "sonner";
import { Send } from "lucide-react";
import styles from "./DevelopmentContactForm.module.css";

type DevelopmentContactFormProps = {
  developmentName: string;
  source: string;
  className?: string;
};

/**
 * DevelopmentContactForm Component - Constructora Los Patos
 * 
 * LEAD MANAGEMENT INTEGRATION:
 * This component serves as a critical lead capture mechanism for our development
 * landing pages. It integrates directly with Pipedrive CRM through our contact
 * endpoint, ensuring all leads are properly tracked and managed in our sales pipeline.
 * 
 * BUSINESS CONTEXT:
 * - Primary conversion tool for development-specific landing pages
 * - Automatically tags leads with development name and traffic source
 * - Optimized for Mexican real estate market user behavior patterns
 * - Mobile-first design reflects primary user device preferences
 * 
 * TECHNICAL ARCHITECTURE:
 * - Uses React Hook Form for optimal performance and validation
 * - Integrates with TanStack Query for robust API state management
 * - Implements progressive enhancement for accessibility compliance
 */
export const DevelopmentContactForm: React.FC<DevelopmentContactFormProps> = ({
  developmentName,
  source,
  className,
}) => {
  /**
   * FORM VALIDATION STRATEGY:
   * Leverages Zod schema validation for type safety and user experience.
   * Schema is shared between frontend and backend to ensure data consistency.
   * Real-time validation provides immediate feedback to users.
   */
  const contactForm = useForm({
    schema: contactSchema,
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  /**
   * PIPEDRIVE INTEGRATION:
   * useContactMutation hook handles the API communication with our Pipedrive
   * integration endpoint. This ensures all leads are automatically created
   * in our CRM with proper lead scoring and assignment rules.
   */
  const contactSubmissionMutation = useContactMutation();

  /**
   * FORM SUBMISSION HANDLER:
   * Processes form data and enriches it with development context and source tracking.
   * This enrichment is critical for our sales team to understand lead quality
   * and conversion attribution across different marketing channels.
   * 
   * MESSAGE FORMAT STRATEGY:
   * The automatic message formatting includes:
   * - Development name (for lead qualification)
   * - Traffic source (for marketing attribution)
   * - User's original message (for personalization)
   */
  const handleFormSubmission = (formValues: z.infer<typeof contactSchema>) => {
    // Enrich form data with development context and source attribution
    const enrichedLeadData = {
      ...formValues,
      message: `Interés en: ${developmentName}\nOrigen: ${source}\n\nMensaje:\n${formValues.message}`,
    };

    contactSubmissionMutation.mutate(enrichedLeadData, {
      onSuccess: () => {
        // Success feedback optimized for Mexican market expectations
        toast.success("¡Gracias por tu interés!", {
          description: "Hemos recibido tu mensaje y nos pondremos en contacto contigo pronto.",
        });
        // Reset form to allow multiple submissions if needed
        contactForm.setValues({ name: "", email: "", phone: "", message: "" });
      },
      onError: (error) => {
        // Error handling with user-friendly messaging
        toast.error("Error al enviar", {
          description: error instanceof Error ? error.message : "Por favor, intenta de nuevo.",
        });
      },
    });
  };

  return (
    <div className={`${styles.formContainer} ${className || ""}`}>
      <Form {...contactForm}>
        <form onSubmit={contactForm.handleSubmit(handleFormSubmission)} className={styles.form}>
          {/* 
            RESPONSIVE GRID LAYOUT:
            CSS Grid provides optimal field arrangement across device sizes.
            Mobile: Single column for easy thumb navigation
            Desktop: Two columns for efficient space utilization
            Strategic field ordering prioritizes most important data first
          */}
          <div className={styles.responsiveFieldGrid}>
            {/* 
              FULL NAME FIELD:
              Spans full width on all devices for optimal UX.
              Required field for lead qualification and personalization.
            */}
            <FormItem name="name" className={styles.fullWidthField}>
              <FormLabel>Nombre Completo</FormLabel>
              <FormControl>
                <Input
                  placeholder="Tu nombre"
                  value={contactForm.values.name}
                  onChange={(e) => contactForm.setValues((prev) => ({ ...prev, name: e.target.value }))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
            
            {/* 
              EMAIL FIELD:
              Primary contact method for lead nurturing campaigns.
              Email validation ensures deliverability for follow-up communications.
            */}
            <FormItem name="email">
              <FormLabel>Correo Electrónico</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="tu@correo.com"
                  value={contactForm.values.email}
                  onChange={(e) => contactForm.setValues((prev) => ({ ...prev, email: e.target.value }))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
            
            {/* 
              PHONE FIELD:
              Optional field recognizing that some users prefer email-only contact.
              When provided, enables immediate phone follow-up for high-intent leads.
            */}
            <FormItem name="phone">
              <FormLabel>Teléfono</FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder="Tu número de teléfono"
                  value={contactForm.values.phone || ""}
                  onChange={(e) => contactForm.setValues((prev) => ({ ...prev, phone: e.target.value }))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
            
            {/* 
              MESSAGE FIELD:
              Free-form text allows users to express specific interests or questions.
              Spans full width to provide comfortable typing experience.
              Pre-populated with development context in submission handler.
            */}
            <FormItem name="message" className={styles.fullWidthField}>
              <FormLabel>Mensaje</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Escribe tu mensaje o preguntas aquí..."
                  rows={4}
                  value={contactForm.values.message}
                  onChange={(e) => contactForm.setValues((prev) => ({ ...prev, message: e.target.value }))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </div>
          
          {/* 
            SUBMISSION BUTTON:
            Loading state management prevents double submissions and provides user feedback.
            Icon reinforces the action while maintaining accessibility.
            Full width on mobile ensures easy thumb access.
          */}
          <Button
            type="submit"
            size="lg"
            className={styles.submitButton}
            disabled={contactSubmissionMutation.isPending}
          >
            {contactSubmissionMutation.isPending ? "Enviando..." : "Enviar Mensaje"}
            {!contactSubmissionMutation.isPending && <Send size={18} />}
          </Button>
        </form>
      </Form>
    </div>
  );
};