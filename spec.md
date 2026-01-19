# Especificação Técnica - Site Shopping Center

## 1. Visão Geral

### 1.1 Propósito
Este documento especifica a implementação técnica de um site institucional e comercial para shopping center, utilizando arquitetura modular com Next.js 14+ e Strapi CMS.

### 1.2 Tecnologias Core
- **Framework**: Next.js 14+ (App Router, React Server Components)
- **UI Library**: ShadCN UI (Radix UI + Tailwind CSS)
- **CMS**: Strapi 4.x (Headless CMS)
- **Linguagem**: TypeScript 5+
- **Estilização**: Tailwind CSS 3+
- **Validação**: Zod
- **HTTP Client**: Fetch API nativo / Axios
- **Cache**: Next.js Cache + Redis (opcional)

---

## 2. Arquitetura do Sistema

### 2.1 Diagrama de Arquitetura

```
┌─────────────────────────────────────────────────┐
│                   Next.js App                   │
├─────────────────────────────────────────────────┤
│  App Router                                     │
│  ├── (modules)/                                 │
│  │   ├── lojas/                                 │
│  │   ├── blog/                                  │
│  │   ├── eventos/                               │
│  │   ├── cinema/                                │
│  │   ├── vitrine-virtual/                       │
│  │   └── comodidades/                           │
│  ├── (pages)/                                   │
│  │   ├── quem-somos/                            │
│  │   ├── contato/                               │
│  │   ├── comercializacao/                       │
│  │   └── [slug]/                                │
│  └── api/                                       │
│      ├── strapi/                                │
│      ├── cinema/                                │
│      └── forms/                                 │
└─────────────────────────────────────────────────┘
           ↓               ↓
    ┌──────────┐    ┌─────────────┐
    │  Strapi  │    │ Ingresso.com│
    │   CMS    │    │     API     │
    └──────────┘    └─────────────┘
```

### 2.2 Estrutura de Diretórios

```
uwex-mall/
├── app/
│   ├── (modules)/
│   │   ├── lojas/
│   │   │   ├── page.tsx
│   │   │   ├── [slug]/
│   │   │   │   └── page.tsx
│   │   │   └── loading.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx
│   │   │   ├── [slug]/
│   │   │   │   └── page.tsx
│   │   │   └── categoria/[slug]/page.tsx
│   │   ├── eventos/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── cinema/
│   │   │   ├── page.tsx
│   │   │   ├── em-breve/page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── vitrine-virtual/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   └── comodidades/
│   │       └── page.tsx
│   ├── (pages)/
│   │   ├── quem-somos/page.tsx
│   │   ├── contato/page.tsx
│   │   ├── comercializacao/page.tsx
│   │   ├── turismo/page.tsx
│   │   └── [slug]/page.tsx
│   ├── api/
│   │   ├── strapi/[...path]/route.ts
│   │   ├── cinema/
│   │   │   ├── filmes/route.ts
│   │   │   └── sessoes/[id]/route.ts
│   │   ├── forms/
│   │   │   ├── contato/route.ts
│   │   │   ├── comercializacao/route.ts
│   │   │   └── merchandising/route.ts
│   │   └── newsletter/route.ts
│   ├── layout.tsx
│   ├── page.tsx
│   ├── loading.tsx
│   ├── error.tsx
│   └── not-found.tsx
├── components/
│   ├── ui/                    # ShadCN components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── form.tsx
│   │   ├── dialog.tsx
│   │   ├── select.tsx
│   │   ├── accordion.tsx
│   │   └── ...
│   ├── layout/
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   ├── navigation.tsx
│   │   └── search.tsx
│   ├── modules/
│   │   ├── lojas/
│   │   │   ├── loja-card.tsx
│   │   │   ├── loja-filters.tsx
│   │   │   ├── loja-detail.tsx
│   │   │   └── mapa-shopping.tsx
│   │   ├── blog/
│   │   │   ├── post-card.tsx
│   │   │   ├── post-content.tsx
│   │   │   └── post-related.tsx
│   │   ├── eventos/
│   │   │   ├── evento-card.tsx
│   │   │   ├── evento-calendar.tsx
│   │   │   └── evento-detail.tsx
│   │   ├── cinema/
│   │   │   ├── filme-card.tsx
│   │   │   ├── filme-detail.tsx
│   │   │   ├── sessoes-grid.tsx
│   │   │   └── trailer-modal.tsx
│   │   └── vitrine/
│   │       ├── produto-card.tsx
│   │       ├── produto-filters.tsx
│   │       └── produto-detail.tsx
│   ├── sections/              # Page Builder Components
│   │   ├── hero-section.tsx
│   │   ├── grid-numeros.tsx
│   │   ├── beneficios-section.tsx
│   │   ├── galeria-section.tsx
│   │   ├── formulario-section.tsx
│   │   ├── texto-rico-section.tsx
│   │   ├── cta-section.tsx
│   │   ├── video-section.tsx
│   │   └── faq-section.tsx
│   └── common/
│       ├── breadcrumbs.tsx
│       ├── whatsapp-float.tsx
│       ├── newsletter-form.tsx
│       └── loading-skeleton.tsx
├── lib/
│   ├── strapi/
│   │   ├── client.ts
│   │   ├── queries.ts
│   │   ├── types.ts
│   │   └── cache.ts
│   ├── ingresso/
│   │   ├── client.ts
│   │   ├── types.ts
│   │   └── cache.ts
│   ├── feature-flags/
│   │   ├── index.ts
│   │   └── types.ts
│   ├── utils/
│   │   ├── cn.ts              # className merge
│   │   ├── format.ts          # Date, currency formatters
│   │   └── seo.ts             # SEO helpers
│   └── validations/
│       ├── forms.ts           # Zod schemas
│       └── api.ts
├── types/
│   ├── strapi.ts
│   ├── cinema.ts
│   └── modules.ts
├── config/
│   ├── modules.config.ts
│   ├── site.config.ts
│   └── navigation.config.ts
├── public/
│   ├── images/
│   ├── icons/
│   └── fonts/
├── styles/
│   └── globals.css
├── middleware.ts
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── .env.local.example
└── README.md
```

---

## 3. Especificações do Strapi CMS

### 3.1 Collection Types - Schema Detalhado

#### 3.1.1 Dados Gerais (Single Type: `dados-gerais`)

