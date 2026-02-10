'use client';

import { FilmeCard } from '@/components/modules/cinema';
import type { Filme } from '@/types/strapi';

// Dados de exemplo baseados no design do Figma
const filmeAbracadabra: Filme = {
  id: 1,
  titulo: 'Abracadabra 2',
  slug: 'abracadabra-2',
  sinopse: 'Faz 29 anos desde que alguém acendeu a Vela da Chama Negra e ressuscitou as irmãs Sanderson do século XVII, e elas estão procurando vingança.',
  poster: {
    id: 1,
    url: 'https://image.tmdb.org/t/p/w500/wd4Xke48kBIBGS0FhWDVLrEMIvV.jpg',
    alternativeText: 'Poster Abracadabra 2',
    width: 360,
    height: 520,
  },
  classificacaoIndicativa: 12,
  duracao: 103,
  generos: ['Fantasia', 'Comédia', 'Família'],
  diretor: 'Anne Fletcher',
  elenco: ['Bette Midler', 'Sarah Jessica Parker', 'Kathy Najimy'],
  emCartaz: true,
  emBreve: false,
  sessoes: [
    {
      id: 1,
      horario: '12:00',
      tipo3D: true,
      tipoLegendado: true,
      sala: 'Sala 1',
      dataExibicao: '2026-02-09',
    },
    {
      id: 2,
      horario: '12:00',
      tipo3D: true,
      tipoLegendado: true,
      sala: 'Sala 2',
      dataExibicao: '2026-02-09',
    },
    {
      id: 3,
      horario: '14:00',
      tipo3D: true,
      tipoLegendado: true,
      sala: 'Sala 1',
      dataExibicao: '2026-02-09',
    },
    {
      id: 4,
      horario: '14:00',
      tipo3D: true,
      tipoLegendado: true,
      sala: 'Sala 3',
      dataExibicao: '2026-02-09',
    },
  ],
  createdAt: '2026-02-09T00:00:00.000Z',
  updatedAt: '2026-02-09T00:00:00.000Z',
  publishedAt: '2026-02-09T00:00:00.000Z',
};

export default function CinemaDemo() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container py-8">
          <h1 className="text-4xl font-bold text-foreground">
            Card Filme - Demonstração
          </h1>
          <p className="mt-2 text-muted-foreground">
            Componente implementado com base no design do Figma
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="container py-16">
        {/* Seção: Card Individual */}
        <section className="mb-20">
          <div className="mb-8">
            <h2 className="mb-2 text-3xl font-bold">Card Individual</h2>
            <p className="text-muted-foreground">
              Passe o mouse sobre o card para ver as sessões disponíveis
            </p>
          </div>
          
          <div className="flex justify-center">
            <div className="w-[360px]">
              <FilmeCard filme={filmeAbracadabra} />
            </div>
          </div>
        </section>

        {/* Seção: Grid Responsivo */}
        <section className="mb-20">
          <div className="mb-8">
            <h2 className="mb-2 text-3xl font-bold">Grid Responsivo</h2>
            <p className="text-muted-foreground">
              Layout que se adapta a diferentes tamanhos de tela
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <FilmeCard filme={filmeAbracadabra} />
            <FilmeCard filme={{ ...filmeAbracadabra, id: 2, titulo: 'Filme Exemplo 2' }} />
            <FilmeCard filme={{ ...filmeAbracadabra, id: 3, titulo: 'Filme Exemplo 3', classificacaoIndicativa: 14 }} />
            <FilmeCard filme={{ ...filmeAbracadabra, id: 4, titulo: 'Filme Exemplo 4', classificacaoIndicativa: 16 }} />
          </div>
        </section>

        {/* Seção: Carrossel */}
        <section className="mb-20">
          <div className="mb-8">
            <h2 className="mb-2 text-3xl font-bold">Carrossel Horizontal</h2>
            <p className="text-muted-foreground">
              Layout de rolagem horizontal para destacar filmes
            </p>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-4">
            <FilmeCard filme={filmeAbracadabra} className="w-[360px] shrink-0" />
            <FilmeCard filme={{ ...filmeAbracadabra, id: 5, titulo: 'Filme em Destaque 2' }} className="w-[360px] shrink-0" />
            <FilmeCard filme={{ ...filmeAbracadabra, id: 6, titulo: 'Filme em Destaque 3' }} className="w-[360px] shrink-0" />
            <FilmeCard filme={{ ...filmeAbracadabra, id: 7, titulo: 'Filme em Destaque 4' }} className="w-[360px] shrink-0" />
          </div>
        </section>

        {/* Seção: Variações */}
        <section>
          <div className="mb-8">
            <h2 className="mb-2 text-3xl font-bold">Variações</h2>
            <p className="text-muted-foreground">
              Diferentes classificações indicativas e sessões
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Livre */}
            <FilmeCard 
              filme={{ 
                ...filmeAbracadabra, 
                id: 8,
                titulo: 'Filme Livre',
                classificacaoIndicativa: 0,
              }} 
            />

            {/* Sem sessões */}
            <FilmeCard 
              filme={{ 
                ...filmeAbracadabra, 
                id: 9,
                titulo: 'Em Breve',
                classificacaoIndicativa: 10,
                sessoes: [],
              }} 
            />

            {/* 18 anos */}
            <FilmeCard 
              filme={{ 
                ...filmeAbracadabra, 
                id: 10,
                titulo: 'Filme +18',
                classificacaoIndicativa: 18,
              }} 
            />
          </div>
        </section>

        {/* Informações Técnicas */}
        <section className="mt-20 rounded-2xl border border-border bg-card p-8">
          <h2 className="mb-4 text-2xl font-bold">Informações Técnicas</h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-2 font-semibold text-foreground">Características</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>✓ Design responsivo</li>
                <li>✓ Estados interativos (hover)</li>
                <li>✓ Classificação indicativa visual</li>
                <li>✓ Grid de sessões (até 4)</li>
                <li>✓ Badges 3D e Legendado</li>
                <li>✓ Integração com Strapi CMS</li>
                <li>✓ Otimização de imagens Next.js</li>
                <li>✓ Acessibilidade ARIA</li>
              </ul>
            </div>

            <div>
              <h3 className="mb-2 font-semibold text-foreground">Especificações</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Largura: 360px (flexível)</li>
                <li>• Aspect Ratio: 360:520</li>
                <li>• Border Radius: 20px</li>
                <li>• Backdrop Blur: 10px (hover)</li>
                <li>• Transições suaves</li>
                <li>• Grid 2x2 para sessões</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 border-t border-border pt-6">
            <h3 className="mb-2 font-semibold text-foreground">Design Original</h3>
            <p className="text-sm text-muted-foreground">
              Figma: Website - Shopping Estação V3
              <br />
              Node ID: 4241-13628
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
