// Schema Markup Configuration
// Gerencia todos os schemas structurados do site

export interface SchemaConfig {
    "@context": string;
    "@type": string;
    [key: string]: any;
}

/**
 * Schema Markup Principal da Autoescola Danda
 * Tipo: LocalBusiness/DrivingSchool
 */
export const mainSchema: SchemaConfig = {
    "@context": "https://schema.org",
    "@type": "DrivingSchool",
    "name": "Autoescola Danda",
    "image": "https://autoescoladanda.com.br/favicon.png",
    "@id": "https://autoescoladanda.com.br",
    "url": "https://autoescoladanda.com.br",
    "telephone": "+55-67-98136-8080",
    "email": "autoescoladanda@gmail.com",
    "priceRange": "$$",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "Rua Mariana Alves de Lima, 855",
        "addressLocality": "Aparecida do Taboado",
        "addressRegion": "MS",
        "postalCode": "79570-000",
        "addressCountry": "BR"
    },
    "geo": {
        "@type": "GeoCoordinates",
        "latitude": -20.0873,
        "longitude": -51.0956
    },
    "openingHoursSpecification": [
        {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday"
            ],
            "opens": "08:00",
            "closes": "18:00"
        }
    ],
    "sameAs": [
        "https://www.instagram.com/autoescoladanda/",
        "https://wa.me/5567981368080"
    ],
    "areaServed": {
        "@type": "City",
        "name": "Aparecida do Taboado",
        "containedInPlace": {
            "@type": "State",
            "name": "Mato Grosso do Sul"
        }
    },
    "description": "Autoescola em Aparecida do Taboado - MS com mais de 20 anos de experiência. Oferecemos cursos para CNH categorias A e B e reciclagem. Alta taxa de aprovação e preços acessíveis."
};

/**
 * Schema de Avaliação Agregada (Rating/Review)
 * DESCOMENTE e CONFIGURE quando tiver avaliações reais
 */
export const ratingSchema: SchemaConfig = {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "234"
    // Exemplo de uso: adicione ao mainSchema como "aggregateRating": ratingSchema
};

/**
 * Schemas específicos por página
 * Configure aqui os schemas adicionais para cada página
 */
export const pageSchemas = {
    /**
     * Página: /cursos
     * Tipo: Course
     */
    cursos: (courseData?: any): SchemaConfig => ({
        "@context": "https://schema.org",
        "@type": "Course",
        "name": courseData?.name || "Cursos de CNH",
        "description": courseData?.description || "Cursos para especialização da habilitação, incluindo transporte escolar, coletivo, emergencial, cargas indivisíveis e MOPP.",
        "provider": {
            "@type": "Organization",
            "name": "Autoescola Danda",
            "url": "https://autoescoladanda.com.br"
        },
        "image": courseData?.image || "https://autoescoladanda.com.br/favicon.png"
    }),

    /**
     * Página: /planos
     * Tipo: Product/Service
     */
    planos: (planoData?: any): SchemaConfig => ({
        "@context": "https://schema.org",
        "@type": "Service",
        "name": planoData?.name || "Planos de Cursos",
        "description": planoData?.description || "Diferentes planos de processos de habilitação",
        "provider": {
            "@type": "Organization",
            "name": "Autoescola Danda",
            "url": "https://autoescoladanda.com.br"
        },
        "areaServed": {
            "@type": "City",
            "name": "Aparecida do Taboado"
        }
    }),

    /**
     * Página: /transporte-escolar
     * Tipo: Service
     */
    transporteEscolar: (serviceData?: any): SchemaConfig => ({
        "@context": "https://schema.org",
        "@type": "Service",
        "name": serviceData?.name || "Transporte Escolar",
        "description": serviceData?.description || "Curso de transporte escolar com certificado válido em todo o Brasil.",
        "provider": {
            "@type": "Organization",
            "name": "Autoescola Danda",
            "url": "https://autoescoladanda.com.br"
        }
    }),

    /**
     * Página: /transporte-coletivo
     * Tipo: Service
     */
    transporteColetivo: (serviceData?: any): SchemaConfig => ({
        "@context": "https://schema.org",
        "@type": "Service",
        "name": serviceData?.name || "Transporte Coletivo",
        "description": serviceData?.description || "Curso de transporte coletivo com certificado válido em todo o Brasil.",
        "provider": {
            "@type": "Organization",
            "name": "Autoescola Danda",
            "url": "https://autoescoladanda.com.br"
        }
    }),

    /**
     * Página: /transporte-emergencial
     * Tipo: Service
     */
    transporteEmergencial: (serviceData?: any): SchemaConfig => ({
        "@context": "https://schema.org",
        "@type": "Service",
        "name": serviceData?.name || "Transporte Emergencial",
        "description": serviceData?.description || "Curso de transporte emergencial com certificado válido em todo o Brasil.",
        "provider": {
            "@type": "Organization",
            "name": "Autoescola Danda",
            "url": "https://autoescoladanda.com.br"
        }
    }),

    /**
     * Página: /cargas-indivisiveis
     * Tipo: Service
     */
    cargasIndivisiveis: (serviceData?: any): SchemaConfig => ({
        "@context": "https://schema.org",
        "@type": "Service",
        "name": serviceData?.name || "Cargas Indivisíveis",
        "description": serviceData?.description || "Curso completo de Cargas Indivisíveis com certificado válido em todo o Brasil.",
        "provider": {
            "@type": "Organization",
            "name": "Autoescola Danda",
            "url": "https://autoescoladanda.com.br"
        }
    }),

    /**
     * Página: /mopp
     * Tipo: Service
     */
    mopp: (serviceData?: any): SchemaConfig => ({
        "@context": "https://schema.org",
        "@type": "Service",
        "name": serviceData?.name || "MOPP",
        "description": serviceData?.description || "Curso de MOPP com certificado válido em todo o Brasil.",
        "provider": {
            "@type": "Organization",
            "name": "Autoescola Danda",
            "url": "https://autoescoladanda.com.br"
        }
    })
};

/**
 * Função auxiliar para adicionar Rating ao schema principal
 * Use quando tiver avaliações configuradas
 */
export function addRatingToSchema(schema: SchemaConfig, ratingValue: number, reviewCount: number): SchemaConfig {
    return {
        ...schema,
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": ratingValue.toString(),
            "reviewCount": reviewCount.toString()
        }
    };
}

/**
 * Função para adicionar schema de avaliação individual
 * Use para exibir avaliações específicas
 */
export function createReviewSchema(
    author: string,
    reviewRating: number,
    reviewBody: string
): SchemaConfig {
    return {
        "@context": "https://schema.org",
        "@type": "Review",
        "author": {
            "@type": "Person",
            "name": author
        },
        "reviewRating": {
            "@type": "Rating",
            "ratingValue": reviewRating.toString(),
            "bestRating": "5",
            "worstRating": "1"
        },
        "reviewBody": reviewBody,
        "itemReviewed": {
            "@type": "DrivingSchool",
            "name": "Autoescola Danda"
        }
    };
}
