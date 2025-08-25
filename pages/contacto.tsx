import React from "react";
import { Helmet } from "react-helmet";
import { z } from "zod";
import { toast } from "sonner";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  useForm,
} from "../components/Form";
import { Input } from "../components/Input";
import { Textarea } from "../components/Textarea";
import { Button } from "../components/Button";
import { useContactMutation } from "../helpers/useContactMutation";
import { schema as contactFormSchema } from "../endpoints/contact_POST.schema";
import styles from "./contacto.module.css";

const ContactPage: React.FC = () => {
  const form = useForm({
    schema: contactFormSchema,
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const contactMutation = useContactMutation();

  const onSubmit = (values: z.infer<typeof contactFormSchema>) => {
    contactMutation.mutate(values, {
      onSuccess: () => {
        toast.success("¡Mensaje enviado!", {
          description: "Gracias por contactarnos. Te responderemos pronto.",
        });
        form.setValues({ name: "", email: "", phone: "", message: "" });
      },
      onError: (error) => {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Ocurrió un error desconocido.";
        toast.error("Error al enviar el mensaje", {
          description: errorMessage,
        });
      },
    });
  };

  return (
    <>
      <Helmet>
        <title>Contacto | Constructora Los Patos</title>
        <meta
          name="description"
          content="Ponte en contacto con Constructora Los Patos. Envíanos un mensaje o visita nuestras oficinas en Zapopan, Jalisco."
        />
      </Helmet>
      <div className={styles.pageContainer}>
        <div className={styles.header}>
          <h1 className={styles.title}>Contacto</h1>
          <p className={styles.subtitle}>
            Estamos aquí para ayudarte. Contáctanos para más información sobre
            nuestros proyectos.
          </p>
        </div>
        <div className={styles.contentWrapper}>
          <div className={styles.infoPanel}>
            <h2 className={styles.panelTitle}>Información de Contacto</h2>
            <p className={styles.panelText}>
              No dudes en llamarnos o visitarnos durante nuestro horario de
              oficina.
            </p>
            <ul className={styles.infoList}>
              <li className={styles.infoItem}>
                <MapPin className={styles.infoIcon} />
                <span>
                  Av. Miguel Ángel #7, Real Vallarta,
                  <br />
                  Zapopan, Jalisco 45020
                </span>
              </li>
              <li className={styles.infoItem}>
                <Phone className={styles.infoIcon} />
                <div>
                  <a href="tel:3331101112">33-31-10-11-12</a>
                  <br />
                  <a href="tel:3316729440">33 16 72 94 40</a>
                </div>
              </li>
              <li className={styles.infoItem}>
                <Clock className={styles.infoIcon} />
                <span>9:00–14:00 y 16:00–19:00</span>
              </li>
            </ul>
            <div className={styles.socials}>
              <a href="#" aria-label="Facebook" className={styles.socialLink}>
                <Facebook />
              </a>
              <a href="#" aria-label="Instagram" className={styles.socialLink}>
                <Instagram />
              </a>
              <a href="#" aria-label="LinkedIn" className={styles.socialLink}>
                <Linkedin />
              </a>
            </div>
            <div className={styles.mapPlaceholder}>
              {/* Placeholder for Google Maps embed */}
              <p>Mapa de ubicación</p>
            </div>
          </div>
          <div className={styles.formPanel}>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={styles.form}
              >
                <FormItem name="name">
                  <FormLabel>Nombre Completo</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Tu nombre"
                      value={form.values.name}
                      onChange={(e) =>
                        form.setValues((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
                <FormItem name="email">
                  <FormLabel>Correo Electrónico</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="tu@correo.com"
                      value={form.values.email}
                      onChange={(e) =>
                        form.setValues((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
                <FormItem name="phone">
                  <FormLabel>Teléfono</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="Tu número de teléfono"
                      value={form.values.phone || ""}
                      onChange={(e) =>
                        form.setValues((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
                <FormItem name="message">
                  <FormLabel>Mensaje</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Escribe tu mensaje aquí..."
                      rows={5}
                      value={form.values.message}
                      onChange={(e) =>
                        form.setValues((prev) => ({
                          ...prev,
                          message: e.target.value,
                        }))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
                <Button
                  type="submit"
                  size="lg"
                  className={styles.submitButton}
                  disabled={contactMutation.isPending}
                >
                  {contactMutation.isPending ? "Enviando..." : "Enviar Mensaje"}
                  {!contactMutation.isPending && <Send size={18} />}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;