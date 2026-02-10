'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils/cn';

interface HorarioItem {
  icon: string;
  label: string;
  horarios: string[];
}

const horariosData: HorarioItem[] = [
  {
    icon: 'hgi-shopping-bag-02',
    label: 'Lojas',
    horarios: ['Seg – Sáb 10h às 22h', 'Dom e feriados 14h às 20h'],
  },
  {
    icon: 'hgi-spoon-and-fork',
    label: 'Alimentação',
    horarios: ['Seg – Qui 10h às 22h', 'Sex – Sáb 10h às 23h', 'Dom e feriados 11h às 22h'],
  },
  {
    icon: 'hgi-building-06',
    label: 'Escritório',
    horarios: ['Seg – Sex 07h às 19h'],
  },
];

export function HorariosWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen]);

  return (
    <div ref={widgetRef} className="relative inline-flex flex-col items-end">
      {/* Badge trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Horários de funcionamento"
        className={cn(
          'flex touch-manipulation items-center gap-2 rounded-full bg-[#d4f7e1] py-0.5 pr-3 pl-0.5',
          'transition-colors duration-200 motion-reduce:transition-none',
          'hover:bg-[#c8f3d9] focus-visible:ring-2 focus-visible:ring-[#22c55e] focus-visible:ring-offset-2 focus-visible:outline-none'
        )}
      >
        <span className="flex h-6 items-center gap-1 rounded-full bg-white pr-2 pl-[5px]">
          <span className="size-2 rounded-full bg-[#22c55e]" aria-hidden="true" />
          <span className="text-foreground text-[13px] leading-[1.3] font-medium">Aberto</span>
        </span>
        <span className="flex items-center gap-0.5">
          <span className="text-foreground text-[13px] leading-[1.3] font-normal">
            10h&nbsp;– 22h
          </span>
          <i
            aria-hidden="true"
            className={cn(
              'hgi-stroke hgi-standard hgi-arrow-down-01 text-foreground text-base',
              'transition-transform duration-200 motion-reduce:transition-none',
              isOpen && 'rotate-180'
            )}
          />
        </span>
      </button>

      {/* Dropdown */}
      <div
        role="region"
        aria-label="Horários de funcionamento detalhados"
        className={cn(
          'border-border bg-card absolute top-[calc(100%+4px)] right-0 z-50 flex w-[248px] flex-col gap-1 rounded-[18px] border p-1.5 shadow-[0px_4px_9px_0px_rgba(139,152,156,0.1),0px_17px_17px_0px_rgba(139,152,156,0.09),0px_37px_22px_0px_rgba(139,152,156,0.05)]',
          'transition-[opacity,transform] duration-200 motion-reduce:transition-none',
          isOpen
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-1 opacity-0'
        )}
      >
        {horariosData.map((item) => (
          <div key={item.label} className="bg-muted flex flex-col gap-1.5 rounded-xl p-4">
            <div className="flex items-center gap-2">
              <span className="flex size-8 items-center justify-center" aria-hidden="true">
                <i className={`hgi-stroke hgi-standard ${item.icon} text-foreground text-xl`} />
              </span>
              <span className="text-foreground text-sm leading-normal font-bold tracking-[0.2px]">
                {item.label}
              </span>
            </div>
            <div className="text-muted-foreground flex flex-col gap-1.5 text-sm leading-[1.3] font-normal">
              {item.horarios.map((horario) => (
                <p key={horario}>{horario}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
