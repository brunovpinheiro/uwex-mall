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

interface HorarioStatus {
  isOpen: boolean;
  currentSchedule: string | null;
  nextChange: string | null;
}

function parseHorario(horarioStr: string, currentDate: Date): { isOpen: boolean; schedule: string } | null {
  const dayOfWeek = currentDate.getDay(); // 0 = Dom, 1 = Seg, ..., 6 = Sáb
  const currentHour = currentDate.getHours();
  const currentMinute = currentDate.getMinutes();
  const currentTimeInMinutes = currentHour * 60 + currentMinute;

  // Parse dias da semana
  let matchesDayOfWeek = false;
  
  if (horarioStr.includes('Dom') || horarioStr.includes('feriados')) {
    matchesDayOfWeek = dayOfWeek === 0;
  } else if (horarioStr.includes('Seg – Sáb')) {
    matchesDayOfWeek = dayOfWeek >= 1 && dayOfWeek <= 6;
  } else if (horarioStr.includes('Seg – Qui')) {
    matchesDayOfWeek = dayOfWeek >= 1 && dayOfWeek <= 4;
  } else if (horarioStr.includes('Seg – Sex')) {
    matchesDayOfWeek = dayOfWeek >= 1 && dayOfWeek <= 5;
  } else if (horarioStr.includes('Sex – Sáb')) {
    matchesDayOfWeek = dayOfWeek === 5 || dayOfWeek === 6;
  }

  if (!matchesDayOfWeek) {
    return null;
  }

  // Parse horários (ex: "10h às 22h")
  const timeMatch = horarioStr.match(/(\d+)h\s+às\s+(\d+)h/);
  if (!timeMatch) {
    return null;
  }

  const openHour = parseInt(timeMatch[1]);
  const closeHour = parseInt(timeMatch[2]);
  const openTimeInMinutes = openHour * 60;
  const closeTimeInMinutes = closeHour * 60;

  const isOpen = currentTimeInMinutes >= openTimeInMinutes && currentTimeInMinutes < closeTimeInMinutes;
  const schedule = `${openHour}h – ${closeHour}h`;

  return { isOpen, schedule };
}

function getHorarioStatus(date: Date = new Date()): HorarioStatus {
  // Verifica se alguma categoria está aberta (prioriza Lojas)
  for (const category of horariosData) {
    for (const horario of category.horarios) {
      const result = parseHorario(horario, date);
      if (result && result.isOpen) {
        return {
          isOpen: true,
          currentSchedule: result.schedule,
          nextChange: null,
        };
      }
    }
  }

  // Se nenhuma categoria está aberta, procura o próximo horário
  // Para simplificar, retorna o horário das lojas
  const lojasHorarios = horariosData[0].horarios;
  const dayOfWeek = date.getDay();
  
  let nextSchedule = '10h – 22h'; // Default para dias de semana
  if (dayOfWeek === 0) {
    nextSchedule = '14h – 20h'; // Domingo
  }

  return {
    isOpen: false,
    currentSchedule: null,
    nextChange: nextSchedule,
  };
}

export function HorariosWidget() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [horarioStatus, setHorarioStatus] = useState<HorarioStatus>(() => getHorarioStatus());
  const widgetRef = useRef<HTMLDivElement>(null);

  // Atualiza o status a cada minuto
  useEffect(() => {
    const updateStatus = () => {
      setHorarioStatus(getHorarioStatus());
    };

    // Atualiza imediatamente
    updateStatus();

    // Configura intervalo para atualizar a cada minuto
    const interval = setInterval(updateStatus, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === 'Escape' && isDropdownOpen) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isDropdownOpen]);

  return (
    <div ref={widgetRef} className="relative inline-flex flex-col items-end">
      {/* Badge trigger */}
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        aria-expanded={isDropdownOpen}
        aria-haspopup="true"
        aria-label="Horários de funcionamento"
        className={cn(
          'flex touch-manipulation items-center gap-2 rounded-full py-0.5 pr-3 pl-0.5',
          'transition-colors duration-200 motion-reduce:transition-none',
          'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
          horarioStatus.isOpen
            ? 'bg-[#d4f7e1] hover:bg-[#c8f3d9] focus-visible:ring-[#22c55e]'
            : 'bg-red-100 hover:bg-red-200 focus-visible:ring-red-500'
        )}
      >
        <span className="flex h-6 items-center gap-1 rounded-full bg-white pr-2 pl-[5px]">
          <span 
            className={cn(
              "size-2 rounded-full",
              horarioStatus.isOpen ? "bg-[#22c55e]" : "bg-red-500"
            )}
            aria-hidden="true" 
          />
          <span className="text-foreground text-[13px] leading-[1.3] font-medium">
            {horarioStatus.isOpen ? 'Aberto' : 'Fechado'}
          </span>
        </span>
        <span className="flex items-center gap-0.5">
          <span className="text-foreground text-[13px] leading-[1.3] font-normal">
            {horarioStatus.isOpen 
              ? horarioStatus.currentSchedule 
              : (horarioStatus.nextChange ? `Abre ${horarioStatus.nextChange.split(' – ')[0]}` : 'Ver horários')}
          </span>
          <i
            aria-hidden="true"
            className={cn(
              'hgi-stroke hgi-standard hgi-arrow-down-01 text-foreground text-base',
              'transition-transform duration-200 motion-reduce:transition-none',
              isDropdownOpen && 'rotate-180'
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
          isDropdownOpen
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
