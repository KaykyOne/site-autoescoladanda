# 📋 Schema Markup - Guia de Uso

Este arquivo documenta como usar os schemas estruturados do site.

## 📂 Estrutura

- **`src/lib/schemas.ts`** - Arquivo central com todas as configurações de schema
- **`src/layout.astro`** - Layout padrão que importa `mainSchema`

## 🚀 Como Usar

### 1. Schema Padrão (em todas as páginas)

O `mainSchema` é importado automaticamente em `src/layout.astro` e aplicado a todas as páginas.

```astro
<!-- Automaticamente renderizado no <head> -->
<script type="application/ld+json" set:html={JSON.stringify(mainSchema)}></script>
```

### 2. Schema Específico por Página

Para adicionar um schema específico em uma página, importe e use junto com o mainSchema:

#### Exemplo: Página de Cursos

```astro
---
// src/pages/cursos.astro
import Layout from "@/layout.astro";
import { mainSchema, pageSchemas } from "@/lib/schemas";

// Crie o schema específico da página
const cursosSchema = pageSchemas.cursos({
    name: "Cursos de CNH - Autoescola Danda",
    description: "Cursos para habilitação categoria A e B com alta taxa de aprovação",
    image: "https://autoescoladanda.com.br/cursos-image.png"
});
---

<Layout title="Cursos | Autoescola Danda">
    <!-- Script adicional para o schema da página -->
    <script type="application/ld+json" set:html={JSON.stringify(cursosSchema)}></script>
    
    <!-- Seu conteúdo aqui -->
</Layout>
```

#### Exemplo: Página de Planos

```astro
---
// src/pages/planos.astro
import Layout from "@/layout.astro";
import { pageSchemas } from "@/lib/schemas";

const planosSchema = pageSchemas.planos({
    name: "Planos de Cursos - Autoescola Danda",
    description: "Escolha o plano perfeito para você"
});
---

<Layout title="Planos | Autoescola Danda">
    <script type="application/ld+json" set:html={JSON.stringify(planosSchema)}></script>
    <!-- Seu conteúdo aqui -->
</Layout>
```

### 3. Adicionar Rating (Avaliações)

Quando tiver avaliações reais, use a função `addRatingToSchema`:

```astro
---
import { mainSchema, addRatingToSchema } from "@/lib/schemas";

// Adicionar rating ao schema principal
const schemaComRating = addRatingToSchema(mainSchema, 4.9, 500);
---

<script type="application/ld+json" set:html={JSON.stringify(schemaComRating)}></script>
```

### 4. Adicionar Avaliação Individual

```astro
---
import { createReviewSchema } from "@/lib/schemas";

const review = createReviewSchema(
    "João Silva",
    5,
    "Excelente autoescola! Passei na primeira vez."
);
---

<script type="application/ld+json" set:html={JSON.stringify(review)}></script>
```

## 📝 Schemas Disponíveis

### `mainSchema`
- **Tipo**: DrivingSchool (LocalBusiness)
- **Uso**: Automático em todas as páginas
- **Contém**: Informações gerais da empresa, endereço, telefone, horários, etc.

### `pageSchemas.cursos(data?)`
- **Tipo**: Course
- **Uso**: Página de cursos

### `pageSchemas.planos(data?)`
- **Tipo**: Service
- **Uso**: Página de planos

### `pageSchemas.transporteEscolar(data?)`
- **Tipo**: Service
- **Uso**: Página de transporte escolar

### `pageSchemas.transporteColetivo(data?)`
- **Tipo**: Service
- **Uso**: Página de transporte coletivo

### `pageSchemas.transporteEmergencial(data?)`
- **Tipo**: Service
- **Uso**: Página de transporte emergencial

### `pageSchemas.cargasIndivisiveis(data?)`
- **Tipo**: Service
- **Uso**: Página de cargas indivisíveis

### `pageSchemas.mopp(data?)`
- **Tipo**: Service
- **Uso**: Página MOPP

## 🔧 Funções Auxiliares

### `addRatingToSchema(schema, ratingValue, reviewCount)`
Adiciona AggregateRating a um schema existente.

```typescript
const schemaComRating = addRatingToSchema(mainSchema, 4.8, 127);
```

### `createReviewSchema(author, reviewRating, reviewBody)`
Cria um schema de avaliação individual.

```typescript
const review = createReviewSchema(
    "Maria Silva",
    5,
    "Melhor autoescola da região!"
);
```

## 🎯 Próximos Passos

1. ✅ Arquivo de configuração criado
2. ✅ Layout refatorado
3. ⏳ Adicionar schemas específicos em cada página
4. ⏳ Configurar ratings quando tiver dados reais

## 📚 Referências

- [Schema.org Documentation](https://schema.org/)
- [Google Rich Results Documentation](https://developers.google.com/search/docs/beginner/structured-data)