```typescript
interface DadosGerais {
  id: number;
  horarios: {
    lojas: { abertura: string; fechamento: string };
    gastronomia: { abertura: string; fechamento: string };
    supermercado: { abertura: string; fechamento: string };
    feriados: { abertura: string; fechamento: string };
  };
  estacionamento: {
    valorPrimeiraHora: number;
    valorHoraAdicional: number;
    valorDiaria: number;
    convenios: Convenio[];
  };
  contato: {
    telefone: string;
    whatsapp: string;
    email: string;
    ouvidoria: string;
  };
  localizacao: {
    endereco: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
    latitude: number;
    longitude: number;
    iframeMapa: string;
  };
  redesSociais: {
    instagram?: string;
    facebook?: string;
    youtube?: string;
    linkedin?: string;
  };
}
```

**Campos Strapi:**
- `horarios` - Component (repeatable: false)
  - `lojas` - Component
    - `abertura` - Time
    - `fechamento` - Time
  - `gastronomia` - Component
  - `supermercado` - Component
  - `feriados` - Component
- `estacionamento` - Component
  - `valorPrimeiraHora` - Decimal
  - `valorHoraAdicional` - Decimal
  - `valorDiaria` - Decimal
  - `convenios` - Relation (hasMany Convenios)
- `contato` - Component
  - `telefone` - String
  - `whatsapp` - String
  - `email` - Email
  - `ouvidoria` - String
- `localizacao` - Component
  - `endereco` - String
  - `numero` - String
  - `bairro` - String
  - `cidade` - String
  - `estado` - String (select: UF)
  - `cep` - String
  - `latitude` - Decimal
  - `longitude` - Decimal
  - `iframeMapa` - Text
- `redesSociais` - Component
  - `instagram` - String
  - `facebook` - String
  - `youtube` - String
  - `linkedin` - String

#### 3.1.2 Lojas (Collection: `lojas`)

```typescript
interface Loja {
  id: number;
  nome: string;
  slug: string;
  descricao: string;
  logo: Media;
  galeria: Media[];
  categoria: Categoria;
  localizacao: string;
  piso: 'Térreo' | 'Piso 1' | 'Piso 2' | 'Piso 3';
  telefone?: string;
  whatsapp?: string;
  instagram?: string;
  website?: string;
  horarioCustomizado?: {
    abertura: string;
    fechamento: string;
  };
  destaque: boolean;
  ativo: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}
```

**Campos Strapi:**
- `nome` - String (required, unique)
- `slug` - UID (from: nome)
- `descricao` - Rich Text (Markdown/Blocks)
- `logo` - Media (single image, required)
- `galeria` - Media (multiple images)
- `categoria` - Relation (manyToOne Categorias)
- `localizacao` - String (ex: "Loja 123")
- `piso` - Enumeration [Térreo, Piso 1, Piso 2, Piso 3]
- `telefone` - String
- `whatsapp` - String
- `instagram` - String
- `website` - String (URL)
- `horarioCustomizado` - Component (optional)
  - `abertura` - Time
  - `fechamento` - Time
- `destaque` - Boolean (default: false)
- `ativo` - Boolean (default: true)

**Indexes:**
- `slug` (unique)
- `categoria`
- `destaque`
- `ativo`

#### 3.1.3 Categorias de Lojas (Collection: `categorias-lojas`)

```typescript
interface CategoriaLoja {
  id: number;
  nome: string;
  slug: string;
  icone?: Media;
  ordem: number;
  lojas?: Loja[];
}
```

**Campos:**
- `nome` - String (required, unique)
- `slug` - UID (from: nome)
- `icone` - Media (single image, SVG preferencial)
- `ordem` - Number (default: 0)
- `lojas` - Relation (oneToMany Lojas)

#### 3.1.4 Blog (Collection: `posts`)

```typescript
interface Post {
  id: number;
  titulo: string;
  slug: string;
  conteudo: any; // Rich text blocks
  imagemDestaque: Media;
  galeria?: Media[];
  categoria: CategoriaBlog;
  autor: string;
  dataPublicacao: string;
  tags?: string[];
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string;
    ogImage?: Media;
  };
  destaque: boolean;
  publicado: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}
```

**Campos:**
- `titulo` - String (required)
- `slug` - UID (from: titulo)
- `conteudo` - Rich Text (Blocks)
- `imagemDestaque` - Media (single image, required)
- `galeria` - Media (multiple images)
- `categoria` - Relation (manyToOne CategoriaBlog)
- `autor` - String
- `dataPublicacao` - DateTime
- `tags` - JSON (array of strings)
- `seo` - Component
  - `metaTitle` - String (max 60)
  - `metaDescription` - Text (max 160)
  - `keywords` - String
  - `ogImage` - Media
- `destaque` - Boolean
- `publicado` - Boolean

#### 3.1.5 Eventos (Collection: `eventos`)

```typescript
interface Evento {
  id: number;
  nome: string;
  slug: string;
  descricao: any;
  imagemPrincipal: Media;
  galeria?: Media[];
  dataInicio: string;
  dataFim: string;
  horarioInicio: string;
  horarioFim: string;
  local: string;
  categoria?: string;
  gratuito: boolean;
  linkInscricao?: string;
  destaque: boolean;
  ativo: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}
```

**Campos:**
- `nome` - String (required)
- `slug` - UID (from: nome)
- `descricao` - Rich Text (Blocks)
- `imagemPrincipal` - Media (required)
- `galeria` - Media (multiple)
- `dataInicio` - Date
- `dataFim` - Date
- `horarioInicio` - Time
- `horarioFim` - Time
- `local` - String
- `categoria` - String
- `gratuito` - Boolean (default: true)
- `linkInscricao` - String (URL)
- `destaque` - Boolean
- `ativo` - Boolean

#### 3.1.6 Vitrine Virtual (Collection: `produtos`)

```typescript
interface Produto {
  id: number;
  nome: string;
  slug: string;
  descricao: string;
  preco: number;
  precoPromocional?: number;
  imagemPrincipal: Media;
  galeria?: Media[];
  categoria: CategoriaProduto;
  loja: Loja;
  destaque: boolean;
  ativo: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}
```

**Campos:**
- `nome` - String (required)
- `slug` - UID (from: nome)
- `descricao` - Text
- `preco` - Decimal (required)
- `precoPromocional` - Decimal
- `imagemPrincipal` - Media (required)
- `galeria` - Media (multiple)
- `categoria` - Relation (manyToOne CategoriaProduto)
- `loja` - Relation (manyToOne Lojas)
- `destaque` - Boolean
- `ativo` - Boolean

#### 3.1.7 Comodidades (Collection: `comodidades`)

```typescript
interface Comodidade {
  id: number;
  nome: string;
  slug: string;
  descricao: string;
  icone?: Media;
  localizacao: string;
  ordem: number;
  ativo: boolean;
}
```

