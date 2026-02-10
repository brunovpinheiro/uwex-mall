import { strapi } from './client';
import { extractStrapiData } from './utils';
import type {
  DadosGerais,
  Loja,
  CategoriaLoja,
  Post,
  Evento,
  Produto,
  Comodidade,
  PaginaInstitucional,
  ModuleConfig,
  CinemaConfig,
} from '@/types/strapi';

// Dados Gerais
export async function getDadosGerais() {
  const response = await strapi.get('/api/dados-gerais', {
    populate: ['horarios', 'estacionamento', 'contato', 'localizacao', 'redesSociais'],
  });
  return extractStrapiData<DadosGerais>(response);
}

// Lojas
export async function getLojas(params?: {
  categoria?: string;
  piso?: string;
  destaque?: boolean;
  search?: string;
  page?: number;
  pageSize?: number;
}) {
  const filters: any = {
    ativo: { $eq: true },
  };

  if (params?.categoria) {
    filters.categoria = { slug: { $eq: params.categoria } };
  }

  if (params?.piso) {
    filters.piso = { $eq: params.piso };
  }

  if (params?.destaque !== undefined) {
    filters.destaque = { $eq: params.destaque };
  }

  if (params?.search) {
    filters.$or = [
      { nome: { $containsi: params.search } },
      { descricao: { $containsi: params.search } },
    ];
  }

  const response = await strapi.get('/api/lojas', {
    populate: ['logo', 'categoria'],
    filters,
    pagination: {
      page: params?.page || 1,
      pageSize: params?.pageSize || 12,
    },
    sort: ['destaque:desc', 'nome:asc'],
  });

  return response;
}

export async function getLojaBySlug(slug: string) {
  const response = await strapi.get('/api/lojas', {
    filters: { slug: { $eq: slug }, ativo: { $eq: true } },
    populate: ['logo', 'galeria', 'categoria', 'horarioCustomizado'],
  });

  const data = extractStrapiData<Loja[]>(response);
  return Array.isArray(data) ? data[0] : null;
}

export async function getCategoriasLojas() {
  const response = await strapi.get('/api/categorias-lojas', {
    populate: ['icone'],
    sort: ['ordem:asc', 'nome:asc'],
  });

  return extractStrapiData<CategoriaLoja[]>(response);
}

// Blog
export async function getPosts(params?: {
  categoria?: string;
  tag?: string;
  destaque?: boolean;
  page?: number;
  pageSize?: number;
}) {
  const filters: any = {
    publicado: { $eq: true },
  };

  if (params?.categoria) {
    filters.categoria = { slug: { $eq: params.categoria } };
  }

  if (params?.destaque !== undefined) {
    filters.destaque = { $eq: params.destaque };
  }

  if (params?.tag) {
    filters.tags = { $contains: params.tag };
  }

  const response = await strapi.get('/api/posts', {
    populate: ['imagemDestaque', 'categoria', 'seo'],
    filters,
    pagination: {
      page: params?.page || 1,
      pageSize: params?.pageSize || 12,
    },
    sort: ['dataPublicacao:desc'],
  });

  return response;
}

export async function getPostBySlug(slug: string) {
  const response = await strapi.get('/api/posts', {
    filters: { slug: { $eq: slug }, publicado: { $eq: true } },
    populate: ['imagemDestaque', 'galeria', 'categoria', 'seo'],
  });

  const data = extractStrapiData<Post[]>(response);
  return Array.isArray(data) ? data[0] : null;
}

// Eventos
export async function getEventos(params?: {
  categoria?: string;
  dataInicio?: string;
  destaque?: boolean;
  page?: number;
}) {
  const filters: any = {
    ativo: { $eq: true },
    dataFim: { $gte: new Date().toISOString() },
  };

  if (params?.categoria) {
    filters.categoria = { $eq: params.categoria };
  }

  if (params?.destaque !== undefined) {
    filters.destaque = { $eq: params.destaque };
  }

  const response = await strapi.get('/api/eventos', {
    populate: ['imagemPrincipal'],
    filters,
    sort: ['dataInicio:asc'],
    pagination: params?.page ? { page: params.page, pageSize: 12 } : undefined,
  });

  return response;
}

export async function getEventoBySlug(slug: string) {
  const response = await strapi.get('/api/eventos', {
    filters: { slug: { $eq: slug }, ativo: { $eq: true } },
    populate: ['imagemPrincipal', 'galeria'],
  });

  const data = extractStrapiData<Evento[]>(response);
  return Array.isArray(data) ? data[0] : null;
}

