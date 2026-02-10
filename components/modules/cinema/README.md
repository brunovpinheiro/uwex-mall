# Componente Card Filme

Componente React para exibir cards de filmes com informações de sessões de cinema.

## 📋 Características

- **Design responsivo** - Adapta-se a diferentes tamanhos de tela
- **Estados interativos** - Efeito hover que revela sessões disponíveis
- **Classificação indicativa** - Badge visual com idade mínima
- **Sessões** - Exibe até 4 sessões com informações de 3D e legendagem
- **Integração com Strapi** - Utiliza dados do CMS
- **Otimização de imagens** - Usa Next.js Image para carregamento eficiente
- **Acessibilidade** - Labels ARIA e estrutura semântica

## 🎨 Design

Implementado com base no design do Figma:
- Link: [Card Filme - Figma](https://www.figma.com/design/UJbElapZxyD1EPM7hhaSgV)
- Node ID: `4241:13628`

### Estados

1. **Default**: Exibe apenas o poster com botão "Mais opções"
2. **Hover**: Revela overlay com grid de sessões disponíveis

## 🚀 Uso

```tsx
import FilmeCard from '@/components/modules/cinema/filme-card';
import type { Filme } from '@/types/strapi';

// Dados do filme vindos do Strapi
const filme: Filme = {
  id: 1,
  titulo: 'Abracadabra 2',
  slug: 'abracadabra-2',
  poster: { /* objeto Media do Strapi */ },
  classificacaoIndicativa: 12,
  emCartaz: true,
  sessoes: [
    {
      horario: '12:00',
      tipo3D: true,
      tipoLegendado: true,
      // ...
    }
  ],
  // ...
};

// Renderizar o card
<FilmeCard filme={filme} />

// Com className customizada
<FilmeCard filme={filme} className="w-[360px]" />
```

## 📦 Props

### FilmeCardProps

| Prop | Tipo | Obrigatório | Padrão | Descrição |
|------|------|-------------|--------|-----------|
| `filme` | `Filme` | ✅ | - | Objeto com dados do filme |
| `className` | `string` | ❌ | `undefined` | Classes CSS adicionais |

### Tipo Filme

```typescript
interface Filme {
  id: number;
  titulo: string;
  slug: string;
  sinopse?: string;
  poster: Media;
  classificacaoIndicativa: number;
  duracao?: number;
  generos?: string[];
  diretor?: string;
  elenco?: string[];
  emCartaz: boolean;
  emBreve: boolean;
  sessoes?: Sessao[];
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

interface Sessao {
  id: number;
  horario: string; // Formato: "HH:MM"
  tipo3D: boolean;
  tipoLegendado: boolean;
  sala?: string;
  dataExibicao: string; // Formato ISO
}
```

## 🎯 Exemplos de Layout

### Grid Responsivo

```tsx
<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
  {filmes.map((filme) => (
    <FilmeCard key={filme.id} filme={filme} />
  ))}
</div>
```

### Carrossel Horizontal

```tsx
<div className="flex gap-6 overflow-x-auto pb-4">
  {filmes.map((filme) => (
    <FilmeCard key={filme.id} filme={filme} className="w-[360px] shrink-0" />
  ))}
</div>
```

## 🎨 Personalização

O componente usa as variáveis CSS do tema definidas em `styles/globals.css`:

- `--color-border`: Borda dos elementos
- `--color-background`: Fundo dos cards de sessão
- `--color-foreground`: Cor do texto principal
- `--color-secondary`: Fundo dos badges 3D/LEG
- `--color-secondary-foreground`: Texto dos badges
- `--color-card`: Fundo dos cards de sessão

### Customizar Cores

Para customizar cores específicas, você pode sobrescrever usando classes Tailwind:

```tsx
<FilmeCard 
  filme={filme}
  className="[&_.badge]:bg-red-500 [&_.sessao]:bg-blue-50"
/>
```

## 📱 Responsividade

O componente é totalmente responsivo:

- **Mobile** (< 640px): Card ocupa 100% da largura
- **Tablet** (≥ 640px): 2 colunas no grid
- **Desktop** (≥ 1024px): 3-4 colunas no grid
- **Aspect Ratio**: Mantém proporção 360:520 em todos os tamanhos

## ♿ Acessibilidade

- Labels descritivos com `aria-label`
- Estrutura semântica HTML
- Contraste adequado de cores
- Navegação por teclado suportada
- Imagens com textos alternativos

## 🔧 Dependências

- React 18+
- Next.js 14+ (Image component)
- Tailwind CSS v4
- TypeScript

## 📝 Notas Técnicas

1. **Agrupamento de Sessões**: O componente agrupa automaticamente sessões pelo horário, exibindo apenas uma entrada por horário único
2. **Limite de Sessões**: Exibe no máximo 4 sessões no estado hover
3. **Otimização de Imagem**: Usa `priority` no carregamento do poster para melhor performance
4. **Estado Hover**: Controlado por `onMouseEnter`/`onMouseLeave` para melhor UX

## 🐛 Troubleshooting

### Imagem não carrega
- Verifique se o caminho do poster está correto no Strapi
- Confirme que `getStrapiMedia()` está funcionando corretamente
- Adicione domínios externos no `next.config.js` se necessário

### Sessões não aparecem
- Verifique se o array `sessoes` está populado
- Confirme que os dados das sessões têm o formato correto
- Use as DevTools para inspecionar os dados do `filme`

### Hover não funciona em mobile
- Por design, o hover não funciona em touch devices
- Considere adicionar um clique/tap handler para mobile se necessário

## 📄 Licença

Este componente faz parte do projeto Shopping Estação e segue a mesma licença do projeto.
