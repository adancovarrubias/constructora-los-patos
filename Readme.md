# Constructora Los Patos Website Revitalization Project
        
Objective: Build a modern, cohesive website for Constructora Los Patos and its developments. The site must use original content from the existing pages but improve its quality and unify the design across all sections. The site should remain in Spanish and include the original sections Inicio, Nosotros, Desarrollos, Política de Calidad and Contacto, with corresponding subsections.

Source references: 
* Main company site: http://constructoralospatos.com
* Las Ceibas Manzanillo: https://www.lasceibasmanzanillo.com/
* Ecoterra Paraíso: https://www.ecoterraparaiso.com/
* Torres Colón: https://www.torrescolon.mx/

Inicio: Introduce the company with a hero image and note that Los Patos was founded in Guadalajara on 4 June 1984. Include a tagline that communicates the company’s long-standing commitment to quality residential developments.

Nosotros: Explain that Los Patos offers a full range of construction services, backed by decades of experience. Mention the company’s pledge to reliability, efficiency, cost-effectiveness, and customer satisfaction at every stage of construction. Add that Los Patos employs more than 500 people and is committed to excellence and social responsibility.

Desarrollos: Present three sub-sections, one for each development, with refined copy based on the original sites:
* Las Ceibas Manzanillo: Highlight “Exclusivos condominios a minutos de la playa”. Use the prototypes and their starting prices: Milos (Desde $1,697,899 MXN), Kios (Desde $2,047,453 MXN), Yaros (Desde $2,252,549 MXN). Mention amenities like controlled access, green areas, palapa, pool and more. Include a call-to-action like “¡Ven a conocer tu nuevo hogar en Manzanillo! Agenda una cita y nosotros te llevamos”.
* Ecoterra Paraíso: Emphasize “Vive a 35 minutos de la playa al menor precio”. Mention homes starting from approximately $950,000 MXN and describe the Bonanza model: 2 bedrooms, 1 bathroom, living-dining room, kitchen, service patio and parking. Highlight community services like schools, sports areas, commercial zone, water wells, civil association, treatment plant and transportation.
* Torres Colón (Guadalajara): Present the tagline “Descubre tu nuevo hogar con departamentos modernos, bien ubicados y diseñados para tu comodidad. ¡Agenda tu visita hoy!”. Describe the three apartment types with their sizes and prices: Andalucía (58.64 m², $2,400,000 MXN, 2 bedrooms, integrated kitchen, living room, dining room, service area, 1 bathroom); Turín (69.16 m², $2,824,430 MXN, similar features but 2 bathrooms); Milán (73.06 m², $2,982,492 MXN, similar features). List amenities like pool, barbecue area, gym, playground, pet park, multi‑use courts and commercial spaces, and note credit options.
Conclude this section with the unifying slogan “Construimos sueños para hacer historias.”

Política de Calidad: Paraphrase the original policy to explain that Los Patos achieves its objectives, mission and values through leadership, strategic direction, risk analysis, innovation, professional capacity, and continuous improvement.

Contacto: Include an improved contact form capturing name, email, phone and message. Provide phone numbers (33‑31‑10‑11‑12 and 33 16 72 94 40), the address Av. Miguel Ángel #7, Real Vallarta, Zapopan, Jalisco 45020, a map of the location and office hours (9:00–14:00 and 16:00–19:00). Integrate the form with Pipedrive for lead management and include social media icons.

Design: Maintain the original color palette and layout structure, but update the fonts and spacing for a contemporary look. Use high-quality lifestyle images that align with each section and development, and include the original logos for Los Patos and its developments. Ensure the site is fully responsive and provides smooth navigation between sections and subsections.

Made with Floot.

# Instructions

For security reasons, the `env.json` file is not pre-populated — you will need to generate or retrieve the values yourself.  

For **JWT secrets**, generate a value with:  

```
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Then paste the generated value into the appropriate field.  

For the **Floot Database**, request a `pg_dump` from support, upload it to your own PostgreSQL database, and then fill in the connection string value.  

**Note:** Floot OAuth will not work in self-hosted environments.  

For other external services, retrieve your API keys and fill in the corresponding values.  

Once everything is configured, you can build and start the service with:  

```
npm install -g pnpm
pnpm install
pnpm vite build
pnpm tsx server.ts
```
