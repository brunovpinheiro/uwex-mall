import { unstable_cache } from 'next/cache';
import {
  getDadosGerais,
  getLojas,
  getModuleConfig,
  getCategoriasLojas,
  getComodidades,
} from './queries';

export const getCachedDadosGerais = unstable_cache(
  async () => getDadosGerais(),
  ['dados-gerais'],
  { revalidate: 3600, tags: ['dados-gerais'] }
);

export const getCachedLojas = unstable_cache(
  async (params) => getLojas(params),
  ['lojas'],
  { revalidate: 1800, tags: ['lojas'] }
);

export const getCachedModuleConfig = unstable_cache(
  async () => getModuleConfig(),
  ['module-config'],
  { revalidate: 300, tags: ['module-config'] }
);

export const getCachedCategoriasLojas = unstable_cache(
  async () => getCategoriasLojas(),
  ['categorias-lojas'],
  { revalidate: 3600, tags: ['categorias-lojas'] }
);

export const getCachedComodidades = unstable_cache(
  async () => getComodidades(),
  ['comodidades'],
  { revalidate: 3600, tags: ['comodidades'] }
);