#### 3.1.8 Páginas Institucionais (Collection: `paginas-institucionais`)

```typescript
interface PaginaInstitucional {
  id: number;
  titulo: string;
  slug: string;
  template?: string;
  sections: Section[];
  imagemBanner?: Media;
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string;
  };
  publicado: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

type Section =
  | HeroSection
  | GridNumerosSection
  | BeneficiosSection
  | GaleriaSection
  | FormularioSection
  | TextoRicoSection
  | CtaSection
  | VideoSection
  | FaqSection;
```

**Campos:**
- `titulo` - String (required)
- `slug` - UID (from: titulo)
- `template` - Enumeration [padrao, fullwidth, sidebar]
- `sections` - Dynamic Zone (components abaixo)
- `imagemBanner` - Media
- `seo` - Component (SEO)
- `publicado` - Boolean

**Components (Dynamic Zone):**

1. **sections.hero**
   - `titulo` - String
   - `subtitulo` - String
   - `texto` - Text
   - `imagem` - Media
   - `video` - Media (optional)
   - `cta` - Component
     - `texto` - String
     - `link` - String
     - `estilo` - Enum [primary, secondary, outline]

2. **sections.grid-numeros**
   - `titulo` - String (optional)
   - `items` - Component (repeatable)
     - `numero` - String
     - `sufixo` - String
     - `descricao` - String
     - `destaque` - Boolean

3. **sections.beneficios**
   - `titulo` - String
   - `cards` - Component (repeatable)
     - `icone` - Media
     - `titulo` - String
     - `descricao` - Text
     - `link` - String
     - `destaque` - Boolean

4. **sections.galeria**
   - `titulo` - String (optional)
   - `imagens` - Media (multiple)
   - `tipo` - Enum [grid, slider, masonry]

5. **sections.formulario**
   - `tipo` - Enum [contato, comercializacao, merchandising]
   - `titulo` - String
   - `descricao` - Text
   - `emailDestino` - Email
   - `mensagemSucesso` - String

6. **sections.texto-rico**
   - `conteudo` - Rich Text (Blocks)

7. **sections.cta**
   - `titulo` - String
   - `descricao` - Text
   - `botaoPrimario` - Component (CTA)
   - `botaoSecundario` - Component (CTA)
   - `imagemFundo` - Media

8. **sections.video**
   - `titulo` - String (optional)
   - `urlVideo` - String (YouTube/Vimeo)
   - `thumbnail` - Media

9. **sections.faq**
   - `titulo` - String
   - `items` - Component (repeatable)
     - `pergunta` - String
     - `resposta` - Rich Text

#### 3.1.9 Configurações Cinema (Single Type: `cinema-config`)

```typescript
interface CinemaConfig {
  cinemaId: string;
  apiToken: string;
  atualizacaoAutomatica: boolean;
  intervaloAtualizacao: number; // minutes
  exibirEmBreve: boolean;
  diasExibicao: number;
  ativo: boolean;
}
```

#### 3.1.10 Configurações de Módulos (Single Type: `module-config`)

```typescript
interface ModuleConfig {
  moduloLojas: boolean;      // sempre true
  moduloBlog: boolean;
  moduloEventos: boolean;
  moduloCinema: boolean;
  moduloVitrineVirtual: boolean;
  moduloComodidades: boolean;
}
```

---

## 4. API Strapi - Endpoints

### 4.1 Estrutura de Resposta

Todas as respostas do Strapi seguem o padrão:

```typescript
interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

interface StrapiEntity<T> {
  id: number;
  attributes: T & {
    createdAt: string;
    updatedAt: string;
    publishedAt?: string;
  };
}
```

### 4.2 Queries Principais

```typescript
// lib/strapi/queries.ts

// Dados Gerais
export async function getDadosGerais() {
  return strapi.get('/api/dados-gerais', {
    populate: ['horarios', 'estacionamento', 'contato', 'localizacao', 'redesSociais']
  });
}

// Lojas
export async function getLojas(params?: {
  categoria?: string;
  piso?: string;
  destaque?: boolean;
  search?: string;
  page?: number;
  pageSize?: number;
}) {
  return strapi.get('/api/lojas', {
    populate: ['logo', 'categoria'],
    filters: {
      categoria: { slug: { $eq: params?.categoria } },
      piso: { $eq: params?.piso },
      destaque: { $eq: params?.destaque },
      ativo: { $eq: true },
      $or: params?.search ? [
        { nome: { $containsi: params.search } },
        { descricao: { $containsi: params.search } }
      ] : undefined
    },
    pagination: {
      page: params?.page || 1,
      pageSize: params?.pageSize || 12
    },
    sort: ['destaque:desc', 'nome:asc']
  });
}

export async function getLojaBySlug(slug: string) {
  return strapi.get('/api/lojas', {
    filters: { slug: { $eq: slug } },
    populate: ['logo', 'galeria', 'categoria', 'horarioCustomizado']
  }).then(res => res.data[0]);
}

// Blog
export async function getPosts(params?: {
  categoria?: string;
  tag?: string;
  destaque?: boolean;
  page?: number;
}) {
  return strapi.get('/api/posts', {
    populate: ['imagemDestaque', 'categoria', 'seo'],
    filters: {
      publicado: { $eq: true },
      categoria: { slug: { $eq: params?.categoria } },
      destaque: { $eq: params?.destaque },
      tags: params?.tag ? { $contains: params.tag } : undefined
    },
    pagination: { page: params?.page || 1, pageSize: 12 },
    sort: ['dataPublicacao:desc']
  });
}

export async function getPostBySlug(slug: string) {
  return strapi.get('/api/posts', {
    filters: { slug: { $eq: slug }, publicado: { $eq: true } },
    populate: ['imagemDestaque', 'galeria', 'categoria', 'seo']
  }).then(res => res.data[0]);
}

// Eventos
export async function getEventos(params?: {
  categoria?: string;
  dataInicio?: string;
  destaque?: boolean;
}) {
  return strapi.get('/api/eventos', {
    populate: ['imagemPrincipal'],
    filters: {
      ativo: { $eq: true },
      categoria: { $eq: params?.categoria },
      destaque: { $eq: params?.destaque },
      dataFim: { $gte: new Date().toISOString() }
    },
    sort: ['dataInicio:asc']
  });
}

// Produtos (Vitrine Virtual)
export async function getProdutos(params?: {
  categoria?: string;
  loja?: string;
  precoMin?: number;
  precoMax?: number;
  page?: number;
}) {
  return strapi.get('/api/produtos', {
    populate: ['imagemPrincipal', 'categoria', 'loja'],
    filters: {
      ativo: { $eq: true },
      categoria: { slug: { $eq: params?.categoria } },
      loja: { slug: { $eq: params?.loja } },
      preco: {
        $gte: params?.precoMin,
        $lte: params?.precoMax
      }
    },
    pagination: { page: params?.page || 1, pageSize: 12 },
    sort: ['destaque:desc', 'createdAt:desc']
  });
}

// Páginas Institucionais
export async function getPaginaBySlug(slug: string) {
  return strapi.get('/api/paginas-institucionais', {
    filters: { slug: { $eq: slug }, publicado: { $eq: true } },
    populate: {
      sections: { populate: '*' },
      imagemBanner: true,
      seo: true
    }
  }).then(res => res.data[0]);
}

// Module Config
export async function getModuleConfig() {
  return strapi.get('/api/module-config');
}
```

