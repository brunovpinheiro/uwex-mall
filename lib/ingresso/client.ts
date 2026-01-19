import type { Filme, FilmeDetalhado, Sessao, Programacao } from '@/types/cinema';

interface IngressoConfig {
  cinemaId: string;
  apiKey: string;
  baseUrl: string;
}

export class IngressoClient {
  constructor(private config: IngressoConfig) {}

  async getFilmesEmCartaz(): Promise<Filme[]> {
    const response = await fetch(
      `${this.config.baseUrl}/cinema/${this.config.cinemaId}/filmes-em-cartaz`,
      {
        headers: {
          Authorization: `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
        },
        next: { revalidate: 1800 },
      }
    );

    if (!response.ok) {
      throw new Error('Falha ao buscar filmes em cartaz');
    }

    return response.json();
  }

  async getFilmesEmBreve(): Promise<Filme[]> {
    const response = await fetch(
      `${this.config.baseUrl}/cinema/${this.config.cinemaId}/filmes-em-breve`,
      {
        headers: {
          Authorization: `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
        },
        next: { revalidate: 1800 },
      }
    );

    if (!response.ok) {
      throw new Error('Falha ao buscar filmes em breve');
    }

    return response.json();
  }

  async getFilmeById(id: string): Promise<FilmeDetalhado> {
    const response = await fetch(`${this.config.baseUrl}/filmes/${id}`, {
      headers: {
        Authorization: `Bearer ${this.config.apiKey}`,
      },
      next: { revalidate: 1800 },
    });

    if (!response.ok) {
      throw new Error('Falha ao buscar detalhes do filme');
    }

    return response.json();
  }

  async getSessoesByFilme(filmeId: string, data?: string): Promise<Sessao[]> {
    const dataParam = data || new Date().toISOString().split('T')[0];

    const response = await fetch(
      `${this.config.baseUrl}/cinema/${this.config.cinemaId}/filmes/${filmeId}/sessoes?data=${dataParam}`,
      {
        headers: {
          Authorization: `Bearer ${this.config.apiKey}`,
        },
        next: { revalidate: 900 },
      }
    );

    if (!response.ok) {
      throw new Error('Falha ao buscar sessões');
    }

    return response.json();
  }

  async getProgramacao(dataInicio: string, dataFim: string): Promise<Programacao> {
    const response = await fetch(
      `${this.config.baseUrl}/cinema/${this.config.cinemaId}/programacao?inicio=${dataInicio}&fim=${dataFim}`,
      {
        headers: {
          Authorization: `Bearer ${this.config.apiKey}`,
        },
        next: { revalidate: 1800 },
      }
    );

    if (!response.ok) {
      throw new Error('Falha ao buscar programação');
    }

    return response.json();
  }
}

export const ingressoClient = new IngressoClient({
  cinemaId: process.env.INGRESSO_CINEMA_ID || '',
  apiKey: process.env.INGRESSO_API_KEY || '',
  baseUrl: process.env.INGRESSO_API_URL || 'https://api.ingresso.com/v1',
});