// Produtos (Vitrine Virtual)
export async function getProdutos(params?: {
  categoria?: string;
  loja?: string;
  precoMin?: number;
  precoMax?: number;
  page?: number;
}) {
  const filters: any = {
    ativo: { $eq: true },
  };

  if (params?.categoria) {
    filters.categoria = { slug: { $eq: params.categoria } };
  }

  if (params?.loja) {
    filters.loja = { slug: { $eq: params.loja } };
  }

  if (params?.precoMin !== undefined || params?.precoMax !== undefined) {
    filters.preco = {};
    if (params.precoMin !== undefined) {
      filters.preco.$gte = params.precoMin;
    }
    if (params.precoMax !== undefined) {
      filters.preco.$lte = params.precoMax;
    }
  }

  const response = await strapi.get('/api/produtos', {
    populate: ['imagemPrincipal', 'categoria', 'loja'],
    filters,
    pagination: { page: params?.page || 1, pageSize: 12 },
    sort: ['destaque:desc', 'createdAt:desc'],
  });

  return response;
}

export async function getProdutoBySlug(slug: string) {
  const response = await strapi.get('/api/produtos', {
    filters: { slug: { $eq: slug }, ativo: { $eq: true } },
    populate: ['imagemPrincipal', 'galeria', 'categoria', 'loja'],
  });

  const data = extractStrapiData<Produto[]>(response);
  return Array.isArray(data) ? data[0] : null;
}

// Comodidades
export async function getComodidades() {
  const response = await strapi.get('/api/comodidades', {
    populate: ['icone'],
    filters: { ativo: { $eq: true } },
    sort: ['ordem:asc', 'nome:asc'],
  });

  return extractStrapiData<Comodidade[]>(response);
}

// Páginas Institucionais
export async function getPaginaBySlug(slug: string) {
  const response = await strapi.get('/api/paginas-institucionais', {
    filters: { slug: { $eq: slug }, publicado: { $eq: true } },
    populate: {
      sections: { populate: '*' },
      imagemBanner: true,
      seo: true,
    },
  });

  const data = extractStrapiData<PaginaInstitucional[]>(response);
  return Array.isArray(data) ? data[0] : null;
}

// Module Config
export async function getModuleConfig() {
  const response = await strapi.get('/api/module-config');
  return extractStrapiData<ModuleConfig>(response);
}

// Cinema Config
export async function getCinemaConfig() {
  const response = await strapi.get('/api/cinema-config');
  return extractStrapiData<CinemaConfig>(response);
}

// Home - Buscar conteúdo em destaque (evento ou post)
export async function getConteudoDestaque() {
  // Primeiro tenta buscar um evento em destaque
  const eventosResponse = await strapi.get('/api/eventos', {
    populate: ['imagemPrincipal'],
    filters: {
      destaque: { $eq: true },
      ativo: { $eq: true },
      dataFim: { $gte: new Date().toISOString() },
    },
    sort: ['dataInicio:asc'],
    pagination: { page: 1, pageSize: 1 },
  });

  const eventosData = extractStrapiData<Evento[]>(eventosResponse);
  if (eventosData && eventosData.length > 0) {
    return { type: 'evento' as const, data: eventosData[0] };
  }

  // Se não houver evento em destaque, tenta buscar um post em destaque
  const postsResponse = await strapi.get('/api/posts', {
    populate: ['imagemDestaque', 'categoria'],
    filters: {
      destaque: { $eq: true },
      publicado: { $eq: true },
    },
    sort: ['dataPublicacao:desc'],
    pagination: { page: 1, pageSize: 1 },
  });

  const postsData = extractStrapiData<Post[]>(postsResponse);
  if (postsData && postsData.length > 0) {
    return { type: 'post' as const, data: postsData[0] };
  }

  // Se não houver nada em destaque, busca o evento mais recente
  const eventoRecenteResponse = await strapi.get('/api/eventos', {
    populate: ['imagemPrincipal'],
    filters: {
      ativo: { $eq: true },
      dataFim: { $gte: new Date().toISOString() },
    },
    sort: ['dataInicio:asc'],
    pagination: { page: 1, pageSize: 1 },
  });

  const eventoRecenteData = extractStrapiData<Evento[]>(eventoRecenteResponse);
  if (eventoRecenteData && eventoRecenteData.length > 0) {
    return { type: 'evento' as const, data: eventoRecenteData[0] };
  }

  // Se não houver evento recente, busca o post mais recente
  const postRecenteResponse = await strapi.get('/api/posts', {
    populate: ['imagemDestaque', 'categoria'],
    filters: {
      publicado: { $eq: true },
    },
    sort: ['dataPublicacao:desc'],
    pagination: { page: 1, pageSize: 1 },
  });

  const postRecenteData = extractStrapiData<Post[]>(postRecenteResponse);
  if (postRecenteData && postRecenteData.length > 0) {
    return { type: 'post' as const, data: postRecenteData[0] };
  }

  return null;
}

// Home - Buscar lista de posts/eventos recentes para a lateral
export async function getNoticiasRecentes(limit: number = 3) {
  const postsResponse = await strapi.get('/api/posts', {
    populate: ['imagemDestaque', 'categoria'],
    filters: {
      publicado: { $eq: true },
    },
    sort: ['dataPublicacao:desc'],
    pagination: { page: 1, pageSize: limit },
  });

  return extractStrapiData<Post[]>(postsResponse);
}
