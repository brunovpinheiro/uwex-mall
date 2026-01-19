export interface Filme {
  id: string;
  titulo: string;
  tituloOriginal?: string;
  sinopse: string;
  classificacao: string;
  duracao: number;
  generos: string[];
  diretor: string;
  elenco: string[];
  poster: string;
  backdrop?: string;
  trailerUrl?: string;
  emCartaz: boolean;
  emBreve: boolean;
  estreia: string;
}

export interface FilmeDetalhado extends Filme {
  distribuidora: string;
  pais: string;
  ano: number;
  avaliacaoIMDB?: number;
  avaliacaoRottenTomatoes?: number;
}

export interface Sessao {
  id: string;
  filmeId: string;
  data: string;
  horario: string;
  sala: string;
  tipoSala: 'Normal' | '3D' | 'IMAX' | 'VIP';
  audio: 'Legendado' | 'Dublado';
  precos: {
    inteira: number;
    meia: number;
  };
  assentosDisponiveis: number;
  linkCompra: string;
}

export interface Programacao {
  cinema: {
    id: string;
    nome: string;
  };
  periodo: {
    inicio: string;
    fim: string;
  };
  filmes: Array<{
    filme: Filme;
    sessoes: Sessao[];
  }>;
}
