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
    title: 'Lojas',
    href: '/lojas',
  },
  {
    title: 'Blog',
    href: '/blog',
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
    title: 'Vitrine Virtual',
    href: '/vitrine-virtual',
  },
  {
    title: 'Quem Somos',
    href: '/quem-somos',
  },
  {
    title: 'Contato',
    href: '/contato',
  },
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
