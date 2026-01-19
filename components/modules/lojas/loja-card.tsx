import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getStrapiMedia } from '@/lib/strapi/utils';
import type { Loja } from '@/types/strapi';

interface LojaCardProps {
  loja: Loja;
}

export default function LojaCard({ loja }: LojaCardProps) {
  const logoUrl = getStrapiMedia(loja.logo);

  return (
    <Link href={`/lojas/${loja.slug}`}>
      <Card className="group hover:shadow-lg transition-shadow h-full">
        <CardContent className="p-4">
          <div className="relative aspect-square mb-4 bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={logoUrl}
              alt={loja.nome}
              fill
              className="object-contain p-4 group-hover:scale-105 transition-transform"
            />
            {loja.destaque && (
              <Badge className="absolute top-2 right-2">Destaque</Badge>
            )}
          </div>

          <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
            {loja.nome}
          </h3>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{loja.categoria?.nome || 'Loja'}</span>
            <span>{loja.piso}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
