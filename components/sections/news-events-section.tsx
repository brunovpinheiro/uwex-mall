import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getConteudoDestaque, getNoticiasRecentes } from '@/lib/strapi/queries';
import { getStrapiMedia } from '@/lib/strapi/utils';
import type { Evento, Post } from '@/types/strapi';

interface NewsTag {
  label: string;
  variant?: 'default' | 'evento' | 'promocao' | 'marketing' | 'midia';
}

interface FeaturedNewsItem {
  image: string;
  title: string;
  description: string;
  tags: NewsTag[];
  href: string;
}

interface NewsListItem {
  image: string;
  title: string;
  tags: NewsTag[];
  href: string;
}

const tagStyles: Record<string, string> = {
  default: 'bg-muted text-muted-foreground',
  evento: 'bg-[#dbf7ff] text-[#0b6687]',
  promocao: 'bg-[#d8fbe9] text-[#05684c]',
  marketing: 'bg-[#d8fbe9] text-[#05684c]',
  midia: 'bg-[#d8fbe9] text-[#05684c]',
};

function Tag({ label, variant = 'default', icon }: NewsTag & { icon?: React.ReactNode }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-sm font-medium tracking-[0.2px] ${tagStyles[variant] || tagStyles.default}`}
    >
      {icon}
      {label}
    </span>
  );
}

// Helper para formatar data
function formatDate(date: string): string {
  const d = new Date(date);
  const day = d.getDate();
  const month = d.toLocaleDateString('pt-BR', { month: 'short' });
  const year = d.getFullYear();
  return `${day} ${month}. ${year}`;
}

// Helper para extrair texto do rich text
function extractTextFromRichText(richText: any): string {
  if (!richText) return '';
  if (typeof richText === 'string') return richText;

  // Se for um array de blocos (formato típico do Strapi)
  if (Array.isArray(richText)) {
    return richText
      .map((block: any) => {
        if (block.children) {
          return block.children.map((child: any) => child.text || '').join('');
        }
        return '';
      })
      .join(' ')
      .substring(0, 200);
  }

  return '';
}

// Mapear evento para FeaturedNewsItem
function mapEventoToFeatured(evento: Evento): FeaturedNewsItem {
  return {
    image: getStrapiMedia(evento.imagemPrincipal),
    title: evento.nome,
    description: extractTextFromRichText(evento.descricao),
    tags: [
      { label: formatDate(evento.dataInicio), variant: 'default' },
      { label: 'Evento', variant: 'evento' },
    ],
    href: `/eventos/${evento.slug}`,
  };
}

// Mapear post para FeaturedNewsItem
function mapPostToFeatured(post: Post): FeaturedNewsItem {
  const categoriaVariant =
    post.categoria?.slug === 'promocao'
      ? 'promocao'
      : post.categoria?.slug === 'marketing'
        ? 'marketing'
        : 'midia';

  return {
    image: getStrapiMedia(post.imagemDestaque),
    title: post.titulo,
    description: extractTextFromRichText(post.conteudo),
    tags: [
      { label: formatDate(post.dataPublicacao), variant: 'default' },
      { label: post.categoria?.nome || 'Notícia', variant: categoriaVariant },
    ],
    href: `/blog/${post.slug}`,
  };
}

// Mapear post para NewsListItem
function mapPostToListItem(post: Post): NewsListItem {
  const categoriaVariant =
    post.categoria?.slug === 'promocao'
      ? 'promocao'
      : post.categoria?.slug === 'marketing'
        ? 'marketing'
        : 'midia';

  return {
    image: getStrapiMedia(post.imagemDestaque),
    title: post.titulo,
    tags: [
      { label: formatDate(post.dataPublicacao), variant: 'default' },
      { label: post.categoria?.nome || 'Notícia', variant: categoriaVariant },
    ],
    href: `/blog/${post.slug}`,
  };
}

export async function NewsEventsSection() {
  // Buscar conteúdo em destaque
  const conteudoDestaque = await getConteudoDestaque();

  // Buscar notícias recentes para a lista lateral
  const noticiasRecentes = await getNoticiasRecentes(3);

  // Mapear dados para o formato do componente
  let featured: FeaturedNewsItem | null = null;

  if (conteudoDestaque) {
    if (conteudoDestaque.type === 'evento') {
      featured = mapEventoToFeatured(conteudoDestaque.data);
    } else {
      featured = mapPostToFeatured(conteudoDestaque.data);
    }
  }

  const newsList: NewsListItem[] = noticiasRecentes.map(mapPostToListItem);

  // Se não houver conteúdo, não renderizar a seção
  if (!featured) {
    return null;
  }

  return (
    <section className="bg-background py-28">
      <div className="container mx-auto">
        {/* Heading */}
        <div className="mb-10 flex items-center gap-6">
          <div className="to-border h-px flex-1 bg-gradient-to-r from-transparent" />
          <h2 className="font-heading text-foreground shrink-0 text-3xl leading-1 font-bold tracking-wider">
            Novidades &amp; Eventos
          </h2>
          <div className="to-border h-px flex-1 bg-gradient-to-l from-transparent" />
        </div>

        {/* Content grid */}
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-8">
          {/* Featured card */}
          <div className="flex flex-1 flex-col gap-6 lg:pr-10">
            <Link href={featured.href} className="group flex flex-col gap-[15px]">
              {/* Featured image */}
              <div className="relative h-[407px] overflow-hidden rounded-2xl">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 768px"
                />
                {/* Tags overlay */}
                <div className="absolute top-2 left-2 flex gap-2">
                  {featured.tags.map((tag, i) => (
                    <Tag
                      key={i}
                      label={tag.label}
                      variant={tag.variant}
                      icon={
                        tag.variant === 'evento' ? (
                          <i className="hgi-stroke hgi-standard hgi-calendar-03 text-base" />
                        ) : undefined
                      }
                    />
                  ))}
                </div>
              </div>

              {/* Featured body */}
              <div className="flex items-end gap-4">
                <div className="flex min-w-0 flex-1 flex-col gap-4">
                  <h3 className="font-heading text-foreground line-clamp-2 text-2xl font-bold">
                    {featured.title}
                  </h3>
                  <p className="text-muted-foreground line-clamp-2 text-sm leading-[1.5] font-medium tracking-[0.2px]">
                    {featured.description}
                  </p>
                </div>
                <button className="border-border bg-background text-foreground hover:bg-secondary flex size-12 shrink-0 items-center justify-center rounded-[12px] border transition-colors">
                  <i className="hgi-stroke hgi-standard hgi-arrow-up-right-01 text-sm" />
                </button>
              </div>
            </Link>
          </div>

          {/* News list */}
          <div className="flex max-w-[568px] flex-1 flex-col gap-6">
            {newsList.map((item, index) => (
              <Link key={index} href={item.href} className="group flex gap-4 rounded-[15px]">
                {/* Thumbnail */}
                <div className="relative h-[150px] w-[200px] shrink-0 overflow-hidden rounded-2xl">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="200px"
                  />
                </div>

                {/* Content */}
                <div className="flex min-w-0 flex-1 flex-col gap-2.5">
                  <div className="flex gap-2">
                    {item.tags.map((tag, i) => (
                      <Tag key={i} label={tag.label} variant={tag.variant} />
                    ))}
                  </div>
                  <h4 className="font-heading text-foreground line-clamp-3 text-[19px] leading-[1.3] font-bold tracking-[-0.2px]">
                    {item.title}
                  </h4>
                </div>
              </Link>
            ))}

            {/* Ver mais button */}
            <div className="flex justify-center">
              <Button variant="outline" size="default" asChild>
                <Link href="/blog">Ver mais</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
