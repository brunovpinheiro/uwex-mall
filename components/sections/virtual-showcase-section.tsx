'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ProdutoCard from '@/components/modules/vitrine/produto-card';
import type { Produto } from '@/types/strapi';


const placeholderProdutos: Produto[] = [
  {
    id: 1,
    nome: 'Purus eget orci nullam tellus faucibus augue viverra aliquam ultricies nec enim ullamcorper quam.',
    slug: 'produto-1',
    descricao: '',
    preco: 320.0,
    precoPromocional: 289.0,
    imagemPrincipal: {
      id: 1,
      url: '/0d3dd4a35a31c9bb57ad8b4e59f4112319654d20.png',
    },
    categoria: { id: 1, nome: 'Eletrônicos', slug: 'eletronicos' },
    loja: {
      id: 1,
      nome: 'iPlace',
      slug: 'iplace',
      descricao: '',
      logo: { id: 1, url: '' },
      categoria: { id: 1, nome: 'Tecnologia', slug: 'tecnologia', ordem: 1 },
      localizacao: '',
      piso: 'Piso 1',
      destaque: true,
      ativo: true,
      createdAt: '',
      updatedAt: '',
    },
    destaque: true,
    ativo: true,
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 2,
    nome: 'Varius netus habitant aliquam semper adipiscing lobortis eget et ut pretium rutrum non dignissim.',
    slug: 'produto-2',
    descricao: '',
    preco: 320.0,
    precoPromocional: 289.0,
    imagemPrincipal: {
      id: 2,
      url: '/431e83ae865ef92c639b894c0b6c73d68efe7256.png',
    },
    categoria: { id: 2, nome: 'Calçados', slug: 'calcados' },
    loja: {
      id: 2,
      nome: 'Authentic Feet',
      slug: 'authentic-feet',
      descricao: '',
      logo: { id: 2, url: '' },
      categoria: { id: 2, nome: 'Moda', slug: 'moda', ordem: 2 },
      localizacao: '',
      piso: 'Piso 1',
      destaque: true,
      ativo: true,
      createdAt: '',
      updatedAt: '',
    },
    destaque: true,
    ativo: true,
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 3,
    nome: 'Nulla orci a id consectetur feugiat ut convallis massa eu scelerisque malesuada mattis dignissim.',
    slug: 'produto-3',
    descricao: '',
    preco: 320.0,
    precoPromocional: 289.0,
    imagemPrincipal: {
      id: 3,
      url: '/877a34b6e172da9b7c6449100c67eae4065fe4e9.png',
    },
    categoria: { id: 3, nome: 'Cosméticos', slug: 'cosmeticos' },
    loja: {
      id: 3,
      nome: 'O Boticário',
      slug: 'o-boticario',
      descricao: '',
      logo: { id: 3, url: '' },
      categoria: { id: 3, nome: 'Beleza', slug: 'beleza', ordem: 3 },
      localizacao: '',
      piso: 'Piso 1',
      destaque: true,
      ativo: true,
      createdAt: '',
      updatedAt: '',
    },
    destaque: true,
    ativo: true,
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 4,
    nome: 'Bibendum lectus facilisi eu consectetur sed faucibus nec neque sit et ac in et faucibus maecenas.',
    slug: 'produto-4',
    descricao: '',
    preco: 320.0,
    precoPromocional: 289.0,
    imagemPrincipal: {
      id: 4,
      url: '/900841830cc032e0ac698d4d51e5c8b908115d12.png',
    },
    categoria: { id: 2, nome: 'Calçados', slug: 'calcados' },
    loja: {
      id: 2,
      nome: 'Authentic Feet',
      slug: 'authentic-feet',
      descricao: '',
      logo: { id: 2, url: '' },
      categoria: { id: 2, nome: 'Moda', slug: 'moda', ordem: 2 },
      localizacao: '',
      piso: 'Piso 1',
      destaque: true,
      ativo: true,
      createdAt: '',
      updatedAt: '',
    },
    destaque: true,
    ativo: true,
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 5,
    nome: 'Congue blandit diam id nisl tellus nec. Ac tortor tellus habitant commodo imperdiet pellentesque.',
    slug: 'produto-5',
    descricao: '',
    preco: 320.0,
    precoPromocional: 289.0,
    imagemPrincipal: {
      id: 5,
      url: '/8f74fee7ed8acf023d5ca97f09f01b5e30f406e9.png',
    },
    categoria: { id: 3, nome: 'Cosméticos', slug: 'cosmeticos' },
    loja: {
      id: 3,
      nome: 'O Boticário',
      slug: 'o-boticario',
      descricao: '',
      logo: { id: 3, url: '' },
      categoria: { id: 3, nome: 'Beleza', slug: 'beleza', ordem: 3 },
      localizacao: '',
      piso: 'Piso 1',
      destaque: true,
      ativo: true,
      createdAt: '',
      updatedAt: '',
    },
    destaque: true,
    ativo: true,
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 6,
    nome: 'Sed dolor non tristique bibendum elementum. Euismod nisi purus a eget leo lorem pulvinar congue.',
    slug: 'produto-6',
    descricao: '',
    preco: 320.0,
    precoPromocional: 289.0,
    imagemPrincipal: {
      id: 6,
      url: '/b5764b4636a0dd023afcf194fc49ea8cfff8033d.png',
    },
    categoria: { id: 4, nome: 'Relógios', slug: 'relogios' },
    loja: {
      id: 4,
      nome: 'BigBen',
      slug: 'bigben',
      descricao: '',
      logo: { id: 4, url: '' },
      categoria: { id: 4, nome: 'Acessórios', slug: 'acessorios', ordem: 4 },
      localizacao: '',
      piso: 'Piso 1',
      destaque: true,
      ativo: true,
      createdAt: '',
      updatedAt: '',
    },
    destaque: true,
    ativo: true,
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 7,
    nome: 'Nibh curabitur euismod blandit fermentum. Dictum molestie porta tellus sit vestibulum vestibulum.',
    slug: 'produto-7',
    descricao: '',
    preco: 320.0,
    precoPromocional: 289.0,
    imagemPrincipal: {
      id: 7,
      url: '/b861f3e3fb7ae811574b36e4e77dc3f34ea63a13.png',
    },
    categoria: { id: 1, nome: 'Eletrônicos', slug: 'eletronicos' },
    loja: {
      id: 1,
      nome: 'iPlace',
      slug: 'iplace',
      descricao: '',
      logo: { id: 1, url: '' },
      categoria: { id: 1, nome: 'Tecnologia', slug: 'tecnologia', ordem: 1 },
      localizacao: '',
      piso: 'Piso 1',
      destaque: true,
      ativo: true,
      createdAt: '',
      updatedAt: '',
    },
    destaque: true,
    ativo: true,
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 8,
    nome: 'Eget egestas tincidunt purus integer ullamcorper. Egestas tincidunt lectus tortor placerat massa.',
    slug: 'produto-8',
    descricao: '',
    preco: 320.0,
    precoPromocional: 289.0,
    imagemPrincipal: {
      id: 8,
      url: '/3a00d75b6e99bc83987d48abe901f521610ff421.png',
    },
    categoria: { id: 4, nome: 'Relógios', slug: 'relogios' },
    loja: {
      id: 4,
      nome: 'BigBen',
      slug: 'bigben',
      descricao: '',
      logo: { id: 4, url: '' },
      categoria: { id: 4, nome: 'Acessórios', slug: 'acessorios', ordem: 4 },
      localizacao: '',
      piso: 'Piso 1',
      destaque: true,
      ativo: true,
      createdAt: '',
      updatedAt: '',
    },
    destaque: true,
    ativo: true,
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 9,
    nome: 'Eu erat phasellus arcu est blandit in sed facilisis. Tellus feugiat proin amet tortor adipiscing.',
    slug: 'produto-9',
    descricao: '',
    preco: 320.0,
    precoPromocional: 289.0,
    imagemPrincipal: {
      id: 9,
      url: '/4e5e7726ed915fbb5be403d3a2b1a7158aaa37ce.png',
    },
    categoria: { id: 1, nome: 'Eletrônicos', slug: 'eletronicos' },
    loja: {
      id: 1,
      nome: 'iPlace',
      slug: 'iplace',
      descricao: '',
      logo: { id: 1, url: '' },
      categoria: { id: 1, nome: 'Tecnologia', slug: 'tecnologia', ordem: 1 },
      localizacao: '',
      piso: 'Piso 1',
      destaque: true,
      ativo: true,
      createdAt: '',
      updatedAt: '',
    },
    destaque: true,
    ativo: true,
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 10,
    nome: 'Cras id dui amet sit urna fringilla urna convallis nulla faucibus at sit id et enim pellentesque.',
    slug: 'produto-10',
    descricao: '',
    preco: 320.0,
    precoPromocional: 289.0,
    imagemPrincipal: {
      id: 10,
      url: '/b363b021cf3dac1fcccb7e3775056c41e13dd231.png',
    },
    categoria: { id: 2, nome: 'Calçados', slug: 'calcados' },
    loja: {
      id: 2,
      nome: 'Authentic Feet',
      slug: 'authentic-feet',
      descricao: '',
      logo: { id: 2, url: '' },
      categoria: { id: 2, nome: 'Moda', slug: 'moda', ordem: 2 },
      localizacao: '',
      piso: 'Piso 1',
      destaque: true,
      ativo: true,
      createdAt: '',
      updatedAt: '',
    },
    destaque: true,
    ativo: true,
    createdAt: '',
    updatedAt: '',
  },
];

interface VirtualShowcaseSectionProps {
  produtos?: Produto[];
}

export function VirtualShowcaseSection({
  produtos = placeholderProdutos,
}: VirtualShowcaseSectionProps) {
  return (
    <section className="relative overflow-hidden px-(--padding-global) py-18">
      <div className="relative container mx-auto flex flex-col items-center gap-10">
        {/* Heading */}
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-primary flex size-14 shrink-0 items-center justify-center rounded-[20px] bg-white p-2">
              <i className="hgi-stroke hgi-standard hgi-shopping-bag-02 text-[32px]" />
            </div>
            <h2 className="font-heading text-foreground text-[33px] leading-[1.3] font-bold">
              Vitrine Virtual
            </h2>
          </div>
        </div>

        {/* Grid de produtos */}
        <div className="grid w-full grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {produtos.map((produto) => (
            <ProdutoCard key={produto.id} produto={produto} />
          ))}
        </div>

        {/* CTA Button */}
        <Button size="lg" asChild>
          <Link href="/vitrine-virtual">Ver todos os produtos</Link>
        </Button>
      </div>
    </section>
  );
}
