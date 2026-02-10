'use client';

import Link from 'next/link';

interface AmenityItem {
  id: number;
  title: string;
  icon: string;
  href?: string;
}

const amenities: AmenityItem[] = [
  { id: 1, title: 'Bicicletário', icon: 'bicycle-01' },
  { id: 2, title: 'Espaço Família', icon: 'user-group' },
  { id: 3, title: 'Coworking', icon: 'briefcase-01' },
  { id: 4, title: 'Estação Kids', icon: 'smile' },
  { id: 5, title: 'Cadeira de Rodas e Carrinho Pet', icon: 'wheelchair' },
  { id: 6, title: 'Parada da Linha de Ônibus de Turismo', icon: 'bus-01' },
  { id: 7, title: 'Empréstimo de Carrinho de Bebê', icon: 'baby-02' },
  { id: 8, title: 'Pet Friendly', icon: 'paw' },
  { id: 9, title: 'Empréstimo de Power Bank', icon: 'battery-charging-01' },
  { id: 10, title: 'Vaga para Carros Elétricos', icon: 'car-01' },
  { id: 11, title: 'Espaço para Recargas', icon: 'battery-charging-01' },
  { id: 12, title: 'Via Fácil', icon: 'checkmark-circle-01' },
];

export function AmenitiesSection() {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-[#e1f6fa] to-white px-20 py-20">
      {/* Background pattern */}
      <div className="pointer-events-none absolute top-0 left-1/2 h-full w-[1580px] -translate-x-1/2 opacity-10">
        <div className="absolute top-0 left-1/2 h-[769px] w-[769px] -translate-x-1/2">
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(50% 50% at 50% 50%, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 95.313%)',
              transform: 'matrix(1, 0, 0, -1, 0, 0)',
            }}
          />
        </div>
        <div className="absolute top-0 left-1/2 h-[769px] w-[1025px] -translate-x-1/2">
          <svg
            width="1025"
            height="769"
            viewBox="0 0 1025 769"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="size-full"
          >
            <circle cx="512" cy="384" r="380" stroke="white" strokeWidth="1" opacity="0.3" />
            <circle cx="512" cy="384" r="280" stroke="white" strokeWidth="1" opacity="0.2" />
            <circle cx="512" cy="384" r="180" stroke="white" strokeWidth="1" opacity="0.15" />
          </svg>
        </div>
      </div>

      <div className="relative container mx-auto flex flex-col gap-8">
        {/* Heading */}
        <div className="flex items-center justify-center">
          <h2 className="font-heading text-foreground text-[33px] leading-[1.3] font-bold">
            Tudo para sua visita ser melhor
          </h2>
        </div>

        {/* Content layout with image and grid */}
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-stretch">
          {/* Left side: Mascot image */}
          <div className="h-auto w-full shrink-0 lg:w-[328px]">
            <div className="bg-primary relative h-full w-full overflow-hidden rounded-[20px]">
              <img
                src="/assets/banner-comodidades.png"
                alt="Shopping Estação Mascote"
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>

          {/* Right side: Grid of amenities */}
          <div className="flex flex-1 flex-wrap content-start gap-4">
            {amenities.map((amenity) => (
              <Link
                key={amenity.id}
                href={amenity.href || '#'}
                className="group border-border bg-card hover:border-primary/20 relative flex min-w-[280px] flex-1 flex-col gap-4 rounded-[16px] border p-5 transition-all hover:shadow-md sm:max-w-[472px]"
              >
                {/* Icon */}
                <div className="flex size-8 items-center justify-center">
                  <i
                    className={`hgi-stroke hgi-standard hgi-${amenity.icon} text-primary text-[32px]`}
                  />
                </div>

                {/* Title */}
                <p className="text-foreground font-sans text-base leading-normal font-bold">
                  {amenity.title}
                </p>

                {/* Arrow icon */}
                <div className="absolute top-[19px] right-[19px]">
                  <i className="hgi-stroke hgi-standard hgi-arrow-up-right-01 text-sm" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
