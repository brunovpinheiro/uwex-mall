# UWEX Mall - Shopping Center Website

Site institucional e comercial completo para shopping center, desenvolvido com Next.js 14+, Strapi CMS e arquitetura modular.

## Tecnologias

- **Framework**: Next.js 14+ (App Router, React Server Components)
- **UI Library**: ShadCN UI (Radix UI + Tailwind CSS)
- **CMS**: Strapi 4.x (Headless CMS)
- **Linguagem**: TypeScript 5+
- **Estilização**: Tailwind CSS 3+
- **Validação**: Zod
- **Cache**: Next.js Cache Strategy

## Estrutura do Projeto

```
uwex-mall/
├── app/                      # Páginas e rotas (App Router)
│   ├── (modules)/            # Módulos do site
│   │   ├── lojas/           # Sistema de lojas
│   │   ├── blog/            # Blog de notícias
│   │   ├── eventos/         # Agenda de eventos
│   │   ├── cinema/          # Programação de cinema
│   │   ├── vitrine-virtual/ # Vitrine de produtos
│   │   └── comodidades/     # Serviços e comodidades
│   ├── (pages)/             # Páginas institucionais
│   └── api/                 # API Routes
├── components/              # Componentes React
│   ├── ui/                  # Componentes UI base (ShadCN)
│   ├── layout/              # Header, Footer, Navigation
│   ├── modules/             # Componentes específicos dos módulos
│   ├── sections/            # Seções do Page Builder
│   └── common/              # Componentes compartilhados
├── lib/                     # Bibliotecas e utilitários
│   ├── strapi/             # Cliente e queries do Strapi
│   ├── ingresso/           # Integração Ingresso.com
│   ├── feature-flags/      # Sistema de feature flags
│   ├── utils/              # Utilitários gerais
│   └── validations/        # Schemas Zod
├── types/                   # Definições TypeScript
├── config/                  # Arquivos de configuração
├── public/                  # Arquivos estáticos
└── styles/                  # Estilos globais
```

## Módulos Principais

### 1. Sistema de Lojas
- Listagem de lojas com filtros por categoria e piso
- Página de detalhes com informações completas
- Galeria de imagens
- Links para redes sociais e contato

### 2. Blog
- Posts com rich text e galeria de imagens
- Categorias e tags
- SEO otimizado para artigos
- Sistema de destaque

### 3. Eventos
- Agenda de eventos com filtros
- Informações de data, horário e local
- Inscrições e links externos
- Eventos gratuitos e pagos

### 4. Cinema (Integração Ingresso.com)
- Filmes em cartaz e em breve
- Sessões e horários
- Link direto para compra de ingressos
- Detalhes completos dos filmes

### 5. Vitrine Virtual
- Produtos das lojas
- Filtros por categoria, loja e preço
- Sistema de promoções

### 6. Page Builder
- Sistema de seções dinâmicas
- Páginas institucionais customizáveis
- Componentes reutilizáveis

## Configuração

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar Variáveis de Ambiente

Copie o arquivo `.env.local.example` para `.env.local` e configure:

```bash
cp .env.local.example .env.local
```

Edite o `.env.local` com suas configurações:

```env
# Next.js
NEXT_PUBLIC_SITE_NAME="Seu Shopping"
NEXT_PUBLIC_SITE_URL="https://seu-dominio.com.br"

# Strapi
NEXT_PUBLIC_STRAPI_URL="http://localhost:1337"
STRAPI_API_TOKEN="seu-token-strapi"

# Ingresso.com (opcional)
INGRESSO_API_URL="https://api.ingresso.com/v1"
INGRESSO_API_KEY="sua-chave-api"
INGRESSO_CINEMA_ID="id-do-cinema"

# Email (opcional)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="seu-email@gmail.com"
SMTP_PASSWORD="sua-senha"
CONTACT_EMAIL="contato@shopping.com.br"

# Webhooks
WEBHOOK_SECRET="sua-chave-secreta"
```

### 3. Executar o Projeto

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Iniciar produção
npm start

# Verificar tipos TypeScript
npm run type-check

