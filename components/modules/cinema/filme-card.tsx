'use client';

import { useState } from 'react';
import Image from 'next/image';
import { getStrapiMedia } from '@/lib/strapi/utils';
import { cn } from '@/lib/utils/cn';
import type { Filme } from '@/types/strapi';

interface FilmeCardProps {
  filme: Filme;
  className?: string;
}


export default function FilmeCard({ filme, className }: FilmeCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const posterUrl = getStrapiMedia(filme.poster);
  
  // Agrupa sessões por horário para exibição
  const sessoesAgrupadas = filme.sessoes?.reduce((acc, sessao) => {
    const horario = sessao.horario;
    if (!acc[horario]) {
      acc[horario] = {
        horario,
        tipo3D: sessao.tipo3D,
        tipoLegendado: sessao.tipoLegendado,
      };
    }
    return acc;
  }, {} as Record<string, { horario: string; tipo3D: boolean; tipoLegendado: boolean }>);

  const sessoesArray = sessoesAgrupadas ? Object.values(sessoesAgrupadas).slice(0, 4) : [];

  return (
    <div
      className={cn('group flex w-full flex-col items-start', className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Poster Container */}
      <div className="relative w-full overflow-hidden rounded-[20px]" style={{ aspectRatio: '360/520' }}>
        <Image
          src={posterUrl}
          alt={filme.titulo}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 360px"
          priority
        />

        {/* Badge Classificação Indicativa */}
        <div className="absolute right-[11px] top-[11px] flex size-8 items-center justify-center rounded-lg bg-[#f3d73f]">
          <p className="text-sm font-bold leading-normal text-white">
            {filme.classificacaoIndicativa}
          </p>
        </div>

        {/* Estado Default - Botão More */}
        {!isHovered && (
          <button
            className="absolute bottom-5 right-5 flex size-12 items-center justify-center rounded-xl border border-border bg-white/20 p-3 backdrop-blur-sm transition-all hover:bg-white/30"
            aria-label="Ver mais opções"
          >
            <i className="hgi-stroke hgi-standard hgi-add-01 text-lg" />
          </button>
        )}

        {/* Estado Hover - Overlay com Sessões */}
        {isHovered && (
          <>
            <div className="absolute inset-0 flex flex-col items-center justify-end gap-4 bg-white/20 px-5 pb-[88px] pt-5 backdrop-blur-[10px]">
              <p className="w-full text-sm leading-[1.2] text-white">Sessões:</p>
              
              {sessoesArray.length > 0 && (
                <div className="grid h-[170px] w-full grid-cols-2 grid-rows-2 gap-2">
                  {sessoesArray.map((sessao, index) => (
                    <div
                      key={index}
                      className="flex min-w-[104px] flex-col items-start justify-center gap-2 rounded-xl border border-border bg-card px-4 py-3"
                    >
                      <p className="text-[19px] font-bold leading-[1.3] tracking-[-0.2px] text-foreground">
                        {sessao.horario}
                      </p>
                      <div className="flex w-full items-center gap-2">
                        {sessao.tipo3D && (
                          <div className="flex h-6 items-center rounded bg-secondary px-2">
                            <p className="text-sm font-bold text-secondary-foreground">3D</p>
                          </div>
                        )}
                        {sessao.tipoLegendado && (
                          <div className="flex h-6 items-center rounded bg-secondary px-2">
                            <p className="text-sm font-bold text-secondary-foreground">LEG</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Botões de Ação */}
            <button
              className="absolute bottom-5 right-5 flex size-12 items-center justify-center rounded-xl border border-border bg-white/20 p-3 backdrop-blur-sm transition-transform hover:rotate-45"
              aria-label="Fechar"
            >
              <i className="hgi-stroke hgi-standard hgi-add-01 text-lg" />
            </button>
            
            <button
              className="absolute bottom-5 right-[84px] flex size-12 items-center justify-center rounded-xl border border-border bg-background p-3 transition-all hover:bg-secondary"
              aria-label="Ver detalhes do filme"
            >
              <i className="hgi-stroke hgi-standard hgi-arrow-up-right-01 text-sm" />
            </button>
          </>
        )}
      </div>

      {/* Body - Nome do Filme */}
      <div className="w-full pt-4">
        <p className="truncate text-[23px] font-bold leading-[1.3] tracking-[-0.2px] text-foreground">
          {filme.titulo}
        </p>
      </div>
    </div>
  );
}