### 4.3 Cache Strategy

```typescript
// lib/strapi/cache.ts

import { cache } from 'react';
import { unstable_cache } from 'next/cache';

// Cache com revalidação automática
export const getCachedDadosGerais = unstable_cache(
  async () => getDadosGerais(),
  ['dados-gerais'],
  { revalidate: 3600, tags: ['dados-gerais'] } // 1 hora
);

export const getCachedLojas = unstable_cache(
  async (params) => getLojas(params),
  ['lojas'],
  { revalidate: 1800, tags: ['lojas'] } // 30 minutos
);

export const getCachedModuleConfig = unstable_cache(
  async () => getModuleConfig(),
  ['module-config'],
  { revalidate: 300, tags: ['module-config'] } // 5 minutos
);

// Para revalidação on-demand
// app/api/revalidate/route.ts
export async function POST(request: Request) {
  const { tag } = await request.json();

  if (request.headers.get('x-webhook-secret') !== process.env.WEBHOOK_SECRET) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  revalidateTag(tag);
  return Response.json({ revalidated: true, tag });
}
```

---

## 5. Integração Ingresso.com

### 5.1 API Client

```typescript
// lib/ingresso/client.ts

interface IngressoConfig {
  cinemaId: string;
  apiKey: string;
  baseUrl: string;
}

export class IngressoClient {
  constructor(private config: IngressoConfig) {}

  async getFilmesEmCartaz(): Promise<Filme[]> {
    const response = await fetch(
      `${this.config.baseUrl}/cinema/${this.config.cinemaId}/filmes-em-cartaz`,
      {
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json'
        },
        next: { revalidate: 1800 } // 30 min cache
      }
    );

    if (!response.ok) {
      throw new Error('Falha ao buscar filmes');
    }

    return response.json();
  }

  async getFilmeById(id: string): Promise<FilmeDetalhado> {
    const response = await fetch(
      `${this.config.baseUrl}/filmes/${id}`,
      {
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`
        },
        next: { revalidate: 1800 }
      }
    );

    return response.json();
  }

  async getSessoesByFilme(filmeId: string, data?: string): Promise<Sessao[]> {
    const dataParam = data || new Date().toISOString().split('T')[0];

    const response = await fetch(
      `${this.config.baseUrl}/cinema/${this.config.cinemaId}/filmes/${filmeId}/sessoes?data=${dataParam}`,
      {
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`
        },
        next: { revalidate: 900 } // 15 min cache
      }
    );

    return response.json();
  }

  async getProgramacao(dataInicio: string, dataFim: string): Promise<Programacao> {
    const response = await fetch(
      `${this.config.baseUrl}/cinema/${this.config.cinemaId}/programacao?inicio=${dataInicio}&fim=${dataFim}`,
      {
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`
        },
        next: { revalidate: 1800 }
      }
    );

    return response.json();
  }
}

export const ingressoClient = new IngressoClient({
  cinemaId: process.env.INGRESSO_CINEMA_ID!,
  apiKey: process.env.INGRESSO_API_KEY!,
  baseUrl: process.env.INGRESSO_API_URL || 'https://api.ingresso.com/v1'
});
```

### 5.2 Tipos

```typescript
// lib/ingresso/types.ts

export interface Filme {
  id: string;
  titulo: string;
  tituloOriginal?: string;
  sinopse: string;
  classificacao: string;
  duracao: number; // minutos
  generos: string[];
  diretor: string;
  elenco: string[];
  poster: string;
  backdrop?: string;
  trailerUrl?: string;
  emCartaz: boolean;
  emBreve: boolean;
  estreia: string;
}

export interface FilmeDetalhado extends Filme {
  distribuidora: string;
  pais: string;
  ano: number;
  avaliacaoIMDB?: number;
  avaliacaoRottenTomatoes?: number;
}

export interface Sessao {
  id: string;
  filmeId: string;
  data: string;
  horario: string;
  sala: string;
  tipoSala: 'Normal' | '3D' | 'IMAX' | 'VIP';
  audio: 'Legendado' | 'Dublado';
  precos: {
    inteira: number;
    meia: number;
  };
  assentosDisponiveis: number;
  linkCompra: string;
}

export interface Programacao {
  cinema: {
    id: string;
    nome: string;
  };
  periodo: {
    inicio: string;
    fim: string;
  };
  filmes: Array<{
    filme: Filme;
    sessoes: Sessao[];
  }>;
}
```

### 5.3 API Routes

```typescript
// app/api/cinema/filmes/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { ingressoClient } from '@/lib/ingresso/client';
import { getCinemaConfig } from '@/lib/strapi/queries';

export async function GET(request: NextRequest) {
  try {
    const config = await getCinemaConfig();

    if (!config.ativo) {
      return NextResponse.json(
        { error: 'Módulo de cinema desativado' },
        { status: 404 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const tipo = searchParams.get('tipo') || 'em-cartaz';

    const filmes = tipo === 'em-breve'
      ? await ingressoClient.getFilmesEmBreve()
      : await ingressoClient.getFilmesEmCartaz();

    return NextResponse.json(filmes);
  } catch (error) {
    console.error('Erro ao buscar filmes:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar filmes' },
      { status: 500 }
    );
  }
}
```

```typescript
// app/api/cinema/sessoes/[id]/route.ts

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const data = searchParams.get('data');

    const sessoes = await ingressoClient.getSessoesByFilme(params.id, data || undefined);

    return NextResponse.json(sessoes);
  } catch (error) {
    console.error('Erro ao buscar sessões:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar sessões' },
      { status: 500 }
    );
  }
}
```

---

## 6. Sistema de Feature Flags

### 6.1 Implementação

```typescript
// lib/feature-flags/index.ts

