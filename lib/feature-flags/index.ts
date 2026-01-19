import { getCachedModuleConfig } from '@/lib/strapi/cache';

export type ModuleName =
  | 'lojas'
  | 'blog'
  | 'eventos'
  | 'cinema'
  | 'vitrineVirtual'
  | 'comodidades';

export interface FeatureFlags {
  lojas: boolean;
  blog: boolean;
  eventos: boolean;
  cinema: boolean;
  vitrineVirtual: boolean;
  comodidades: boolean;
}

export async function getFeatureFlags(): Promise<FeatureFlags> {
  try {
    const config = await getCachedModuleConfig();

    return {
      lojas: true,
      blog: config?.moduloBlog || false,
      eventos: config?.moduloEventos || false,
      cinema: config?.moduloCinema || false,
      vitrineVirtual: config?.moduloVitrineVirtual || false,
      comodidades: config?.moduloComodidades || false,
    };
  } catch (error) {
    console.error('Error fetching feature flags:', error);
    return {
      lojas: true,
      blog: false,
      eventos: false,
      cinema: false,
      vitrineVirtual: false,
      comodidades: false,
    };
  }
}

export async function isModuleEnabled(module: ModuleName): Promise<boolean> {
  const flags = await getFeatureFlags();
  return flags[module];
}

export function getModuleRoute(module: ModuleName): string {
  const routes: Record<ModuleName, string> = {
    lojas: '/lojas',
    blog: '/blog',
    eventos: '/eventos',
    cinema: '/cinema',
    vitrineVirtual: '/vitrine-virtual',
    comodidades: '/comodidades',
  };

  return routes[module];
}
