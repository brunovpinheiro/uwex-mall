import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getStrapiMedia } from '@/lib/strapi/utils';

interface CtaSectionProps {
  titulo: string;
  descricao?: string;
  botaoPrimario?: {
    texto: string;
    link: string;
  };
  botaoSecundario?: {
    texto: string;
    link: string;
  };
  imagemFundo?: any;
}

export default function CtaSection({
  titulo,
  descricao,
  botaoPrimario,
  botaoSecundario,
  imagemFundo,
}: CtaSectionProps) {
  const bgImage = imagemFundo ? getStrapiMedia(imagemFundo) : null;

  return (
    <section className="relative py-20 overflow-hidden">
      {bgImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={bgImage}
            alt={titulo}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
      )}

      <div className="container relative z-10 text-center text-white">
        <h2 className="text-4xl font-bold mb-4">{titulo}</h2>

        {descricao && (
          <p className="text-xl mb-8 max-w-2xl mx-auto">{descricao}</p>
        )}

        <div className="flex flex-wrap justify-center gap-4">
          {botaoPrimario && (
            <Button asChild size="lg">
              <Link href={botaoPrimario.link}>{botaoPrimario.texto}</Link>
            </Button>
          )}

          {botaoSecundario && (
            <Button asChild size="lg" variant="outline">
              <Link href={botaoSecundario.link}>{botaoSecundario.texto}</Link>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
