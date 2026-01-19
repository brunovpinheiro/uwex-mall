import { MetadataRoute } from 'next';
import { getLojas, getPosts, getEventos } from '@/lib/strapi/queries';
import { extractStrapiData } from '@/lib/strapi/utils';
import type { Loja, Post, Evento } from '@/types/strapi';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://shopping.com.br';

  const staticPages = [
    '',
    '/lojas',
    '/blog',
    '/eventos',
    '/cinema',
    '/vitrine-virtual',
    '/comodidades',
    '/quem-somos',
    '/contato',
    '/comercializacao',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  try {
    const [lojasResponse, postsResponse, eventosResponse] = await Promise.all([
      getLojas().catch(() => ({ data: [] })),
      getPosts().catch(() => ({ data: [] })),
      getEventos().catch(() => ({ data: [] })),
    ]);

    const lojas = extractStrapiData<Loja[]>(lojasResponse) || [];
    const posts = extractStrapiData<Post[]>(postsResponse) || [];
    const eventos = extractStrapiData<Evento[]>(eventosResponse) || [];

    const lojaPages = lojas.map((loja) => ({
      url: `${baseUrl}/lojas/${loja.slug}`,
      lastModified: new Date(loja.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

    const postPages = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

    const eventoPages = eventos.map((evento) => ({
      url: `${baseUrl}/eventos/${evento.slug}`,
      lastModified: new Date(evento.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

    return [...staticPages, ...lojaPages, ...postPages, ...eventoPages];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return staticPages;
  }
}