import { getCachedModuleConfig } from '@/lib/strapi/cache';

export type ModuleName =
  | 'lojas'
  | 'blog'
  | 'eventos'
  | 'cinema'
  | 'vitrineVirtual'
  | 'comodidades';

export interface FeatureFlags {
  lojas: boolean;
  blog: boolean;
  eventos: boolean;
  cinema: boolean;
  vitrineVirtual: boolean;
  comodidades: boolean;
}

export async function getFeatureFlags(): Promise<FeatureFlags> {
  const config = await getCachedModuleConfig();

  return {
    lojas: true, // sempre ativo
    blog: config.moduloBlog,
    eventos: config.moduloEventos,
    cinema: config.moduloCinema,
    vitrineVirtual: config.moduloVitrineVirtual,
    comodidades: config.moduloComodidades,
  };
}

export async function isModuleEnabled(module: ModuleName): Promise<boolean> {
  const flags = await getFeatureFlags();
  return flags[module];
}

export function getModuleRoute(module: ModuleName): string {
  const routes: Record<ModuleName, string> = {
    lojas: '/lojas',
    blog: '/blog',
    eventos: '/eventos',
    cinema: '/cinema',
    vitrineVirtual: '/vitrine-virtual',
    comodidades: '/comodidades',
  };

  return routes[module];
}
```

### 6.2 Middleware

```typescript
// middleware.ts

import { NextRequest, NextResponse } from 'next/server';
import { isModuleEnabled } from '@/lib/feature-flags';

const moduleRoutes: Record<string, string> = {
  '/blog': 'blog',
  '/eventos': 'eventos',
  '/cinema': 'cinema',
  '/vitrine-virtual': 'vitrineVirtual',
  '/comodidades': 'comodidades',
};

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Verificar se a rota é de um módulo
  for (const [route, module] of Object.entries(moduleRoutes)) {
    if (pathname.startsWith(route)) {
      const enabled = await isModuleEnabled(module as any);

      if (!enabled) {
        return NextResponse.redirect(new URL('/404', request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/blog/:path*',
    '/eventos/:path*',
    '/cinema/:path*',
    '/vitrine-virtual/:path*',
    '/comodidades/:path*',
  ],
};
```

### 6.3 Componente de Feature Flag

```typescript
// components/common/feature-guard.tsx

import { isModuleEnabled, ModuleName } from '@/lib/feature-flags';
import { redirect } from 'next/navigation';

interface FeatureGuardProps {
  module: ModuleName;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export async function FeatureGuard({
  module,
  children,
  fallback
}: FeatureGuardProps) {
  const enabled = await isModuleEnabled(module);

  if (!enabled) {
    if (fallback) {
      return <>{fallback}</>;
    }
    redirect('/404');
  }

  return <>{children}</>;
}
```

---

## 7. Sistema de Page Builder

### 7.1 Renderização de Seções

```typescript
// lib/strapi/page-builder.ts

import { PaginaInstitucional } from '@/types/strapi';
import HeroSection from '@/components/sections/hero-section';
import GridNumerosSection from '@/components/sections/grid-numeros';
import BeneficiosSection from '@/components/sections/beneficios-section';
import GaleriaSection from '@/components/sections/galeria-section';
import FormularioSection from '@/components/sections/formulario-section';
import TextoRicoSection from '@/components/sections/texto-rico-section';
import CtaSection from '@/components/sections/cta-section';
import VideoSection from '@/components/sections/video-section';
import FaqSection from '@/components/sections/faq-section';

type SectionComponent = React.ComponentType<any>;

const SECTION_COMPONENTS: Record<string, SectionComponent> = {
  'sections.hero': HeroSection,
  'sections.grid-numeros': GridNumerosSection,
  'sections.beneficios': BeneficiosSection,
  'sections.galeria': GaleriaSection,
  'sections.formulario': FormularioSection,
  'sections.texto-rico': TextoRicoSection,
  'sections.cta': CtaSection,
  'sections.video': VideoSection,
  'sections.faq': FaqSection,
};

export interface Section {
  __component: string;
  id: number;
  [key: string]: any;
}

export function renderSection(section: Section, index: number) {
  const Component = SECTION_COMPONENTS[section.__component];

  if (!Component) {
    console.warn(`Componente não encontrado: ${section.__component}`);
    return null;
  }

  return <Component key={section.id || index} {...section} />;
}

export function renderSections(sections: Section[]) {
  return sections.map((section, index) => renderSection(section, index));
}
```

### 7.2 Exemplo de Componente de Seção

```typescript
// components/sections/hero-section.tsx

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getStrapiMedia } from '@/lib/strapi/utils';

interface HeroSectionProps {
  titulo: string;
  subtitulo?: string;
  texto?: string;
  imagem?: any; // Strapi Media
  video?: any;
  cta?: {
    texto: string;
    link: string;
    estilo: 'primary' | 'secondary' | 'outline';
  };
}

export default function HeroSection({
  titulo,
  subtitulo,
  texto,
  imagem,
  video,
  cta,
}: HeroSectionProps) {
  const mediaUrl = imagem ? getStrapiMedia(imagem) : null;

  return (
    <section className="relative min-h-[500px] flex items-center justify-center overflow-hidden">
      {/* Background */}
      {mediaUrl && (
        <div className="absolute inset-0 z-0">
          <Image
            src={mediaUrl}
            alt={titulo}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      )}

      {/* Content */}
      <div className="container relative z-10 text-white text-center">
        {subtitulo && (
          <p className="text-lg mb-4 font-medium">{subtitulo}</p>
        )}

        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          {titulo}
        </h1>

        {texto && (
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            {texto}
          </p>
        )}

        {cta && (
          <Button
            asChild
            variant={cta.estilo}
            size="lg"
          >
            <Link href={cta.link}>
              {cta.texto}
            </Link>
          </Button>
        )}
      </div>
    </section>
  );
}
```

### 7.3 Página Template

```typescript
// app/(pages)/[slug]/page.tsx

import { notFound } from 'next/navigation';
import { getPaginaBySlug } from '@/lib/strapi/queries';
import { renderSections } from '@/lib/strapi/page-builder';
import { Metadata } from 'next';

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const page = await getPaginaBySlug(params.slug);

  if (!page) {
    return {};
  }

  return {
    title: page.seo?.metaTitle || page.titulo,
    description: page.seo?.metaDescription,
    keywords: page.seo?.keywords,
    openGraph: {
      title: page.seo?.metaTitle || page.titulo,
      description: page.seo?.metaDescription,
      images: page.imagemBanner ? [getStrapiMedia(page.imagemBanner)] : [],
    },
  };
}

export default async function DynamicPage({ params }: PageProps) {
  const page = await getPaginaBySlug(params.slug);

  if (!page || !page.publicado) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      {/* Banner (opcional) */}
      {page.imagemBanner && (
        <div className="relative h-[300px] w-full">
          <Image
            src={getStrapiMedia(page.imagemBanner)}
            alt={page.titulo}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
            <div className="container pb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                {page.titulo}
              </h1>
            </div>
          </div>
        </div>
      )}

      {/* Sections dinâmicas */}
      <div className="page-sections">
        {renderSections(page.sections)}
      </div>
    </main>
  );
}
```

---

## 8. Formulários e Validação

### 8.1 Schemas Zod

```typescript
// lib/validations/forms.ts

import { z } from 'zod';

export const contatoSchema = z.object({
  nome: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('Email inválido'),
  telefone: z.string().min(10, 'Telefone inválido').optional(),
  assunto: z.string().min(5, 'Assunto deve ter no mínimo 5 caracteres'),
  mensagem: z.string().min(10, 'Mensagem deve ter no mínimo 10 caracteres'),
});

export const comercializacaoSchema = z.object({
  nome: z.string().min(3),
  email: z.string().email(),
  telefone: z.string().min(10),
  empresa: z.string().min(2),
  ramo: z.string().min(2),
  area: z.number().positive('Área deve ser maior que 0').optional(),
  mensagem: z.string().min(10),
});

export const merchandisingSchema = z.object({
  nome: z.string().min(3),
  email: z.string().email(),
  telefone: z.string().min(10),
  empresa: z.string().min(2),
  tipoAcao: z.enum(['stand', 'degustacao', 'promocao', 'evento', 'outro']),
  dataDesejada: z.string().optional(),
  descricao: z.string().min(20),
});

export const newsletterSchema = z.object({
  email: z.string().email('Email inválido'),
  nome: z.string().min(2).optional(),
});

export type ContatoFormData = z.infer<typeof contatoSchema>;
export type ComercializacaoFormData = z.infer<typeof comercializacaoSchema>;
export type MerchandisingFormData = z.infer<typeof merchandisingSchema>;
export type NewsletterFormData = z.infer<typeof newsletterSchema>;
```

### 8.2 API Routes de Formulários

```typescript
// app/api/forms/contato/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { contatoSchema } from '@/lib/validations/forms';
import { sendEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validação
    const validatedData = contatoSchema.parse(body);

    // Enviar email
    await sendEmail({
      to: process.env.CONTACT_EMAIL!,
      subject: `[Contato] ${validatedData.assunto}`,
      template: 'contato',
      data: validatedData,
    });

    // Opcional: Salvar no Strapi
    // await strapi.post('/api/contatos', { data: validatedData });

    return NextResponse.json({
      success: true,
      message: 'Mensagem enviada com sucesso!',
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Erro ao enviar contato:', error);
    return NextResponse.json(
      { error: 'Erro ao enviar mensagem' },
      { status: 500 }
    );
  }
}
```

### 8.3 Componente de Formulário

```typescript
// components/forms/contato-form.tsx

'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contatoSchema, ContatoFormData } from '@/lib/validations/forms';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from 'sonner';

export default function ContatoForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContatoFormData>({
    resolver: zodResolver(contatoSchema),
    defaultValues: {
      nome: '',
      email: '',
      telefone: '',
      assunto: '',
      mensagem: '',
    },
  });

  async function onSubmit(data: ContatoFormData) {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/forms/contato', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar formulário');
      }

      toast.success('Mensagem enviada com sucesso!');
      form.reset();
    } catch (error) {
      toast.error('Erro ao enviar mensagem. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Seu nome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="seu@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="telefone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefone (opcional)</FormLabel>
              <FormControl>
                <Input placeholder="(00) 00000-0000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="assunto"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Assunto</FormLabel>
              <FormControl>
                <Input placeholder="Assunto da mensagem" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="mensagem"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mensagem</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Escreva sua mensagem"
                  rows={5}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
        </Button>
      </form>
    </Form>
  );
}
```

---

## 9. SEO e Performance

### 9.1 Metadata Dinâmica

```typescript
// lib/utils/seo.ts

