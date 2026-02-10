import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

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

interface NewsEventsSectionProps {
  featured?: FeaturedNewsItem;
  newsList?: NewsListItem[];
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


const defaultFeatured: FeaturedNewsItem = {
  image: '/images/news/destaque-sitio-nicolao.jpg',
  title: 'Sítio do Nicolao',
  description:
    'Should you spend the next three days sifting through 200 unvetted profiles on Upwork, or work with a curated network that delivers pre-screened experts in 48 hours?',
  tags: [
    { label: '14 Nov. 2025', variant: 'default' },
    { label: 'Evento', variant: 'evento' },
  ],
  href: '/blog/sitio-do-nicolao',
};

const defaultNewsList: NewsListItem[] = [
  {
    image: '/images/news/card-black-friday.jpg',
    title:
      'Shopping Estação anuncia Black Friday com descontos de até 70% e cupons em triplo para sorteio de Jeep Compass',
    tags: [
      { label: '14 Nov. 2025', variant: 'default' },
      { label: 'Promoção', variant: 'promocao' },
    ],
    href: '/blog/black-friday',
  },
  {
    image: '/images/news/card-natal-jeep.jpg',
    title: 'Shopping Estação sorteia Jeep Compass em sua campanha de Natal',
    tags: [
      { label: '14 Nov. 2025', variant: 'default' },
      { label: 'Marketing', variant: 'marketing' },
    ],
    href: '/blog/natal-jeep',
  },
  {
    image: '/images/news/card-natal-programacao.jpg',
    title:
      'Shopping Estação anuncia a sua maior programação gratuita de Natal com espetáculos musicais, teatrais e de dança',
    tags: [
      { label: '14 Nov. 2025', variant: 'default' },
      { label: 'Na mídia', variant: 'midia' },
    ],
    href: '/blog/natal-programacao',
  },
];

export function NewsEventsSection({
  featured = defaultFeatured,
  newsList = defaultNewsList,
}: NewsEventsSectionProps) {
  return (
    <section className="bg-background px-20 pt-20 pb-10">
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
          <div className="lg:max-w-2xl lg:shrink-0 lg:pr-10">
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
                      icon={tag.variant === 'evento' ? <i className="hgi-stroke hgi-standard hgi-calendar-03 text-base" /> : undefined}
                    />
                  ))}
                </div>
              </div>

              {/* Featured body */}
              <div className="flex items-end gap-4">
                <div className="flex min-w-0 flex-1 flex-col gap-4">
                  <h3 className="font-heading text-foreground text-[28px] leading-[1.3] font-bold tracking-[-0.25px]">
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
          <div className="flex flex-1 flex-col gap-6">
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
