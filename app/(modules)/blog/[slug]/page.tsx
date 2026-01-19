import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getPostBySlug } from '@/lib/strapi/queries';
import { getStrapiMedia } from '@/lib/strapi/utils';
import { generateSEO } from '@/lib/utils/seo';
import { formatDate } from '@/lib/utils/format';
import { Badge } from '@/components/ui/badge';

export const revalidate = 1800;

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {};
  }

  return generateSEO({
    title: post.seo?.metaTitle || post.titulo,
    description: post.seo?.metaDescription,
    keywords: post.seo?.keywords,
    image: post.seo?.ogImage ? getStrapiMedia(post.seo.ogImage) : getStrapiMedia(post.imagemDestaque),
    url: `/blog/${post.slug}`,
    type: 'article',
  });
}

export default async function PostDetailPage({ params }: PageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const imageUrl = getStrapiMedia(post.imagemDestaque);

  return (
    <main className="min-h-screen">
      <article>
        <section className="relative h-[400px] w-full">
          <Image
            src={imageUrl}
            alt={post.titulo}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

          <div className="container relative h-full flex flex-col justify-end pb-12">
            <Link
              href="/blog"
              className="text-white/80 hover:text-white mb-4 inline-block"
            >
              ← Voltar para o blog
            </Link>

            <div className="flex items-center gap-2 mb-4">
              {post.categoria && (
                <Badge variant="secondary">{post.categoria.nome}</Badge>
              )}
              {post.destaque && <Badge>Destaque</Badge>}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {post.titulo}
            </h1>

            <div className="flex items-center gap-4 text-white/80">
              {post.autor && <span>Por {post.autor}</span>}
              <span>•</span>
              <time dateTime={post.dataPublicacao}>
                {formatDate(post.dataPublicacao, 'dd/MM/yyyy')}
              </time>
            </div>
          </div>
        </section>

        <section className="container py-12">
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-lg max-w-none">
              {typeof post.conteudo === 'string' ? (
                <div dangerouslySetInnerHTML={{ __html: post.conteudo }} />
              ) : (
                <div>{JSON.stringify(post.conteudo)}</div>
              )}
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className="mt-8 pt-8 border-t">
                <h3 className="text-sm font-semibold mb-3">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {post.galeria && post.galeria.length > 0 && (
          <section className="container py-12">
            <h2 className="text-2xl font-bold mb-6">Galeria</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {post.galeria.map((image, index) => (
                <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
                  <Image
                    src={getStrapiMedia(image)}
                    alt={`${post.titulo} - Imagem ${index + 1}`}
                    fill
                    className="object-cover hover:scale-110 transition-transform"
                  />
                </div>
              ))}
            </div>
          </section>
        )}
      </article>
    </main>
  );
}
