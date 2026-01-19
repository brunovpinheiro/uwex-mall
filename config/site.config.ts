export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Shopping Center',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://shopping.com.br',
  description: 'O melhor shopping center da região',
  keywords: 'shopping, lojas, cinema, eventos, gastronomia',
  author: 'Shopping Center',
  locale: 'pt_BR',
  social: {
    instagram: '@shopping',
    facebook: 'shopping',
    youtube: '@shopping',
  },
};

export const contactConfig = {
  email: process.env.CONTACT_EMAIL || 'contato@shopping.com.br',
  phone: '(00) 0000-0000',
  whatsapp: '00000000000',
  address: {
    street: 'Rua Exemplo',
    number: '1000',
    neighborhood: 'Centro',
    city: 'Cidade',
    state: 'UF',
    zipCode: '00000-000',
  },
};
