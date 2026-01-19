interface OrganizationSchemaProps {
  name: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
  };
  phone: string;
  email: string;
  url: string;
  logo: string;
  socialMedia: string[];
}

export function OrganizationSchema({
  name,
  address,
  phone,
  email,
  url,
  logo,
  socialMedia,
}: OrganizationSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ShoppingCenter',
    name,
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.streetAddress,
      addressLocality: address.addressLocality,
      addressRegion: address.addressRegion,
      postalCode: address.postalCode,
      addressCountry: 'BR',
    },
    telephone: phone,
    email,
    url,
    logo,
    sameAs: socialMedia,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function EventSchema({ evento }: { evento: any }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: evento.nome,
    description: evento.descricao,
    startDate: evento.dataInicio,
    endDate: evento.dataFim,
    location: {
      '@type': 'Place',
      name: evento.local,
    },
    image: evento.imagemPrincipal?.url,
    isAccessibleForFree: evento.gratuito,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ArticleSchema({ post }: { post: any }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.titulo,
    image: post.imagemDestaque?.url,
    datePublished: post.dataPublicacao,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Person',
      name: post.autor,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
