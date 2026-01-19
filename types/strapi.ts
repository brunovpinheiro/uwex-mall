export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiEntity<T> {
  id: number;
  attributes: T & {
    createdAt: string;
    updatedAt: string;
    publishedAt?: string;
  };
}

export interface Media {
  id: number;
  url: string;
  alternativeText?: string;
  caption?: string;
  width?: number;
  height?: number;
  formats?: {
    thumbnail?: MediaFormat;
    small?: MediaFormat;
    medium?: MediaFormat;
    large?: MediaFormat;
  };
}

export interface MediaFormat {
  url: string;
  width: number;
  height: number;
}

export interface DadosGerais {
  id: number;
  horarios: {
    lojas: { abertura: string; fechamento: string };
    gastronomia: { abertura: string; fechamento: string };
    supermercado: { abertura: string; fechamento: string };
    feriados: { abertura: string; fechamento: string };
  };
  estacionamento: {
    valorPrimeiraHora: number;
    valorHoraAdicional: number;
    valorDiaria: number;
  };
  contato: {
    telefone: string;
    whatsapp: string;
    email: string;
    ouvidoria: string;
  };
  localizacao: {
    endereco: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
    latitude: number;
    longitude: number;
    iframeMapa: string;
  };
  redesSociais: {
    instagram?: string;
    facebook?: string;
    youtube?: string;
    linkedin?: string;
  };
}

export interface Loja {
  id: number;
  nome: string;
  slug: string;
  descricao: string;
  logo: Media;
  galeria?: Media[];
  categoria: CategoriaLoja;
  localizacao: string;
  piso: 'Térreo' | 'Piso 1' | 'Piso 2' | 'Piso 3';
  telefone?: string;
  whatsapp?: string;
  instagram?: string;
  website?: string;
  horarioCustomizado?: {
    abertura: string;
    fechamento: string;
  };
  destaque: boolean;
  ativo: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface CategoriaLoja {
  id: number;
  nome: string;
  slug: string;
  icone?: Media;
  ordem: number;
}

export interface Post {
  id: number;
  titulo: string;
  slug: string;
  conteudo: any;
  imagemDestaque: Media;
  galeria?: Media[];
  categoria: CategoriaBlog;
  autor: string;
  dataPublicacao: string;
  tags?: string[];
  seo: SEO;
  destaque: boolean;
  publicado: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface CategoriaBlog {
  id: number;
  nome: string;
  slug: string;
}

export interface Evento {
  id: number;
  nome: string;
  slug: string;
  descricao: any;
  imagemPrincipal: Media;
  galeria?: Media[];
  dataInicio: string;
  dataFim: string;
  horarioInicio: string;
  horarioFim: string;
  local: string;
  categoria?: string;
  gratuito: boolean;
  linkInscricao?: string;
  destaque: boolean;
  ativo: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface Produto {
  id: number;
  nome: string;
  slug: string;
  descricao: string;
  preco: number;
  precoPromocional?: number;
  imagemPrincipal: Media;
  galeria?: Media[];
  categoria: CategoriaProduto;
  loja: Loja;
  destaque: boolean;
  ativo: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface CategoriaProduto {
  id: number;
  nome: string;
  slug: string;
}

export interface Comodidade {
  id: number;
  nome: string;
  slug: string;
  descricao: string;
  icone?: Media;
  localizacao: string;
  ordem: number;
  ativo: boolean;
}

export interface SEO {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
  ogImage?: Media;
}

export interface PaginaInstitucional {
  id: number;
  titulo: string;
  slug: string;
  template?: string;
  sections: Section[];
  imagemBanner?: Media;
  seo: SEO;
  publicado: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface Section {
  __component: string;
  id: number;
  [key: string]: any;
}

export interface ModuleConfig {
  moduloLojas: boolean;
  moduloBlog: boolean;
  moduloEventos: boolean;
  moduloCinema: boolean;
  moduloVitrineVirtual: boolean;
  moduloComodidades: boolean;
}

export interface CinemaConfig {
  cinemaId: string;
  apiToken: string;
  atualizacaoAutomatica: boolean;
  intervaloAtualizacao: number;
  exibirEmBreve: boolean;
  diasExibicao: number;
  ativo: boolean;
}