import { Metadata } from 'next';

interface SEOParams {
  title: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
}

export function generateSEO({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
}: SEOParams): Metadata {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Shopping Center';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://shopping.com.br';

  const fullTitle = `${title} | ${siteName}`;
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const ogImage = image || `${siteUrl}/og-image.jpg`;

  return {
    title: fullTitle,
    description: description || `${title} - ${siteName}`,
    keywords: keywords,
    openGraph: {
      title: fullTitle,
      description,
      url: fullUrl,
      siteName,
      images: [{ url: ogImage }],
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: fullUrl,
    },
  };
}
```

### 9.2 Schema.org Markup

```typescript
// components/common/structured-data.tsx

interface OrganizationSchemaProps {
  name: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
  };
  phone: string;
  email: string;
  url: string;
  logo: string;
  socialMedia: string[];
}

export function OrganizationSchema({
  name,
  address,
  phone,
  email,
  url,
  logo,
  socialMedia,
}: OrganizationSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ShoppingCenter',
    name,
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.streetAddress,
      addressLocality: address.addressLocality,
      addressRegion: address.addressRegion,
      postalCode: address.postalCode,
      addressCountry: 'BR',
    },
    telephone: phone,
    email,
    url,
    logo,
    sameAs: socialMedia,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function EventSchema({ evento }: { evento: any }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: evento.nome,
    description: evento.descricao,
    startDate: evento.dataInicio,
    endDate: evento.dataFim,
    location: {
      '@type': 'Place',
      name: evento.local,
    },
    image: evento.imagemPrincipal?.url,
    isAccessibleForFree: evento.gratuito,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

### 9.3 Otimização de Imagens

```typescript
// lib/strapi/utils.ts

export function getStrapiMedia(media: any): string {
  if (!media) return '/placeholder.jpg';

  const imageUrl = media.url || media.data?.attributes?.url;

  if (imageUrl.startsWith('http')) {
    return imageUrl;
  }

  return `${process.env.NEXT_PUBLIC_STRAPI_URL}${imageUrl}`;
}

export function getStrapiImageProps(media: any, sizes?: string) {
  const url = getStrapiMedia(media);
  const formats = media.formats || media.data?.attributes?.formats;

  return {
    src: url,
    width: media.width || media.data?.attributes?.width || 800,
    height: media.height || media.data?.attributes?.height || 600,
    sizes: sizes || '100vw',
    srcSet: formats ? Object.values(formats)
      .map((format: any) => `${getStrapiMedia(format)} ${format.width}w`)
      .join(', ') : undefined,
  };
}
```

### 9.4 Sitemap Dinâmico

```typescript
// app/sitemap.ts

import { MetadataRoute } from 'next';
import { getLojas, getPosts, getEventos } from '@/lib/strapi/queries';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://shopping.com.br';

  // Páginas estáticas
  const staticPages = [
    '',
    '/lojas',
    '/blog',
    '/eventos',
    '/cinema',
    '/vitrine-virtual',
    '/comodidades',
    '/quem-somos',
    '/contato',
    '/comercializacao',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Lojas
  const lojas = await getLojas();
  const lojaPages = lojas.data.map((loja: any) => ({
    url: `${baseUrl}/lojas/${loja.attributes.slug}`,
    lastModified: new Date(loja.attributes.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Posts
  const posts = await getPosts();
  const postPages = posts.data.map((post: any) => ({
    url: `${baseUrl}/blog/${post.attributes.slug}`,
    lastModified: new Date(post.attributes.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Eventos
  const eventos = await getEventos();
  const eventoPages = eventos.data.map((evento: any) => ({
    url: `${baseUrl}/eventos/${evento.attributes.slug}`,
    lastModified: new Date(evento.attributes.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...lojaPages, ...postPages, ...eventoPages];
}
```

---

## 10. Componentes UI Principais

### 10.1 Header

```typescript
// components/layout/header.tsx

'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SearchDialog from './search-dialog';
import MobileNav from './mobile-nav';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img
              src="/logo.svg"
              alt="Shopping"
              className="h-10"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/lojas" className="hover:text-primary">
              Lojas
            </Link>
            <Link href="/blog" className="hover:text-primary">
              Blog
            </Link>
            <Link href="/eventos" className="hover:text-primary">
              Eventos
            </Link>
            <Link href="/cinema" className="hover:text-primary">
              Cinema
            </Link>
            <Link href="/quem-somos" className="hover:text-primary">
              Quem Somos
            </Link>
            <Link href="/contato" className="hover:text-primary">
              Contato
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && <MobileNav onClose={() => setMobileMenuOpen(false)} />}

      {/* Search Dialog */}
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
```

### 10.2 Loja Card

```typescript
// components/modules/lojas/loja-card.tsx

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getStrapiMedia } from '@/lib/strapi/utils';

interface LojaCardProps {
  loja: {
    slug: string;
    nome: string;
    logo: any;
    categoria: {
      nome: string;
    };
    piso: string;
    destaque: boolean;
  };
}

export default function LojaCard({ loja }: LojaCardProps) {
  return (
    <Link href={`/lojas/${loja.slug}`}>
      <Card className="group hover:shadow-lg transition-shadow">
        <CardContent className="p-4">
          <div className="relative aspect-square mb-4 bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={getStrapiMedia(loja.logo)}
              alt={loja.nome}
              fill
              className="object-contain p-4 group-hover:scale-105 transition-transform"
            />
            {loja.destaque && (
              <Badge className="absolute top-2 right-2">
                Destaque
              </Badge>
            )}
          </div>

          <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
            {loja.nome}
          </h3>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{loja.categoria.nome}</span>
            <span>{loja.piso}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
```

---

## 11. Configurações e Variáveis de Ambiente

### 11.1 .env.local.example

```bash
# Next.js
NEXT_PUBLIC_SITE_NAME="Shopping Center"
NEXT_PUBLIC_SITE_URL="https://shopping.com.br"

# Strapi
NEXT_PUBLIC_STRAPI_URL="http://localhost:1337"
STRAPI_API_TOKEN="your-strapi-api-token"

# Ingresso.com
INGRESSO_API_URL="https://api.ingresso.com/v1"
INGRESSO_API_KEY="your-ingresso-api-key"
INGRESSO_CINEMA_ID="your-cinema-id"

# Email
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"
CONTACT_EMAIL="contato@shopping.com.br"

# Analytics
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
NEXT_PUBLIC_META_PIXEL_ID="1234567890"

# Webhooks
WEBHOOK_SECRET="your-webhook-secret"

# Redis (opcional)
REDIS_URL="redis://localhost:6379"
```

### 11.2 next.config.js

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'your-strapi-domain.com',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'api.ingresso.com',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
```

### 11.3 tailwind.config.ts

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
};

export default config;
```

---

## 12. Performance e Otimizações

### 12.1 Checklist de Performance

- [ ] Implementar ISR (Incremental Static Regeneration) para páginas dinâmicas
- [ ] Usar React Server Components quando possível
- [ ] Lazy loading de componentes pesados
- [ ] Otimização de imagens com next/image
- [ ] Code splitting por rota
- [ ] Prefetch de links importantes
- [ ] Cache agressivo de dados do Strapi
- [ ] Implementar Service Worker (PWA)
- [ ] Minimizar JS bundle com tree shaking
- [ ] Critical CSS inline

### 12.2 Configuração de Cache

```typescript
// app/(modules)/lojas/page.tsx

export const revalidate = 1800; // 30 minutos

export default async function LojasPage() {
  const lojas = await getLojas();
  // ...
}
```

```typescript
// app/(modules)/blog/[slug]/page.tsx

export const dynamicParams = true;
export const revalidate = 3600; // 1 hora

export async function generateStaticParams() {
  const posts = await getPosts({ pageSize: 50 });

  return posts.data.map((post: any) => ({
    slug: post.attributes.slug,
  }));
}
```

### 12.3 Loading States

```typescript
// app/(modules)/lojas/loading.tsx

import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="container py-8">
      <Skeleton className="h-12 w-64 mb-8" />

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="aspect-square rounded-lg" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## 13. Testes

### 13.1 Setup de Testes

```json
// package.json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  },
  "devDependencies": {
    "@testing-library/react": "^14.0.0",
    "@testing-library/jest-dom": "^6.1.0",
    "jest": "^29.7.0",
    "jest-environment-jsdom": "^29.7.0"
  }
}
```

### 13.2 Exemplo de Teste

```typescript
// __tests__/components/loja-card.test.tsx

