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
