import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getStrapiMedia } from '@/lib/strapi/utils';

interface BeneficiosSectionProps {
  titulo: string;
  cards: Array<{
    icone?: any;
    titulo: string;
    descricao: string;
    link?: string;
    destaque?: boolean;
  }>;
}

export default function BeneficiosSection({ titulo, cards }: BeneficiosSectionProps) {
  if (!cards || cards.length === 0) return null;

  return (
    <section className="py-16">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12">{titulo}</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, index) => {
            const CardWrapper = card.link ? Link : 'div';
            const wrapperProps = card.link ? { href: card.link } : {};

            return (
              <CardWrapper key={index} {...wrapperProps}>
                <Card className={`h-full ${card.link ? 'hover:shadow-lg transition-shadow cursor-pointer' : ''}`}>
                  <CardHeader>
                    {card.icone && (
                      <div className="relative w-16 h-16 mb-4">
                        <Image
                          src={getStrapiMedia(card.icone)}
                          alt={card.titulo}
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}
                    <CardTitle>{card.titulo}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{card.descricao}</p>
                  </CardContent>
                </Card>
              </CardWrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}
