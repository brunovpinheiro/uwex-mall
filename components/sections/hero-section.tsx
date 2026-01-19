import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getStrapiMedia } from '@/lib/strapi/utils';

interface HeroSectionProps {
  titulo: string;
  subtitulo?: string;
  texto?: string;
  imagem?: any;
  cta?: {
    texto: string;
    link: string;
    estilo: 'default' | 'secondary' | 'outline';
  };
}

export default function HeroSection({
  titulo,
  subtitulo,
  texto,
  imagem,
  cta,
}: HeroSectionProps) {
  const mediaUrl = imagem ? getStrapiMedia(imagem) : null;

  return (
    <section className="relative min-h-[500px] flex items-center justify-center overflow-hidden">
      {mediaUrl && (
        <div className="absolute inset-0 z-0">
          <Image
            src={mediaUrl}
            alt={titulo}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      )}

      <div className="container relative z-10 text-white text-center py-20">
        {subtitulo && (
          <p className="text-lg mb-4 font-medium">{subtitulo}</p>
        )}

        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          {titulo}
        </h1>

        {texto && (
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            {texto}
          </p>
        )}

        {cta && (
          <Button
            asChild
            variant={cta.estilo as any}
            size="lg"
          >
            <Link href={cta.link}>
              {cta.texto}
            </Link>
          </Button>
        )}
      </div>
    </section>
  );
}
