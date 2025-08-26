import { db } from "../helpers/db";

// Datos auténticos extraídos de los componentes originales
const AUTHENTIC_DEVELOPMENTS = [
  {
    name: "Torres Colón",
    slug: "torres-colon", 
    description: "Desarrollo residencial premium con amenidades de lujo",
    location: "Guadalajara, Jalisco",
    price: "Desde $2,400,000",
    status: "En construcción",
    tagline: "Departamentos Modernos en el Corazón de Guadalajara",
    features: JSON.stringify(["Alberca", "Área de asadores", "Gimnasio", "Juegos infantiles", "Parque para mascotas", "Espacios comerciales"]),
    galleryImages: JSON.stringify([
      {
        url: "https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/f65604d1-4f44-4185-84bc-c6ef76659a9a.gif",
        alt: "Juegos infantiles - Torres Colón"
      },
      {
        url: "https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/4402c4d8-5c5a-4c57-a6a6-80df86b38e3a.gif", 
        alt: "Área de asadores en azotea - Torres Colón"
      },
      {
        url: "https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/83481ce6-c050-4930-ac0b-952b2218cf8e.gif",
        alt: "Gimnasio moderno - Torres Colón"
      },
      {
        url: "https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/40576222-9d49-4445-aab1-3c1d4de47808.gif",
        alt: "Modelo del desarrollo - Torres Colón"
      },
      {
        url: "https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/7976e53e-6b99-4aad-8b4e-7c0a1eef8a8f.png",
        alt: "Mapa de ubicación - Torres Colón"
      }
    ]),
    models: [
      {
        name: "Andalucía",
        price: 2400000,
        area: 58.64,
        bedrooms: 2,
        bathrooms: 1,
        features: JSON.stringify(["2 recámaras", "1 baño completo", "Cocina integrada", "Sala - comedor", "Área de servicio", "Estacionamiento"]),
        images: JSON.stringify([
          {
            url: "https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/55e8795e-849a-4f6a-b753-10f01d54cdd5.gif",
            alt: "Plano del modelo Andalucía - Torres Colón"
          },
          {
            url: "https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/21db2f8d-3e2a-4ba6-9c5e-7b7d719be17e.gif",
            alt: "Interior del modelo Andalucía - Torres Colón"
          }
        ]),
        description: "Un espacio diseñado para la vida moderna. El modelo Andalucía ofrece una distribución inteligente que maximiza el confort y la funcionalidad, ideal para familias jóvenes y profesionales."
      },
      {
        name: "Turín",
        price: 2824430,
        area: 69.16,
        bedrooms: 2,
        bathrooms: 2,
        features: JSON.stringify(["2 recámaras", "2 baños completos", "Cocina integrada", "Sala - comedor", "Área de servicio", "Estacionamiento"]),
        images: JSON.stringify([
          {
            url: "https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/297f8fbf-1508-4bf2-906f-e4a6387f556c.gif",
            alt: "Plano del modelo Turín - Torres Colón"
          },
          {
            url: "https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/ea74ba11-1c41-4f0e-9ec1-07d7adf21f83.gif", 
            alt: "Interior del modelo Turín - Torres Colón"
          }
        ]),
        description: "Amplitud y elegancia se unen en el modelo Turín. Con dos baños completos y espacios generosos, es la opción perfecta para quienes buscan un extra de comodidad y estilo en la ciudad."
      },
      {
        name: "Milán",
        price: 2982492,
        area: 73.06,
        bedrooms: 2,
        bathrooms: 2,
        features: JSON.stringify(["2 recámaras", "2 baños completos", "Cocina integrada", "Sala - comedor amplia", "Área de servicio", "Estacionamiento"]),
        images: JSON.stringify([
          {
            url: "https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/958918b3-d01c-4fa8-a16c-4da83f476bf3.gif",
            alt: "Plano del modelo Milán - Torres Colón"
          },
          {
            url: "https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/55b8b001-57ac-460b-af16-bc8db26165c0.gif",
            alt: "Interior del modelo Milán - Torres Colón"
          }
        ]),
        description: "El modelo Milán representa la máxima expresión de lujo y espacio. Con una distribución generosa y acabados de primera, es ideal para quienes buscan un estilo de vida superior sin sacrificar la comodidad urbana."
      }
    ]
  },
  {
    name: "Las Ceibas Manzanillo",
    slug: "las-ceibas-manzanillo",
    description: "Exclusivo proyecto frente al mar",
    location: "Manzanillo, Colón", 
    price: "Precios competitivos",
    status: "Pre-venta",
    tagline: "Condominios exclusivos a minutos de la playa",
    features: JSON.stringify([]),
    galleryImages: JSON.stringify([
      {
        url: "/images/ceibas-1.jpg",
        alt: "Vista al mar Las Ceibas"
      },
      {
        url: "/images/ceibas-2.jpg",
        alt: "Playa Las Ceibas"
      }
    ]),
    models: [
      {
        name: "Milos",
        price: null,
        area: 55.11,
        bedrooms: 2,
        bathrooms: 1,
        features: JSON.stringify(["2 recámaras con closet", "1 baño completo", "Cocina integral con barra", "Sala - comedor", "Cuarto de lavado", "1 Estacionamiento", "Con opción a SUN ROOF"]),
        images: JSON.stringify([
          {
            url: "https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/77b78fb7-e1a5-43a8-89e8-2c928d2ec981.gif",
            alt: "Plano del modelo Milos - Las Ceibas Manzanillo"
          }
        ]),
        description: "Modelo con opción a SUN ROOF"
      },
      {
        name: "Kios",
        price: null,
        area: 64.68,
        bedrooms: 2,
        bathrooms: 2,
        features: JSON.stringify(["2 recámaras con closet", "2 baños completos", "Cocina integral con barra", "Sala - comedor", "Cuarto de lavado", "1 Estacionamiento", "Con opción a SUN ROOF"]),
        images: JSON.stringify([
          {
            url: "https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/4cb0fe2c-f436-483f-8a05-9500b0670c82.gif",
            alt: "Plano del modelo Kios - Las Ceibas Manzanillo"
          }
        ]),
        description: "Upgrade con 2 baños completos y opción a SUN ROOF"
      },
      {
        name: "Yaros",
        price: null,
        area: 78.21,
        bedrooms: 3,
        bathrooms: 2,
        features: JSON.stringify(["3 recámaras con closet", "2 baños completos", "Cocina integral con barra", "Sala - comedor", "Cuarto de lavado", "2 Estacionamientos", "Con opción a SUN ROOF"]),
        images: JSON.stringify([
          {
            url: "https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/7abcdb2c-87a0-488e-9559-15d238997111.gif",
            alt: "Plano del modelo Yaros - Las Ceibas Manzanillo"
          }
        ]),
        description: "MODELO PREMIUM - ¡3 recámaras! Más espacio y 2 estacionamientos"
      }
    ]
  },
  {
    name: "Ecoterra Paraíso",
    slug: "ecoterra-paraiso",
    description: "Vive en armonía con la naturaleza a solo 35 minutos de la playa",
    location: "Manzanillo, Colima",
    price: "Desde $950,000",
    status: "Disponible",
    tagline: "Casas económicas a 35 minutos de la playa en una comunidad planeada",
    features: JSON.stringify(["Escuelas", "Áreas deportivas", "Zona comercial", "Pozos de agua", "Transporte público"]),
    galleryImages: JSON.stringify([
      {
        url: "https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/b2da5df8-aa72-492d-8099-65e067bbf705.gif",
        alt: "Vista aérea de edificios departamentales con detalles arquitectónicos modernos en Ecoterra Paraíso"
      },
      {
        url: "https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/32b1dbbd-c8ee-4120-a67d-30eeda1c710f.gif",
        alt: "Vista panorámica del desarrollo Ecoterra Paraíso con logotipo oficial"
      },
      {
        url: "https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/8a859b7b-544a-40db-80e1-d7e5228ab4e2.gif",
        alt: "Vista aérea de las casas modelo Bonanza con característicos techos rojos"
      }
    ]),
    models: [
      {
        name: "Bonanza",
        price: 950000,
        area: 65,
        bedrooms: 2,
        bathrooms: 1,
        features: JSON.stringify(["2 recámaras", "1 baño completo", "Sala - comedor", "Cocina", "Patio de servicio", "Estacionamiento"]),
        images: JSON.stringify([
          {
            url: "https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/469ca930-075c-45ec-bb42-940929b85612.gif",
            alt: "Plano del modelo Bonanza - Ecoterra Paraíso"
          },
          {
            url: "https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/a9ba31c7-353f-4484-85f5-40a4aadaddc3.gif",
            alt: "Interior del modelo Bonanza - Ecoterra Paraíso"
          }
        ]),
        description: "Vive en armonía con la naturaleza a solo 35 minutos de la playa. El modelo Bonanza ofrece un diseño funcional y acogedor, perfecto para disfrutar de la tranquilidad y el paraíso."
      }
    ]
  }
];

