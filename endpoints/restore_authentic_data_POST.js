import { db } from "../helpers/db.js";

export async function handle(request) {
  try {
    console.log('🔄 Starting authentic data restoration...');
    
    // Clear existing data
    await db.deleteFrom("developmentModels").execute();
    await db.deleteFrom("developments").execute();
    console.log('✅ Cleared existing data');
    
    // Insert authentic developments
    const developmentsResult = await db
      .insertInto("developments")
      .values([
        {
          name: 'Torres Colón',
          slug: 'torres-colon',
          description: 'Desarrollo residencial premium con amenidades de lujo',
          location: 'Guadalajara, Jalisco',
          price: 'Desde $2,400,000',
          status: 'En construcción',
          galleryImages: [
            {"url": "https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/f65604d1-4f44-4185-84bc-c6ef76659a9a.gif", "alt": "Juegos infantiles - Torres Colón"},
            {"url": "https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/4402c4d8-5c5a-4c57-a6a6-80df86b38e3a.gif", "alt": "Área de asadores en azotea - Torres Colón"},
            {"url": "https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/83481ce6-c050-4930-ac0b-952b2218cf8e.gif", "alt": "Gimnasio moderno - Torres Colón"},
            {"url": "https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/40576222-9d49-4445-aab1-3c1d4de47808.gif", "alt": "Modelo del desarrollo - Torres Colón"},
            {"url": "https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/7976e53e-6b99-4aad-8b4e-7c0a1eef8a8f.png", "alt": "Mapa de ubicación - Torres Colón"}
          ],
          tagline: 'Departamentos Modernos en el Corazón de Guadalajara',
          features: ["Alberca", "Área de asadores", "Gimnasio", "Juegos infantiles", "Parque para mascotas", "Espacios comerciales"]
        },
        {
          name: 'Las Ceibas Manzanillo',
          slug: 'las-ceibas-manzanillo',
          description: 'Exclusivo proyecto frente al mar',
          location: 'Manzanillo, Colón',
          price: 'Precios competitivos',
          status: 'Pre-venta',
          galleryImages: [
            {"url": "/images/ceibas-1.jpg", "alt": "Vista al mar Las Ceibas"},
            {"url": "/images/ceibas-2.jpg", "alt": "Playa Las Ceibas"}
          ],
          tagline: 'Condominios exclusivos a minutos de la playa',
          features: []
        },
        {
          name: 'Ecoterra Paraíso',
          slug: 'ecoterra-paraiso',
          description: 'Vive en armonía con la naturaleza a solo 35 minutos de la playa',
          location: 'Manzanillo, Colima',
          price: 'Desde $950,000',
          status: 'Disponible',
          galleryImages: [
            {"url": "https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/b2da5df8-aa72-492d-8099-65e067bbf705.gif", "alt": "Vista aérea de edificios departamentales con detalles arquitectónicos modernos en Ecoterra Paraíso"},
            {"url": "https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/32b1dbbd-c8ee-4120-a67d-30eeda1c710f.gif", "alt": "Vista panorámica del desarrollo Ecoterra Paraíso con logotipo oficial"},
            {"url": "https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/8a859b7b-544a-40db-80e1-d7e5228ab4e2.gif", "alt": "Vista aérea de las casas modelo Bonanza con característicos techos rojos"}
          ],
          tagline: 'Casas económicas a 35 minutos de la playa en una comunidad planeada',
          features: ["Escuelas", "Áreas deportivas", "Zona comercial", "Pozos de agua", "Transporte público"]
        }
      ])
      .returning(['id', 'name'])
      .execute();

    console.log('✅ Inserted developments:', developmentsResult);

    // Get development IDs
    const torresColon = developmentsResult.find(d => d.name === 'Torres Colón');
    const lasCeibas = developmentsResult.find(d => d.name === 'Las Ceibas Manzanillo');
    const ecoterra = developmentsResult.find(d => d.name === 'Ecoterra Paraíso');

    // Insert authentic models
    await db
      .insertInto("developmentModels")
      .values([
        // Torres Colón models
        {
          developmentId: torresColon.id,
          name: 'Andalucía',
          price: 2400000,
          sizeM2: 58.64,
          bedrooms: 2,
          bathrooms: 1,
          features: ["2 recámaras", "1 baño completo", "Cocina integrada", "Sala - comedor", "Área de servicio", "Estacionamiento"],
          images: [
            {"url": "https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/55e8795e-849a-4f6a-b753-10f01d54cdd5.gif", "alt": "Plano del modelo Andalucía - Torres Colón"},
            {"url": "https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/21db2f8d-3e2a-4ba6-9c5e-7b7d719be17e.gif", "alt": "Interior del modelo Andalucía - Torres Colón"}
          ],
          description: 'Un espacio diseñado para la vida moderna. El modelo Andalucía ofrece una distribución inteligente que maximiza el confort y la funcionalidad, ideal para familias jóvenes y profesionales.'
        },
        {
          developmentId: torresColon.id,
          name: 'Turín',
          price: 2824430,
          sizeM2: 69.16,
          bedrooms: 2,
          bathrooms: 2,
          features: ["2 recámaras", "2 baños completos", "Cocina integrada", "Sala - comedor", "Área de servicio", "Estacionamiento"],
          images: [
            {"url": "https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/297f8fbf-1508-4bf2-906f-e4a6387f556c.gif", "alt": "Plano del modelo Turín - Torres Colón"},
            {"url": "https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/ea74ba11-1c41-4f0e-9ec1-07d7adf21f83.gif", "alt": "Interior del modelo Turín - Torres Colón"}
          ],
          description: 'Amplitud y elegancia se unen en el modelo Turín. Con dos baños completos y espacios generosos, es la opción perfecta para quienes buscan un extra de comodidad y estilo en la ciudad.'
        },
        {
          developmentId: torresColon.id,
          name: 'Milán',
          price: 2982492,
          sizeM2: 73.06,
          bedrooms: 2,
          bathrooms: 2,
          features: ["2 recámaras", "2 baños completos", "Cocina integrada", "Sala - comedor amplia", "Área de servicio", "Estacionamiento"],
          images: [
            {"url": "https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/958918b3-d01c-4fa8-a16c-4da83f476bf3.gif", "alt": "Plano del modelo Milán - Torres Colón"},
            {"url": "https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/55b8b001-57ac-460b-af16-bc8db26165c0.gif", "alt": "Interior del modelo Milán - Torres Colón"}
          ],
          description: 'El modelo Milán representa la máxima expresión de lujo y espacio. Con una distribución generosa y acabados de primera, es ideal para quienes buscan un estilo de vida superior sin sacrificar la comodidad urbana.'
        },
        // Las Ceibas models
        {
          developmentId: lasCeibas.id,
          name: 'Milos',
          price: null,
          sizeM2: 55.11,
          bedrooms: 2,
          bathrooms: 1,
          features: ["2 recámaras con closet", "1 baño completo", "Cocina integral con barra", "Sala - comedor", "Cuarto de lavado", "1 Estacionamiento", "Con opción a SUN ROOF"],
          images: [
            {"url": "https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/77b78fb7-e1a5-43a8-89e8-2c928d2ec981.gif", "alt": "Plano del modelo Milos - Las Ceibas Manzanillo"}
          ],
          description: 'Modelo con opción a SUN ROOF'
        },
        {
          developmentId: lasCeibas.id,
          name: 'Kios',
          price: null,
          sizeM2: 64.68,
          bedrooms: 2,
          bathrooms: 2,
          features: ["2 recámaras con closet", "2 baños completos", "Cocina integral con barra", "Sala - comedor", "Cuarto de lavado", "1 Estacionamiento", "Con opción a SUN ROOF"],
          images: [
            {"url": "https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/4cb0fe2c-f436-483f-8a05-9500b0670c82.gif", "alt": "Plano del modelo Kios - Las Ceibas Manzanillo"}
          ],
          description: 'Upgrade con 2 baños completos y opción a SUN ROOF'
        },
        {
          developmentId: lasCeibas.id,
          name: 'Yaros',
          price: null,
          sizeM2: 78.21,
          bedrooms: 3,
          bathrooms: 2,
          features: ["3 recámaras con closet", "2 baños completos", "Cocina integral con barra", "Sala - comedor", "Cuarto de lavado", "2 Estacionamientos", "Con opción a SUN ROOF"],
          images: [
            {"url": "https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/7abcdb2c-87a0-488e-9559-15d238997111.gif", "alt": "Plano del modelo Yaros - Las Ceibas Manzanillo"}
          ],
          description: 'MODELO PREMIUM - ¡3 recámaras! Más espacio y 2 estacionamientos'
        },
        // Ecoterra model
        {
          developmentId: ecoterra.id,
          name: 'Bonanza',
          price: 950000,
          sizeM2: 65,
          bedrooms: 2,
          bathrooms: 1,
          features: ["2 recámaras", "1 baño completo", "Sala - comedor", "Cocina", "Patio de servicio", "Estacionamiento"],
          images: [
            {"url": "https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/469ca930-075c-45ec-bb42-940929b85612.gif", "alt": "Plano del modelo Bonanza - Ecoterra Paraíso"},
            {"url": "https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/a9ba31c7-353f-4484-85f5-40a4aadaddc3.gif", "alt": "Interior del modelo Bonanza - Ecoterra Paraíso"}
          ],
          description: 'Vive en armonía with la naturaleza a solo 35 minutos de la playa. El modelo Bonanza ofrece un diseño funcional y acogedor, perfecto para disfrutar de la tranquilidad y el paraíso.'
        }
      ])
      .execute();

    const summary = {
      message: "✅ Datos auténticos restaurados exitosamente",
      developments: {
        "Torres Colón": {
          location: "Guadalajara, Jalisco", 
          models: ["Andalucía ($2,400,000)", "Turín ($2,824,430)", "Milán ($2,982,492)"],
          amenities: ["Alberca", "Gimnasio", "Asadores", "Juegos infantiles"]
        },
        "Las Ceibas": {
          location: "Manzanillo, Colón",
          models: ["Milos (55.11m²)", "Kios (64.68m²)", "Yaros (78.21m² PREMIUM)"],
          feature: "Todos con opción SUN ROOF"
        },
        "Ecoterra": {
          location: "Manzanillo, Colima",
          models: ["Bonanza ($950,000, 65m²)"],
          services: ["Escuelas", "Deportivas", "Comercial"]
        }
      }
    };

    console.log('🎯 RESTAURACIÓN COMPLETA:', summary);
    
    return new Response(JSON.stringify(summary, null, 2), {
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error('❌ Error restoring data:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
