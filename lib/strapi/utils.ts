import { Media } from '@/types/strapi';

export function getStrapiMedia(media: any): string {
  if (!media) return '/placeholder.jpg';

  const imageUrl = media.url || media.data?.attributes?.url;

  if (!imageUrl) return '/placeholder.jpg';

  if (imageUrl.startsWith('http')) {
    return imageUrl;
  }

  return `${process.env.NEXT_PUBLIC_STRAPI_URL}${imageUrl}`;
}

export function getStrapiImageProps(media: any, sizes?: string) {
  const url = getStrapiMedia(media);
  const attributes = media.data?.attributes || media;
  const formats = attributes?.formats;

  return {
    src: url,
    width: attributes?.width || 800,
    height: attributes?.height || 600,
    sizes: sizes || '100vw',
    srcSet: formats
      ? Object.values(formats)
          .map((format: any) => `${getStrapiMedia(format)} ${format.width}w`)
          .join(', ')
      : undefined,
  };
}

export function extractStrapiData<T>(response: any): T {
  if (response.data) {
    if (Array.isArray(response.data)) {
      return response.data.map((item: any) => ({
        id: item.id,
        ...item.attributes,
      })) as T;
    }
    return {
      id: response.data.id,
      ...response.data.attributes,
    } as T;
  }
  return response as T;
}
