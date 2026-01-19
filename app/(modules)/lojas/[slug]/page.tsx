import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getLojaBySlug } from '@/lib/strapi/queries';
import { getStrapiMedia } from '@/lib/strapi/utils';
import { generateSEO } from '@/lib/utils/seo';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatPhone } from '@/lib/utils/format';
import { Instagram, Globe, Phone, MapPin } from 'lucide-react';

export const revalidate = 1800;

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps) {
  const loja = await getLojaBySlug(params.slug);

  if (!loja) {
    return {};
  }

  return generateSEO({
    title: loja.nome,
    description: loja.descricao || `Conheça ${loja.nome} - ${loja.categoria?.nome}`,
    image: getStrapiMedia(loja.logo),
    url: `/lojas/${loja.slug}`,
  });
}

export default async function LojaDetailPage({ params }: PageProps) {
  const loja = await getLojaBySlug(params.slug);

  if (!loja) {
    notFound();
  }

  const logoUrl = getStrapiMedia(loja.logo);

  return (
    <main className="min-h-screen">
      <section className="bg-muted py-12">
        <div className="container">
          <Link href="/lojas" className="text-sm text-muted-foreground hover:text-primary mb-4 inline-block">
            ← Voltar para lojas
          </Link>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="relative w-full md:w-64 aspect-square bg-white rounded-lg overflow-hidden shadow-lg">
              <Image
                src={logoUrl}
                alt={loja.nome}
                fill
                className="object-contain p-6"
                priority
              />
            </div>

            <div className="flex-1">
              <div className="flex items-start gap-4 mb-4">
                <h1 className="text-4xl font-bold flex-1">{loja.nome}</h1>
                {loja.destaque && <Badge>Destaque</Badge>}
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{loja.piso} - {loja.localizacao}</span>
                </div>
                <Badge variant="outline">{loja.categoria?.nome}</Badge>
              </div>

              {loja.descricao && (
                <div className="prose max-w-none mb-6">
                  <p>{loja.descricao}</p>
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                {loja.telefone && (
                  <Button variant="outline" asChild>
                    <a href={`tel:${loja.telefone}`}>
                      <Phone className="h-4 w-4 mr-2" />
                      {formatPhone(loja.telefone)}
                    </a>
                  </Button>
                )}

                {loja.whatsapp && (
                  <Button variant="outline" asChild>
                    <a
                      href={`https://wa.me/55${loja.whatsapp.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      WhatsApp
                    </a>
                  </Button>
                )}

                {loja.instagram && (
                  <Button variant="outline" asChild>
                    <a
                      href={`https://instagram.com/${loja.instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Instagram className="h-4 w-4 mr-2" />
                      Instagram
                    </a>
                  </Button>
                )}

                {loja.website && (
                  <Button variant="outline" asChild>
                    <a href={loja.website} target="_blank" rel="noopener noreferrer">
                      <Globe className="h-4 w-4 mr-2" />
                      Website
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {loja.galeria && loja.galeria.length > 0 && (
        <section className="container py-12">
          <h2 className="text-2xl font-bold mb-6">Galeria</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {loja.galeria.map((image, index) => (
              <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src={getStrapiMedia(image)}
                  alt={`${loja.nome} - Imagem ${index + 1}`}
                  fill
                  className="object-cover hover:scale-110 transition-transform"
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
