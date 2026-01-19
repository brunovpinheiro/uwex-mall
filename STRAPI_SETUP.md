# Guia de Configuração do Strapi CMS

Este documento fornece instruções detalhadas para configurar o Strapi CMS para o projeto UWEX Mall.

## Criação das Collection Types

### 1. Dados Gerais (Single Type)

**Nome**: `dados-gerais`

**Campos**:

#### Componente: horarios

- **lojas** (Component)
  - abertura (Time)
  - fechamento (Time)
- **gastronomia** (Component)
  - abertura (Time)
  - fechamento (Time)
- **supermercado** (Component)
  - abertura (Time)
  - fechamento (Time)
- **feriados** (Component)
  - abertura (Time)
  - fechamento (Time)

#### Componente: estacionamento

- **valorPrimeiraHora** (Decimal)
- **valorHoraAdicional** (Decimal)
- **valorDiaria** (Decimal)

#### Componente: contato

- **telefone** (Text)
- **whatsapp** (Text)
- **email** (Email)
- **ouvidoria** (Text)

#### Componente: localizacao

- **endereco** (Text)
- **numero** (Text)
- **bairro** (Text)
- **cidade** (Text)
- **estado** (Enumeration: UF)
- **cep** (Text)
- **latitude** (Decimal)
- **longitude** (Decimal)
- **iframeMapa** (Rich Text)

#### Componente: redesSociais

- **instagram** (Text)
- **facebook** (Text)
- **youtube** (Text)
- **linkedin** (Text)

---

### 2. Categorias de Lojas (Collection)

**Nome**: `categorias-lojas`

**Campos**:

- **nome** (Text) - Required, Unique
- **slug** (UID) - Attached to: nome
- **icone** (Media - Single image)
- **ordem** (Number) - Default: 0

**Configurações**:

- Enable draft/publish: Yes
- Enable i18n: Optional

---

### 3. Lojas (Collection)

**Nome**: `lojas`

**Campos**:

- **nome** (Text) - Required
- **slug** (UID) - Attached to: nome
- **descricao** (Rich Text - Blocks)
- **logo** (Media - Single image) - Required
- **galeria** (Media - Multiple images)
- **categoria** (Relation - Many to One with categorias-lojas)
- **localizacao** (Text) - Ex: "Loja 123"
- **piso** (Enumeration)
  - Options: Térreo, Piso 1, Piso 2, Piso 3
- **telefone** (Text)
- **whatsapp** (Text)
- **instagram** (Text)
- **website** (Text)

#### Component: horarioCustomizado (Optional)

- **abertura** (Time)
- **fechamento** (Time)

- **destaque** (Boolean) - Default: false
- **ativo** (Boolean) - Default: true

**Indexes**: slug (unique)

---

### 4. Categorias Blog (Collection)

**Nome**: `categorias-blog`

**Campos**:

- **nome** (Text) - Required, Unique
- **slug** (UID) - Attached to: nome
- **ordem** (Number)

---

### 5. Posts (Collection)

**Nome**: `posts`

**Campos**:

- **titulo** (Text) - Required
- **slug** (UID) - Attached to: titulo
- **conteudo** (Rich Text - Blocks)
- **imagemDestaque** (Media - Single image) - Required
- **galeria** (Media - Multiple images)
- **categoria** (Relation - Many to One with categorias-blog)
- **autor** (Text)
- **dataPublicacao** (DateTime) - Default: now
- **tags** (JSON)

#### Component: seo

- **metaTitle** (Text - Max 60 chars)
- **metaDescription** (Text - Max 160 chars)
- **keywords** (Text)
- **ogImage** (Media - Single image)

- **destaque** (Boolean) - Default: false
- **publicado** (Boolean) - Default: false

---

### 6. Eventos (Collection)

**Nome**: `eventos`

**Campos**:

- **nome** (Text) - Required
- **slug** (UID) - Attached to: nome
- **descricao** (Rich Text - Blocks)
- **imagemPrincipal** (Media - Single image) - Required
- **galeria** (Media - Multiple images)
- **dataInicio** (Date)
- **dataFim** (Date)
- **horarioInicio** (Time)
- **horarioFim** (Time)
- **local** (Text)
- **categoria** (Text)
- **gratuito** (Boolean) - Default: true
- **linkInscricao** (Text - URL)
- **destaque** (Boolean) - Default: false
- **ativo** (Boolean) - Default: true

---

### 7. Categorias Produtos (Collection)

**Nome**: `categorias-produtos`

**Campos**:

- **nome** (Text) - Required, Unique
- **slug** (UID) - Attached to: nome

---

### 8. Produtos (Collection)

