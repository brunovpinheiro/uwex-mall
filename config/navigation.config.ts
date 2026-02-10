export interface NavItem {
  title: string;
  href: string;
  disabled?: boolean;
  external?: boolean;
  icon?: string;
  label?: string;
}

export const mainNav: NavItem[] = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'Novidades',
    href: '/novidades',
  },
  {
    title: 'Eventos',
    href: '/eventos',
  },
  {
    title: 'Cinema',
    href: '/cinema',
  },
  {
    title: 'Lojas',
    href: '/lojas',
  },
  {
    title: 'Gastronomia',
    href: '/gastronomia',
  },
  {
    title: 'Fale Conosco',
    href: '/contato',
  },
];

export const megaMenuNav: NavItem[] = [
  { title: 'Sobre nós', href: '/quem-somos' },
  { title: 'Lazer', href: '/lazer' },
  { title: 'Comodidades', href: '/comodidades' },
  { title: 'Sustentabilidade', href: '/sustentabilidade' },
  { title: 'Turismo', href: '/turismo' },
  { title: 'Merchandising', href: '/merchandising' },
  { title: 'Comercialização', href: '/comercializacao' },
  { title: 'Trabalhe Conosco', href: '/trabalhe-conosco' },
];

export const footerNav = {
  institucional: [
    { title: 'Quem Somos', href: '/quem-somos' },
    { title: 'Contato', href: '/contato' },
    { title: 'Comercialização', href: '/comercializacao' },
    { title: 'Trabalhe Conosco', href: '/trabalhe-conosco' },
  ],
  servicos: [
    { title: 'Lojas', href: '/lojas' },
    { title: 'Comodidades', href: '/comodidades' },
    { title: 'Estacionamento', href: '/estacionamento' },
    { title: 'Turismo', href: '/turismo' },
  ],
  entretenimento: [
    { title: 'Cinema', href: '/cinema' },
    { title: 'Eventos', href: '/eventos' },
    { title: 'Blog', href: '/blog' },
  ],
};
