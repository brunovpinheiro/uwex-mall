import FilmeCard from '@/components/modules/cinema/filme-card';
import type { Filme } from '@/types/strapi';

// Exemplo de uso do componente FilmeCard

// Mock de dados para exemplo
const filmeExemplo: Filme = {
  id: 1,
  titulo: 'Abracadabra 2',
  slug: 'abracadabra-2',
  sinopse: 'Uma aventura mágica com as irmãs Sanderson...',
  poster: {
    id: 1,
    url: '/assets/cinema/9298b02716a950e3528a9f6eec5dcde51a8f51b3.png',
    alternativeText: 'Poster Abracadabra 2',
    width: 360,
    height: 520,
  },
  classificacaoIndicativa: 12,
  duracao: 103,
  generos: ['Fantasia', 'Comédia', 'Família'],
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
      horario: '14:00',
      tipo3D: true,
      tipoLegendado: true,
      sala: 'Sala 1',
      dataExibicao: '2026-02-09',
    },
    {
      id: 3,
      horario: '16:30',
      tipo3D: false,
      tipoLegendado: true,
      sala: 'Sala 2',
      dataExibicao: '2026-02-09',
    },
    {
      id: 4,
      horario: '19:00',
      tipo3D: true,
      tipoLegendado: false,
      sala: 'Sala 1',
      dataExibicao: '2026-02-09',
    },
  ],
  createdAt: '2026-02-09T00:00:00.000Z',
  updatedAt: '2026-02-09T00:00:00.000Z',
  publishedAt: '2026-02-09T00:00:00.000Z',
};

// Uso do componente
export default function CinemaPage() {
  return (
    <div className="container py-16">
      <h1 className="mb-8 text-4xl font-bold">Em Cartaz</h1>
      
      {/* Grid de filmes */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <FilmeCard filme={filmeExemplo} />
        {/* Adicione mais cards de filme aqui */}
      </div>
    </div>
  );
}

// Ou use em uma seção específica
export function CinemaSection() {
  return (
    <section className="bg-muted py-24">
      <div className="container">
        <div className="mb-12 flex items-center justify-between">
          <h2 className="text-3xl font-bold">Filmes em Cartaz</h2>
          <a
            href="/cinema"
            className="text-primary hover:text-primary-hover font-medium"
          >
            Ver todos os filmes
          </a>
        </div>
        
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <FilmeCard filme={filmeExemplo} />
          <FilmeCard filme={filmeExemplo} />
          <FilmeCard filme={filmeExemplo} />
        </div>
      </div>
    </section>
  );
}