**Nome**: `produtos`

**Campos**:

- **nome** (Text) - Required
- **slug** (UID) - Attached to: nome
- **descricao** (Text)
- **preco** (Decimal) - Required
- **precoPromocional** (Decimal)
- **imagemPrincipal** (Media - Single image) - Required
- **galeria** (Media - Multiple images)
- **categoria** (Relation - Many to One with categorias-produtos)
- **loja** (Relation - Many to One with lojas)
- **destaque** (Boolean) - Default: false
- **ativo** (Boolean) - Default: true

---

### 9. Comodidades (Collection)

**Nome**: `comodidades`

**Campos**:

- **nome** (Text) - Required
- **slug** (UID) - Attached to: nome
- **descricao** (Text)
- **icone** (Media - Single image)
- **localizacao** (Text)
- **ordem** (Number) - Default: 0
- **ativo** (Boolean) - Default: true

---

### 10. Páginas Institucionais (Collection)

**Nome**: `paginas-institucionais`

**Campos**:

- **titulo** (Text) - Required
- **slug** (UID) - Attached to: titulo
- **template** (Enumeration)
  - Options: padrao, fullwidth, sidebar
- **sections** (Dynamic Zone)
  - Componentes:
    - sections.hero
    - sections.grid-numeros
    - sections.beneficios
    - sections.texto-rico
    - sections.cta
- **imagemBanner** (Media - Single image)

#### Component: seo

- **metaTitle** (Text)
- **metaDescription** (Text)
- **keywords** (Text)

- **publicado** (Boolean) - Default: false

---

### 11. Module Config (Single Type)

**Nome**: `module-config`

**Campos**:

- **moduloLojas** (Boolean) - Default: true
- **moduloBlog** (Boolean) - Default: false
- **moduloEventos** (Boolean) - Default: false
- **moduloCinema** (Boolean) - Default: false
- **moduloVitrineVirtual** (Boolean) - Default: false
- **moduloComodidades** (Boolean) - Default: false

---

### 12. Cinema Config (Single Type)

**Nome**: `cinema-config`

**Campos**:

- **cinemaId** (Text)
- **apiToken** (Text)
- **atualizacaoAutomatica** (Boolean) - Default: false
- **intervaloAtualizacao** (Number) - Default: 30
- **exibirEmBreve** (Boolean) - Default: true
- **diasExibicao** (Number) - Default: 7
- **ativo** (Boolean) - Default: false

---

## Configuração de Componentes

### Component: seo (Shared)

**Campos**:

- **metaTitle** (Text - Max 60)
- **metaDescription** (Text - Max 160)
- **keywords** (Text)
- **ogImage** (Media - Single image)

### Component: cta (Shared)

**Campos**:

- **texto** (Text)
- **link** (Text)
- **estilo** (Enumeration: default, secondary, outline)

---

## Permissões da API

### Para desenvolvimento local:

1. Vá em **Settings** → **Users & Permissions** → **Roles** → **Public**

2. Ative permissões de `find` e `findOne` para:
   - dados-gerais
   - lojas
   - categorias-lojas
   - posts
   - categorias-blog
   - eventos
   - produtos
   - categorias-produtos
   - comodidades
   - paginas-institucionais
   - module-config

### Para produção:

Use API Tokens com permissões específicas ao invés de Public role.

---

## Configuração de Upload

**Settings** → **Media Library**:

- **Responsive Friendly Upload**: Enabled
- **Formats**:
  - Large: 1000px
  - Medium: 750px
  - Small: 500px
  - Thumbnail: 245px

---

## Webhooks (Opcional)

Para revalidação automática do cache do Next.js:

**Settings** → **Webhooks** → **Create**:

- **Name**: Revalidate Next.js
- **URL**: `https://seu-site.com/api/revalidate`
- **Events**:
  - Entry create
  - Entry update
  - Entry delete
- **Headers**:
  ```json
  {
    "Content-Type": "application/json"
  }
  ```
- **Body** (exemplo):
  ```json
  {
    "tag": "lojas",
    "secret": "seu-webhook-secret"
  }
  ```

---

## Dados de Exemplo

### Categorias de Lojas:

1. Moda
2. Alimentação
3. Serviços
4. Tecnologia
5. Beleza e Cosméticos
6. Calçados
7. Acessórios
8. Esportes
9. Livraria
10. Decoração

### Lojas de Exemplo:

- Nome: "Loja Exemplo"
- Categoria: Moda
- Piso: Térreo
- Localização: Loja 101
- Descrição: "Descrição da loja..."

---

**Pronto!** Seu Strapi está configurado e pronto para usar com o Next.js.
