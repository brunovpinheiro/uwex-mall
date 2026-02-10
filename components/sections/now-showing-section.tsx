'use client';

import { useState } from 'react';
import { FilmeCard } from '@/components/modules/cinema';
import { cn } from '@/lib/utils/cn';
import type { Filme } from '@/types/strapi';

interface DayItem {
  date: string;
  dayOfWeek: string;
}

interface NowShowingSectionProps {
  filmes?: Filme[];
  days?: DayItem[];
}

const defaultDays: DayItem[] = [
  { date: '18/10', dayOfWeek: 'Sex' },
  { date: '19/10', dayOfWeek: 'Sáb' },
  { date: '20/10', dayOfWeek: 'Dom' },
  { date: '21/10', dayOfWeek: 'Seg' },
  { date: '22/10', dayOfWeek: 'Ter' },
];

const placeholderFilmes: Filme[] = [
  {
    id: 1,
    titulo: 'Zootopia 2',
    slug: 'zootopia-2',
    poster: { id: 1, url: 'https://placehold.co/360x520/3b82f6/ffffff?text=Zootopia+2' },
    classificacaoIndicativa: 12,
    emCartaz: true,
    emBreve: false,
    sessoes: [
      {
        id: 1,
        horario: '14:30',
        tipo3D: false,
        tipoLegendado: false,
        sala: '1',
        dataExibicao: '2025-10-18',
      },
      {
        id: 2,
        horario: '17:00',
        tipo3D: true,
        tipoLegendado: false,
        sala: '2',
        dataExibicao: '2025-10-18',
      },
      {
        id: 3,
        horario: '19:30',
        tipo3D: false,
        tipoLegendado: true,
        sala: '1',
        dataExibicao: '2025-10-19',
      },
      {
        id: 4,
        horario: '21:45',
        tipo3D: true,
        tipoLegendado: true,
        sala: '3',
        dataExibicao: '2025-10-19',
      },
      {
        id: 5,
        horario: '15:00',
        tipo3D: false,
        tipoLegendado: false,
        sala: '1',
        dataExibicao: '2025-10-20',
      },
    ],
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 2,
    titulo: 'Wicked: Parte 2',
    slug: 'wicked-parte-2',
    poster: { id: 2, url: 'https://placehold.co/360x520/22c55e/ffffff?text=Wicked+2' },
    classificacaoIndicativa: 12,
    emCartaz: true,
    emBreve: false,
    sessoes: [
      {
        id: 6,
        horario: '15:00',
        tipo3D: false,
        tipoLegendado: false,
        sala: '3',
        dataExibicao: '2025-10-18',
      },
      {
        id: 7,
        horario: '18:00',
        tipo3D: false,
        tipoLegendado: true,
        sala: '2',
        dataExibicao: '2025-10-18',
      },
      {
        id: 8,
        horario: '20:30',
        tipo3D: true,
        tipoLegendado: false,
        sala: '3',
        dataExibicao: '2025-10-20',
      },
      {
        id: 9,
        horario: '16:00',
        tipo3D: false,
        tipoLegendado: true,
        sala: '2',
        dataExibicao: '2025-10-21',
      },
    ],
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 3,
    titulo: 'Truque De Mestre – O 3º Ato',
    slug: 'truque-de-mestre-3',
    poster: { id: 3, url: 'https://placehold.co/360x520/a855f7/ffffff?text=Truque+de+Mestre' },
    classificacaoIndicativa: 12,
    emCartaz: true,
    emBreve: false,
    sessoes: [
      {
        id: 10,
        horario: '16:00',
        tipo3D: true,
        tipoLegendado: false,
        sala: '1',
        dataExibicao: '2025-10-19',
      },
      {
        id: 11,
        horario: '20:00',
        tipo3D: false,
        tipoLegendado: true,
        sala: '3',
        dataExibicao: '2025-10-19',
      },
      {
        id: 12,
        horario: '22:00',
        tipo3D: true,
        tipoLegendado: false,
        sala: '1',
        dataExibicao: '2025-10-21',
      },
      {
        id: 13,
        horario: '18:30',
        tipo3D: false,
        tipoLegendado: true,
        sala: '2',
        dataExibicao: '2025-10-22',
      },
    ],
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 4,
    titulo: 'Predador: Terras Selvagens',
    slug: 'predador-terras-selvagens',
    poster: { id: 4, url: 'https://placehold.co/360x520/ef4444/ffffff?text=Predador' },
    classificacaoIndicativa: 16,
    emCartaz: true,
    emBreve: false,
    sessoes: [
      {
        id: 14,
        horario: '21:00',
        tipo3D: true,
        tipoLegendado: false,
        sala: '2',
        dataExibicao: '2025-10-20',
      },
      {
        id: 15,
        horario: '23:00',
        tipo3D: false,
        tipoLegendado: true,
        sala: '1',
        dataExibicao: '2025-10-20',
      },
      {
        id: 16,
        horario: '19:00',
        tipo3D: true,
        tipoLegendado: false,
        sala: '3',
        dataExibicao: '2025-10-21',
      },
      {
        id: 17,
        horario: '21:30',
        tipo3D: false,
        tipoLegendado: true,
        sala: '2',
        dataExibicao: '2025-10-22',
      },
    ],
    createdAt: '',
    updatedAt: '',
  },
];

export function NowShowingSection({
  filmes = placeholderFilmes,
  days = defaultDays,
}: NowShowingSectionProps) {
  const [selectedDay, setSelectedDay] = useState(0);

  // Converter a data do formato "18/10" para "2025-10-18"
  const getFullDate = (dayDate: string) => {
    const [day, month] = dayDate.split('/');
    return `2025-${month}-${day}`;
  };

  // Filtrar filmes que têm sessão na data selecionada
  const filteredFilmes = filmes
    .map((filme) => {
      const selectedDate = getFullDate(days[selectedDay].date);
      const sessoesNoDia =
        filme.sessoes?.filter((sessao) => sessao.dataExibicao === selectedDate) || [];

      if (sessoesNoDia.length > 0) {
        return {
          ...filme,
          sessoes: sessoesNoDia,
        };
      }
      return null;
    })
    .filter((filme): filme is Filme => filme !== null);

  return (
    <section className="to-background bg-gradient-to-b from-[#f3f5f7] px-20 py-28">
      <div className="container mx-auto">
        {/* Title */}
        <h2 className="font-heading text-foreground mb-8 text-center text-[33px] leading-[1.3] font-bold">
          Filmes em Cartaz
        </h2>

        {/* Content: Day picker + Movie cards */}
        <div className="flex items-start gap-8">
          {/* Day selector */}
          <div className="flex shrink-0 flex-col gap-4">
            {days.map((day, index) => (
              <button
                key={index}
                onClick={() => setSelectedDay(index)}
                className={cn(
                  'flex flex-col items-center justify-center rounded-[20px] px-6 py-3 transition-colors',
                  index === selectedDay
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
                )}
              >
                <span className="text-base leading-normal font-bold">{day.date}</span>
                <span className="text-sm leading-normal font-medium tracking-[0.2px]">
                  {day.dayOfWeek}
                </span>
              </button>
            ))}
          </div>

          {/* Movie cards */}
          <div className="flex min-w-0 flex-1 gap-6">
            {filteredFilmes.length > 0 ? (
              filteredFilmes.map((filme) => (
                <div key={filme.id} className="max-w-[360px] min-w-0 flex-1">
                  <FilmeCard filme={filme} />
                </div>
              ))
            ) : (
              <div className="flex min-w-0 flex-1 items-center justify-center py-12">
                <p className="text-muted-foreground">Nenhum filme em exibição nesta data</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
