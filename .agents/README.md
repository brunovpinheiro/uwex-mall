# Skills Disponíveis - Frontend UWEX Mall

As skills de IA para este projeto estão centralizadas na raiz do monorepo.

## 📍 Localização

```
../../.agents/skills/
├── frontend/           # ← Skills para este projeto
├── backend/
└── shared/
```

## 🎯 Skills Relevantes para Frontend

### 1. `implement-design`

**Localização**: `../../.agents/skills/frontend/implement-design/`

Traduz designs do Figma em código production-ready com fidelidade visual 1:1.

**Quando usar**:
- Implementar componentes a partir de designs Figma
- Gerar código de UI baseado em especificações visuais
- Construir layouts completos do Figma

**Exemplo de uso**:
```
"Implemente este componente do Figma: https://figma.com/design/..."
"Crie o card de produto baseado neste design"
```

**Requer**: Conexão com servidor MCP do Figma

---

### 2. `web-design-guidelines`

**Localização**: `../../.agents/skills/frontend/web-design-guidelines/`

Revisa código UI para conformidade com Web Interface Guidelines (Vercel).

**Quando usar**:
- Revisar acessibilidade de componentes
- Auditar UX de páginas
- Verificar boas práticas de interface
- Validar design responsivo

**Exemplo de uso**:
```
"Revise a acessibilidade do componente ProductCard"
"Audite as páginas de eventos seguindo as guidelines"
"Verifique se o formulário de contato segue as boas práticas"
```

---

## 🛠️ Stack Tecnológica

- **Framework**: Next.js 14+ (App Router)
- **UI**: React 18+, TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **API**: Integração com Strapi CMS

## 📂 Estrutura de Componentes

```
components/
├── common/      # Componentes compartilhados
├── forms/       # Formulários
├── layout/      # Layouts e estrutura
├── modules/     # Módulos específicos (blog, cinema, lojas, etc)
├── sections/    # Seções de página
└── ui/          # Componentes UI base (shadcn/ui)
```

## 💡 Como Usar as Skills

### Método 1: Menção Direta
Mencione a skill no prompt:
```
@implement-design Implemente este componente: [URL Figma]
```

### Método 2: Contexto Automático
O Cursor detecta automaticamente skills relevantes baseado no contexto:
```
"Preciso implementar este design do Figma: [URL]"
→ Cursor sugere usar implement-design

"Revise a acessibilidade desta página"
→ Cursor sugere usar web-design-guidelines
```

## 🔗 Documentação Adicional

- [README Principal](../../.agents/README.md)
- [Skill: implement-design](../../.agents/skills/frontend/implement-design/SKILL.md)
- [Skill: web-design-guidelines](../../.agents/skills/frontend/web-design-guidelines/SKILL.md)

## 📝 Contribuindo

Para adicionar novas skills ao frontend, crie-as em:
```
../../.agents/skills/frontend/nova-skill/
```

Veja o [README principal](../../.agents/README.md) para mais detalhes.