# Formatar código
npm run format
```

O site estará disponível em `http://localhost:3000`

## Sistema de Feature Flags

Os módulos podem ser ativados/desativados através do Strapi CMS na collection `module-config`:

- **Lojas**: Sempre ativo (core)
- **Blog**: Opcional
- **Eventos**: Opcional
- **Cinema**: Opcional
- **Vitrine Virtual**: Opcional
- **Comodidades**: Opcional

## Integração com Strapi

### Collections Types Necessários

1. **dados-gerais** (Single Type)
   - Horários de funcionamento
   - Informações de estacionamento
   - Contatos e localização
   - Redes sociais

2. **lojas** (Collection)
   - Nome, logo, descrição
   - Categoria e localização
   - Contatos e redes sociais
   - Galeria de imagens

3. **categorias-lojas** (Collection)
   - Nome e slug
   - Ícone (opcional)

4. **posts** (Collection)
   - Título, conteúdo, imagem
   - Categoria, autor, data
   - SEO metadata

5. **eventos** (Collection)
   - Nome, descrição, imagens
   - Data/hora, local
   - Tipo e categoria

6. **produtos** (Collection)
   - Nome, descrição, preço
   - Imagens e categoria
   - Relação com loja

7. **paginas-institucionais** (Collection)
   - Título, slug
   - Seções dinâmicas (Dynamic Zone)
   - SEO metadata

8. **module-config** (Single Type)
   - Flags de ativação dos módulos

## Cache e Revalidação

O projeto utiliza estratégias de cache do Next.js:

- **Dados Gerais**: 1 hora (3600s)
- **Lojas**: 30 minutos (1800s)
- **Blog**: 30 minutos (1800s)
- **Eventos**: 15 minutos (900s)
- **Module Config**: 5 minutos (300s)

### Revalidação On-Demand

Para revalidar o cache após mudanças no Strapi:

```bash
POST /api/revalidate
Content-Type: application/json

{
  "tag": "lojas",
  "secret": "seu-webhook-secret"
}
```

## SEO

### Metadata Dinâmica
- Títulos e descrições por página
- Open Graph images
- Twitter Cards
- Keywords

### Sitemap
Gerado automaticamente em `/sitemap.xml` incluindo:
- Páginas estáticas
- Lojas
- Posts do blog
- Eventos

### Robots.txt
Configurado em `/robots.txt`

### Structured Data (Schema.org)
- Organization schema para o shopping
- Article schema para posts
- Event schema para eventos

## Formulários

### Formulários Disponíveis

1. **Contato**: `/api/forms/contato`
2. **Comercialização**: `/api/forms/comercializacao`
3. **Merchandising**: `/api/forms/merchandising`
4. **Newsletter**: `/api/newsletter`

Todos os formulários incluem:
- Validação com Zod
- Sanitização de dados
- Proteção contra spam
- Mensagens de sucesso/erro

## Deployment

### Vercel (Recomendado)

```bash
npm install -g vercel
vercel
```

### Docker (Opcional)

```bash
docker build -t uwex-mall .
docker run -p 3000:3000 uwex-mall
```

## Desenvolvimento

### Estrutura de Componentes

- Use componentes do ShadCN UI como base
- Siga o padrão de nomenclatura: `nome-do-componente.tsx`
- Componentes de módulo em `components/modules/[modulo]/`
- Seções de página em `components/sections/`

### Boas Práticas

1. **TypeScript**: Sempre tipado
2. **Server Components**: Use quando possível
3. **Client Components**: Apenas quando necessário ('use client')
4. **Imagens**: Sempre use next/image
5. **Links**: Sempre use next/link
6. **SEO**: Inclua metadata em todas as páginas

## Suporte

Para dúvidas ou problemas:
- Documentação: Ver `spec.md`
- Issues: Abra uma issue no repositório
- Email: contato@shopping.com.br

## Licença

Propriedade privada - Todos os direitos reservados

---

**Versão**: 1.0.0
**Data**: Janeiro 2026
**Desenvolvido com**: Next.js + Strapi + TypeScript
