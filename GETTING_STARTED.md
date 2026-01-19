# Guia de Início Rápido - UWEX Mall

Este guia irá ajudá-lo a configurar e executar o projeto pela primeira vez.

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **npm** ou **yarn**
- **Git**

## Passo 1: Clonar e Instalar

```bash
# O repositório já está no seu ambiente local
cd uwex-mall

# Instalar dependências
npm install
```

## Passo 2: Configurar Strapi CMS

### Opção A: Usar Strapi Cloud

1. Acesse [Strapi Cloud](https://cloud.strapi.io/)
2. Crie um novo projeto
3. Configure as Collections Types conforme a especificação (ver `spec.md`)
4. Copie a URL e o API Token

### Opção B: Rodar Strapi Localmente

```bash
# Em outro terminal, criar projeto Strapi
npx create-strapi-app@latest strapi-uwex-mall --quickstart

# Após iniciar, acesse http://localhost:1337/admin
# Criar usuário admin
# Configurar Collections Types conforme spec.md
```

### Collections Types para Criar no Strapi:

1. **dados-gerais** (Single Type)
2. **lojas** (Collection)
3. **categorias-lojas** (Collection)
4. **posts** (Collection)
5. **categorias-blog** (Collection)
6. **eventos** (Collection)
7. **produtos** (Collection)
8. **categorias-produtos** (Collection)
9. **comodidades** (Collection)
10. **paginas-institucionais** (Collection)
11. **module-config** (Single Type)
12. **cinema-config** (Single Type)

Consulte o arquivo `spec.md` para detalhes completos de cada collection.

## Passo 3: Configurar Variáveis de Ambiente

```bash
# Copiar arquivo de exemplo
cp .env.local.example .env.local

# Editar .env.local com suas configurações
```

Configurações mínimas necessárias:

```env
NEXT_PUBLIC_SITE_NAME="Seu Shopping"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"

# Strapi
NEXT_PUBLIC_STRAPI_URL="http://localhost:1337"
STRAPI_API_TOKEN="seu-token-aqui"

# Webhook Secret (gerar uma string aleatória)
WEBHOOK_SECRET="sua-chave-secreta"
```

### Como obter o Strapi API Token:

1. Acesse o admin do Strapi
2. Vá em **Settings** → **API Tokens**
3. Clique em **Create new API Token**
4. Nome: "Next.js Frontend"
5. Token type: **Full access** ou **Custom** (configurar permissões)
6. Copie o token gerado

## Passo 4: Executar o Projeto

```bash
# Modo desenvolvimento
npm run dev

# O site estará disponível em http://localhost:3000
```

## Passo 5: Popular Dados no Strapi

### 1. Configurar Module Config

No Strapi Admin:
1. Acesse **Content Manager** → **Single Types** → **Module Config**
2. Ative os módulos desejados:
   - ✅ Lojas (sempre ativo)
   - ✅ Blog
   - ✅ Eventos
   - ✅ Cinema
   - ✅ Vitrine Virtual
   - ✅ Comodidades

### 2. Adicionar Categorias de Lojas

Exemplo:
- Moda
- Alimentação
- Serviços
- Tecnologia
- Beleza

### 3. Adicionar Lojas de Exemplo

Para cada loja:
- Nome
- Logo (upload de imagem)
- Categoria
- Piso
- Localização
- Descrição
- Marcar como "Ativo"

### 4. Criar Posts no Blog

Posts de exemplo:
- Novidades do shopping
- Tendências de moda
- Dicas de gastronomia

### 5. Adicionar Eventos

Eventos de exemplo:
- Shows
- Atividades para crianças
- Promoções especiais

## Passo 6: Testar as Páginas

Acesse e teste:

- **Home**: http://localhost:3000
- **Lojas**: http://localhost:3000/lojas
- **Blog**: http://localhost:3000/blog
- **Eventos**: http://localhost:3000/eventos
- **Cinema**: http://localhost:3000/cinema
- **Contato**: http://localhost:3000/contato

## Configurações Adicionais (Opcional)

### Integração com Ingresso.com

Se você tem acesso à API do Ingresso.com:

```env
INGRESSO_API_URL="https://api.ingresso.com/v1"
INGRESSO_API_KEY="sua-chave-api"
INGRESSO_CINEMA_ID="id-do-cinema"
```

### Email (SMTP)

Para envio de emails dos formulários:

```env
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="seu-email@gmail.com"
SMTP_PASSWORD="sua-senha-app"
CONTACT_EMAIL="contato@shopping.com.br"
```

## Troubleshooting

### Erro: "Failed to fetch from Strapi"

**Solução:**
1. Verifique se o Strapi está rodando
2. Confirme a URL no `.env.local`
3. Verifique o API Token

### Erro: "Module not found"

**Solução:**
```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Imagens não carregam

**Solução:**
1. Verifique as configurações de upload no Strapi
2. Confirme as permissões da pasta `public/uploads`
3. Verifique `next.config.js` - domínios permitidos para imagens

### Página retorna 404

**Solução:**
1. Verifique se o módulo está ativo no `module-config` do Strapi
2. Confirme que há conteúdo publicado
3. Limpe o cache: `rm -rf .next`

## Próximos Passos

1. **Personalizar o Design**: Edite as cores no `tailwind.config.ts`
2. **Adicionar Analytics**: Configure Google Analytics
3. **SEO**: Personalize metadados em cada página
4. **Deploy**: Faça deploy na Vercel (ver README.md)

## Recursos Úteis

- [Documentação Next.js](https://nextjs.org/docs)
- [Documentação Strapi](https://docs.strapi.io/)
- [ShadCN UI](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)

## Suporte

Para dúvidas ou problemas:
- Consulte a `spec.md` para detalhes técnicos
- Consulte o `README.md` para informações gerais
- Abra uma issue no repositório

---

**Boa sorte com seu projeto!** 🚀
