-- Crear base de datos y tablas para Constructora Los Patos

-- Tabla de desarrollos
CREATE TABLE IF NOT EXISTS developments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    tagline VARCHAR(255) NOT NULL,
    starting_price DECIMAL(12,2),
    image_url VARCHAR(500),
    features JSONB DEFAULT '[]',
    gallery_images JSONB DEFAULT '[]',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de modelos de desarrollo
CREATE TABLE IF NOT EXISTS development_models (
    id SERIAL PRIMARY KEY,
    development_id INTEGER REFERENCES developments(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(12,2) NOT NULL,
    bedrooms INTEGER,
    bathrooms INTEGER,
    size_m2 DECIMAL(8,2),
    features JSONB DEFAULT '[]',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de contactos
CREATE TABLE IF NOT EXISTS contact_submissions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar datos de ejemplo para desarrollos
INSERT INTO developments (name, description, location, tagline, starting_price, features, gallery_images) VALUES 
(
    'Torres Colón',
    'Desarrollo residencial premium ubicado en el corazón de Colón, ofreciendo apartamentos modernos con acabados de primera calidad y amenidades exclusivas para toda la familia.',
    'Colón, Panamá',
    'Vivir con estilo en el corazón de Colón',
    180000.00,
    '["Piscina", "Gimnasio", "Área de juegos", "Seguridad 24/7", "Parqueo techado", "Salón de eventos"]',
    '[
        {"url": "/images/torres-colon/exterior-1.jpg", "alt": "Vista exterior Torres Colón"},
        {"url": "/images/torres-colon/lobby.jpg", "alt": "Lobby elegante con diseño moderno"},
        {"url": "/images/torres-colon/piscina.jpg", "alt": "Piscina con área de recreación"},
        {"url": "/images/torres-colon/gimnasio.jpg", "alt": "Gimnasio completamente equipado"}
    ]'
),
(
    'Ecoterra Paraíso',
    'Un desarrollo sostenible que combina la vida moderna con la naturaleza. Ubicado en Paraíso, ofrece casas ecológicas con tecnología verde y espacios verdes amplios.',
    'Paraíso, Panamá',
    'Vivir en armonía con la naturaleza',
    120000.00,
    '["Paneles solares", "Sistema de recolección de agua", "Jardines comunitarios", "Senderos ecológicos", "Parque infantil natural", "Centro de reciclaje"]',
    '[
        {"url": "/images/ecoterra/vista-general.jpg", "alt": "Vista general del desarrollo Ecoterra"},
        {"url": "/images/ecoterra/casa-modelo.jpg", "alt": "Casa modelo con diseño sostenible"},
        {"url": "/images/ecoterra/jardines.jpg", "alt": "Jardines comunitarios y áreas verdes"},
        {"url": "/images/ecoterra/senderos.jpg", "alt": "Senderos ecológicos para caminatas"}
    ]'
),
(
    'Las Ceibas Manzanillo',
    'Exclusivo proyecto residencial frente al mar en Manzanillo, Colón. Ofrece villas de lujo con acceso privado a la playa y vistas espectaculares al océano.',
    'Manzanillo, Colón',
    'Tu hogar frente al mar',
    95000.00,
    '["Acceso privado a playa", "Club de playa", "Muelle privado", "Seguridad perimetral", "Restaurante", "Actividades acuáticas"]',
    '[
        {"url": "/images/ceibas/vista-mar.jpg", "alt": "Vista panorámica al mar desde Las Ceibas"},
        {"url": "/images/ceibas/playa-privada.jpg", "alt": "Playa privada exclusiva para residentes"},
        {"url": "/images/ceibas/villa-modelo.jpg", "alt": "Villa modelo frente al mar"},
        {"url": "/images/ceibas/atardecer.jpg", "alt": "Atardecer desde la terraza de las villas"}
    ]'
);

-- Insertar modelos para Torres Colón
INSERT INTO development_models (development_id, name, description, price, bedrooms, bathrooms, size_m2, features) VALUES 
(
    1, 
    'Modelo Andalucía',
    'Apartamento de 2 recámaras con balcón y vista a la ciudad. Cocina moderna integrada y acabados premium.',
    180000.00,
    2,
    2,
    85.50,
    '["Balcón privado", "Cocina integrada", "Closet walk-in", "Baño principal con jacuzzi", "Pisos de porcelanato", "Aire acondicionado central"]'
),
(
    1,
    'Modelo Bonanza', 
    'Apartamento familiar de 3 recámaras con doble balcón. Ideal para familias que buscan comodidad y estilo.',
    220000.00,
    3,
    2,
    105.75,
    '["Doble balcón", "Cuarto de lavado", "Cocina con isla", "Closet en todas las recámaras", "Baño de visitas", "Área de estudio"]'
);

-- Insertar modelos para Ecoterra Paraíso
INSERT INTO development_models (development_id, name, description, price, bedrooms, bathrooms, size_m2, features) VALUES 
(
    2,
    'Casa Kios',
    'Casa de 2 plantas con diseño bioclimático. Incluye jardín privado y sistema de captación de agua lluvia.',
    120000.00,
    3,
    2,
    120.00,
    '["Jardín privado", "Sistema captación agua", "Paneles solares", "Ventilación cruzada", "Terraza en segundo piso", "Huerto familiar"]'
),
(
    2,
    'Casa Milos',
    'Casa familiar de 1 planta con amplio patio y pérgola. Perfecta para quienes buscan simplicidad y contacto con la naturaleza.',
    135000.00,
    3,
    2,
    95.25,
    '["Patio amplio", "Pérgola de madera", "Cocina con compostero", "Jardín de lluvia", "Pérgola solar", "Espacio para mascotas"]'
);

-- Insertar modelos para Las Ceibas Manzanillo  
INSERT INTO development_models (development_id, name, description, price, bedrooms, bathrooms, size_m2, features) VALUES 
(
    3,
    'Villa Milan',
    'Villa de 1 planta con acceso directo a la playa. Terraza amplia con vista al mar y jacuzzi privado.',
    95000.00,
    2,
    2,
    110.00,
    '["Acceso directo playa", "Terraza vista al mar", "Jacuzzi privado", "Cocina americana", "Ventanales panorámicos", "Pérgola exterior"]'
),
(
    3,
    'Villa Yaros',
    'Villa de 2 plantas con rooftop y vista 360°. Incluye muelle privado y área de entretenimiento.',
    125000.00,
    3,
    3,
    145.80,
    '["Rooftop con vista 360°", "Muelle privado", "Área entretenimiento", "Bar exterior", "Escalera caracol", "Baño en cada planta"]'
),
(
    3,
    'Villa Turin',
    'Villa familiar de lujo con piscina privada. Diseño moderno con amplios espacios y acabados de primera.',
    155000.00,
    4,
    3,
    180.25,
    '["Piscina privada", "Cuarto de servicio", "Garaje doble", "Cocina gourmet", "Master suite con vestidor", "Sala de TV independiente"]'
);

-- Crear índices para mejor performance
CREATE INDEX IF NOT EXISTS idx_developments_name ON developments(name);
CREATE INDEX IF NOT EXISTS idx_development_models_development_id ON development_models(development_id);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para actualizar updated_at en developments
CREATE TRIGGER update_developments_updated_at 
    BEFORE UPDATE ON developments 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