import { render, screen } from '@testing-library/react';
import LojaCard from '@/components/modules/lojas/loja-card';

const mockLoja = {
  slug: 'loja-teste',
  nome: 'Loja Teste',
  logo: { url: '/test-logo.jpg' },
  categoria: { nome: 'Moda' },
  piso: 'Térreo',
  destaque: true,
};

describe('LojaCard', () => {
  it('renders loja information correctly', () => {
    render(<LojaCard loja={mockLoja} />);

    expect(screen.getByText('Loja Teste')).toBeInTheDocument();
    expect(screen.getByText('Moda')).toBeInTheDocument();
    expect(screen.getByText('Térreo')).toBeInTheDocument();
    expect(screen.getByText('Destaque')).toBeInTheDocument();
  });

  it('links to correct loja page', () => {
    render(<LojaCard loja={mockLoja} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/lojas/loja-teste');
  });
});
```

---

## 14. Deploy

### 14.1 Vercel

```bash
# vercel.json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["gru1"]
}
```

### 14.2 Docker (opcional)

```dockerfile
# Dockerfile
FROM node:20-alpine AS base

# Dependencies
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Runner
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
```

---

## 15. Segurança

### 15.1 Rate Limiting

```typescript
// lib/rate-limit.ts

import { NextRequest } from 'next/server';

