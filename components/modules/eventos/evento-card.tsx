import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getStrapiMedia } from '@/lib/strapi/utils';
import { formatDate } from '@/lib/utils/format';
import type { Evento } from '@/types/strapi';

interface EventoCardProps {
  evento: Evento;
}

export default function EventoCard({ evento }: EventoCardProps) {
  const imageUrl = getStrapiMedia(evento.imagemPrincipal);

  return (
    <Link href={`/eventos/${evento.slug}`}>
      <Card className="group hover:shadow-lg transition-shadow h-full overflow-hidden">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={imageUrl}
            alt={evento.nome}
            fill
            className="object-cover group-hover:scale-105 transition-transform"
          />
          {evento.destaque && (
            <Badge className="absolute top-2 right-2">Destaque</Badge>
          )}
          {evento.gratuito && (
            <Badge className="absolute top-2 left-2" variant="secondary">
              Grátis
            </Badge>
          )}
        </div>

        <CardHeader>
          <h3 className="font-semibold text-xl group-hover:text-primary transition-colors line-clamp-2">
            {evento.nome}
          </h3>
        </CardHeader>

        <CardContent className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <i className="hgi-stroke hgi-standard hgi-calendar-03 text-base" />
            <span>
              {formatDate(evento.dataInicio)}
              {evento.dataFim !== evento.dataInicio && ` - ${formatDate(evento.dataFim)}`}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <i className="hgi-stroke hgi-standard hgi-clock-01 text-base" />
            <span>{evento.horarioInicio} - {evento.horarioFim}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <i className="hgi-stroke hgi-standard hgi-location-01 text-base" />
            <span>{evento.local}</span>
          </div>

          {evento.categoria && (
            <Badge variant="outline" className="mt-2">
              {evento.categoria}
            </Badge>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