export async function handle(request: Request) {
  try {
    console.log('🔄 Iniciando restauración de datos auténticos...');
    
    // Test de conexión
    await db.selectFrom("developments").select("id").limit(1).execute();
    console.log('✅ Conexión a base de datos confirmada');
    
    // Limpiar datos existentes
    console.log('🧹 Limpiando datos existentes...');
    await db.deleteFrom("developmentModels").execute();
    await db.deleteFrom("developments").execute();
    
    let totalModels = 0;
    
    // Insertar cada desarrollo con sus modelos
    for (const devData of AUTHENTIC_DEVELOPMENTS) {
      console.log(`📝 Insertando: ${devData.name}`);
      
      // Insertar desarrollo
      const developmentResult = await db
        .insertInto("developments")
        .values({
          name: devData.name,
          slug: devData.slug,
          description: devData.description,
          location: devData.location,
          price: devData.price,
          status: devData.status,
          tagline: devData.tagline,
          features: devData.features,
          galleryImages: devData.galleryImages
        })
        .returning("id")
        .executeTakeFirstOrThrow();
        
      // Insertar modelos
      for (const model of devData.models) {
        await db
          .insertInto("developmentModels")
          .values({
            developmentId: developmentResult.id,
            name: model.name,
            price: model.price,
            area: model.area,
            bedrooms: model.bedrooms,
            bathrooms: model.bathrooms,
            features: model.features,
            images: model.images,
            description: model.description
          })
          .execute();
        totalModels++;
      }
    }
    
    console.log('🎉 Restauración completada exitosamente!');
    
    return new Response(JSON.stringify({
      success: true,
      message: 'Datos auténticos restaurados exitosamente',
      summary: {
        developments: AUTHENTIC_DEVELOPMENTS.length,
        models: totalModels,
        details: [
          'Torres Colón (Guadalajara): 3 modelos auténticos',
          'Las Ceibas Manzanillo: 3 modelos con SUN ROOF',  
          'Ecoterra Paraíso (Manzanillo, Colima): 1 modelo'
        ]
      }
    }), {
      headers: { "Content-Type": "application/json" }
    });
    
  } catch (error) {
    console.error('❌ Error durante la restauración:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido',
      stack: error instanceof Error ? error.stack : undefined
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
