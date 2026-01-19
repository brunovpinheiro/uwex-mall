# Setup Completo - UWEX Mall

## Arquitetura do Projeto

Este projeto usa **repositórios separados** para facilitar a clonagem para novos clientes:

| Repositório            | Descrição                   | URL                                                  |
| ---------------------- | --------------------------- | ---------------------------------------------------- |
| **uwex-mall-frontend** | Next.js + Tailwind + ShadCN | https://github.com/brunovpinheiro/uwex-mall-frontend |
| **uwex-mall-strapi**   | Strapi CMS (Backend)        | https://github.com/brunovpinheiro/uwex-mall-strapi   |

### Estrutura Local

```
/Users/brunopinheiro/Local Sites/
├── uwex-mall/              # Frontend Next.js (este repositório)
└── uwex-mall-strapi/       # Backend Strapi
```

---

## Status da Configuracao

### Concluido

- [x] Dependencias do Next.js instaladas
- [x] Arquivo `.env.local` criado e configurado
- [x] Configuracao do Next.js verificada
- [x] Strapi instalado em repositorio separado
- [x] Repositorios configurados no GitHub

### Proximos Passos

- [x] Criar usuario admin no Strapi
- [x] Criar Collections no Strapi
- [x] Gerar API Token
- [x] Popular dados de exemplo

---

## 1. Iniciar o Strapi

```bash
cd "/Users/brunopinheiro/Local Sites/uwex-mall-strapi"
npm run develop
```

O Strapi abrira automaticamente em http://localhost:1337/admin

---

## 2. Criar Usuario Admin do Strapi

Na primeira vez, voce precisara criar um usuario administrador:

1. Acesse: http://localhost:1337/admin
2. Preencha o formulario:
   - First name: Seu nome
   - Last name: Seu sobrenome
   - Email: seu-email@exemplo.com
   - Password: (senha forte)

---

## 3. Criar Collections no Strapi

Consulte o arquivo [STRAPI_SETUP.md](./STRAPI_SETUP.md) para instrucoes detalhadas sobre como criar todas as Collections necessarias.

**Collections principais:**

1. dados-gerais (Single Type)
2. categorias-lojas (Collection)
3. lojas (Collection)
4. categorias-blog (Collection)
5. posts (Collection)
6. eventos (Collection)
7. categorias-produtos (Collection)
8. produtos (Collection)
9. comodidades (Collection)
10. paginas-institucionais (Collection)
11. module-config (Single Type)
12. cinema-config (Single Type)

---

## 4. Gerar API Token no Strapi

1. No admin do Strapi, va em **Settings**
2. Clique em **API Tokens** (em Global settings)
3. Clique em **Create new API Token**
4. Configure:
   - **Name**: Next.js Frontend
   - **Token duration**: Unlimited
   - **Token type**: Full access
5. Clique em **Save**
6. **IMPORTANTE**: Copie o token gerado (ele so sera mostrado uma vez!)

---

## 5. Atualizar o .env.local com o Token

Edite o arquivo `.env.local` no projeto frontend e substitua:

```env
STRAPI_API_TOKEN="your-strapi-api-token"
```

Por:

```env
STRAPI_API_TOKEN="cole-o-token-aqui"
```

---

## 6. Configurar Permissoes da API

Para permitir acesso publico aos dados:

1. Va em **Settings** > **Users & Permissions Plugin** > **Roles**
2. Clique em **Public**
3. Expanda cada Collection Type e marque:
   - `find`
   - `findOne`

Para as Collections:

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

4. Clique em **Save**

---

## 7. Testar o Projeto Next.js

No terminal do projeto frontend:

```bash
cd "/Users/brunopinheiro/Local Sites/uwex-mall"
npm run dev
```

Acesse: http://localhost:3000

---

## 8. Popular Dados de Exemplo

### 8.1 Configurar Module Config

1. No Strapi Admin, va em **Content Manager**
2. Clique em **Module Config** (Single Types)
3. Ative os modulos desejados:
   - moduloLojas: true
   - moduloBlog: true
   - moduloEventos: true
   - moduloCinema: false
   - moduloVitrineVirtual: true
   - moduloComodidades: true
4. Clique em **Save** e depois em **Publish**

### 8.2 Criar Categorias de Lojas

1. Va em **Content Manager** > **Categorias Lojas**
2. Crie algumas categorias:
   - Moda
   - Alimentacao
   - Servicos
   - Tecnologia
   - Beleza e Cosmeticos

### 8.3 Criar Lojas de Exemplo

1. Va em **Content Manager** > **Lojas**
2. Crie lojas de exemplo (minimo 3-5)
3. Clique em **Save** e **Publish**

---

## 9. Verificar Tudo Funcionando

Apos popular os dados, teste as paginas:

- **Home**: http://localhost:3000
- **Lojas**: http://localhost:3000/lojas
- **Blog**: http://localhost:3000/blog
- **Eventos**: http://localhost:3000/eventos
- **Cinema**: http://localhost:3000/cinema
- **Contato**: http://localhost:3000/contato

---

## Comandos Uteis

```bash
# Frontend (uwex-mall)
npm run dev          # Desenvolvimento
npm run build        # Build producao
npm run lint         # Linter

# Backend (uwex-mall-strapi)
npm run develop      # Desenvolvimento
npm run start        # Producao
npm run build        # Build admin
```

---

## Clonando para Novo Cliente

Para criar um novo projeto para um cliente:

```bash
# 1. Clone os dois repositorios
git clone https://github.com/brunovpinheiro/uwex-mall-frontend.git cliente-frontend
git clone https://github.com/brunovpinheiro/uwex-mall-strapi.git cliente-strapi

# 2. Remova o historico git e inicie novo
cd cliente-frontend
rm -rf .git
git init
git remote add origin https://github.com/SEU_USER/cliente-frontend.git

cd ../cliente-strapi
rm -rf .git
git init
git remote add origin https://github.com/SEU_USER/cliente-strapi.git

# 3. Configure as variaveis de ambiente
cp cliente-frontend/.env.local.example cliente-frontend/.env.local
cp cliente-strapi/.env.example cliente-strapi/.env

# 4. Instale dependencias
cd cliente-frontend && npm install
cd ../cliente-strapi && npm install
```

---

## Recursos

- [Documentacao Next.js](https://nextjs.org/docs)
- [Documentacao Strapi](https://docs.strapi.io/)
- [ShadCN UI Components](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)
