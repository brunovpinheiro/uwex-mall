import { Metadata } from 'next';

interface SEOParams {
  title: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
}

export function generateSEO({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
}: SEOParams): Metadata {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Shopping Center';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://shopping.com.br';

  const fullTitle = `${title} | ${siteName}`;
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const ogImage = image || `${siteUrl}/og-image.jpg`;

  return {
    title: fullTitle,
    description: description || `${title} - ${siteName}`,
    keywords: keywords,
    openGraph: {
      title: fullTitle,
      description,
      url: fullUrl,
      siteName,
      images: [{ url: ogImage }],
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: fullUrl,
    },
  };
}