const rateLimit = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(
  request: NextRequest,
  limit: number = 10,
  windowMs: number = 60000
): boolean {
  const ip = request.ip || 'anonymous';
  const now = Date.now();

  const record = rateLimit.get(ip);

  if (!record || now > record.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= limit) {
    return false;
  }

  record.count++;
  return true;
}
```

### 15.2 CORS

```typescript
// middleware.ts

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // CORS headers
  response.headers.set('Access-Control-Allow-Origin', process.env.NEXT_PUBLIC_SITE_URL!);
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=()'
  );

  return response;
}
```

---

## 16. Monitoramento

### 16.1 Error Tracking (Sentry)

```typescript
// lib/sentry.ts

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
  beforeSend(event) {
    // Filtrar informações sensíveis
    if (event.request) {
      delete event.request.cookies;
      delete event.request.headers;
    }
    return event;
  },
});
```

### 16.2 Analytics

```typescript
// lib/analytics.ts

export function trackEvent(eventName: string, params?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
}

export function trackPageView(url: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID!, {
      page_path: url,
    });
  }
}
```

---

## 17. Acessibilidade

### 17.1 Checklist WCAG 2.1 AA

- [ ] Todos os elementos interativos acessíveis por teclado
- [ ] Contraste mínimo de 4.5:1 para texto normal
- [ ] Contraste mínimo de 3:1 para texto grande
- [ ] Alt text em todas as imagens
- [ ] Labels em todos os inputs
- [ ] Hierarquia de headings correta
- [ ] ARIA labels onde necessário
- [ ] Skip links para navegação
- [ ] Focus visível em todos os elementos
- [ ] Sem flashing content > 3x por segundo

### 17.2 Componente Acessível

```typescript
// components/ui/accessible-button.tsx

import { forwardRef } from 'react';
import { Button, ButtonProps } from './button';

interface AccessibleButtonProps extends ButtonProps {
  ariaLabel?: string;
  loading?: boolean;
}

export const AccessibleButton = forwardRef<HTMLButtonElement, AccessibleButtonProps>(
  ({ ariaLabel, loading, children, disabled, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        aria-label={ariaLabel}
        aria-busy={loading}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <span className="sr-only">Carregando...</span>
            <span aria-hidden="true">{children}</span>
          </>
        ) : (
          children
        )}
      </Button>
    );
  }
);

AccessibleButton.displayName = 'AccessibleButton';
```

---

## 18. Documentação de Dependências

### 18.1 package.json

```json
{
  "name": "uwex-mall",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "format": "prettier --write ."
  },
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "@radix-ui/react-accordion": "^1.1.2",
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-dropdown-menu": "^2.0.6",
    "@radix-ui/react-label": "^2.0.2",
    "@radix-ui/react-select": "^2.0.0",
    "@radix-ui/react-slot": "^1.0.2",
    "@hookform/resolvers": "^3.3.4",
    "react-hook-form": "^7.51.0",
    "zod": "^3.22.4",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.2",
    "tailwindcss-animate": "^1.0.7",
    "lucide-react": "^0.363.0",
    "date-fns": "^3.6.0",
    "sonner": "^1.4.3"
  },
  "devDependencies": {
    "@types/node": "^20.11.30",
    "@types/react": "^18.2.73",
    "@types/react-dom": "^18.2.23",
    "typescript": "^5.4.3",
    "tailwindcss": "^3.4.1",
    "postcss": "^8.4.38",
    "autoprefixer": "^10.4.19",
    "eslint": "^8.57.0",
    "eslint-config-next": "^14.2.0",
    "prettier": "^3.2.5",
    "prettier-plugin-tailwindcss": "^0.5.13"
  }
}
```

---

## 19. Cronograma de Implementação

### Fase 1: Setup Inicial (Semana 1)
- Configurar projeto Next.js
- Instalar ShadCN UI
- Configurar Strapi
- Definir collections types
- Setup de variáveis de ambiente

### Fase 2: Core Features (Semanas 2-3)
- Implementar módulo de Lojas
- Sistema de feature flags
- Layout base (Header/Footer)
- Integração Strapi
- Sistema de cache

### Fase 3: Módulos Adicionais (Semanas 4-5)
- Módulo Blog
- Módulo Eventos
- Módulo Cinema (Ingresso.com)
- Vitrine Virtual
- Comodidades

### Fase 4: Page Builder (Semana 6)
- Componentes de seção
- Sistema de renderização dinâmica
- Páginas institucionais

### Fase 5: SEO e Performance (Semana 7)
- Metadata dinâmica
- Schema.org
- Sitemap
- Otimização de imagens
- Performance tuning

### Fase 6: Testes e Deploy (Semana 8)
- Testes unitários
- Testes de integração
- Deploy Strapi
- Deploy Next.js
- Documentação final

---

## 20. Manutenção e Suporte

### 20.1 Procedimentos de Backup
- Backup diário automático do Strapi (database + uploads)
- Versionamento de código no Git
- Snapshots semanais do ambiente de produção

### 20.2 Monitoramento
- Uptime monitoring (UptimeRobot ou similar)
- Error tracking (Sentry)
- Performance monitoring (Vercel Analytics)
- Logs centralizados

### 20.3 Atualizações
- Atualização mensal de dependências (security patches)
- Atualização trimestral de versões maiores
- Testes em ambiente de staging antes de produção

---

**Versão**: 1.0
**Data**: Janeiro 2026
**Autor**: Equipe de Desenvolvimento
**Status**: Aprovado
