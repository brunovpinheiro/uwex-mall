import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getStrapiMedia } from '@/lib/strapi/utils';
import { formatDate } from '@/lib/utils/format';
import { Calendar, MapPin, Clock } from 'lucide-react';
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
            <Calendar className="h-4 w-4" />
            <span>
              {formatDate(evento.dataInicio)}
              {evento.dataFim !== evento.dataInicio && ` - ${formatDate(evento.dataFim)}`}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{evento.horarioInicio} - {evento.horarioFim}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
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
