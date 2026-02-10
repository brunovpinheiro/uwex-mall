'use client';

import Link from 'next/link';
import Image from 'next/image';
import { getStrapiMedia } from '@/lib/strapi/utils';
import { cn } from '@/lib/utils/cn';
import type { Loja } from '@/types/strapi';

interface LojaCardProps {
  loja: Loja;
  variant?: 'light' | 'primary';
}


export default function LojaCard({ loja, variant = 'light' }: LojaCardProps) {
  const logoUrl = getStrapiMedia(loja.logo);
  const isPrimary = variant === 'primary';
  
  // Use placeholder if no logo URL is available
  const imageUrl = logoUrl || `https://placehold.co/400x500/00B1E1/FFFFFF?text=${encodeURIComponent(loja.nome)}`;

  return (
    <Link
      href={`/lojas/${loja.slug}`}
      className="group flex w-full flex-col items-start"
    >
      {/* Image container */}
      <div
        className={cn(
          'relative w-full overflow-hidden rounded-[20px] border',
          isPrimary
            ? 'aspect-297/372 border-[rgba(0,177,225,0.2)]'
            : 'aspect-square border-[#dae2f0]'
        )}
      >
        <Image
          src={imageUrl}
          alt={loja.nome}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 340px"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-[rgba(16,24,40,0.1)] opacity-0 backdrop-blur-xs transition-opacity duration-300 group-hover:opacity-100">
          <span className="inline-flex h-10 items-center gap-2 rounded-[12px] border border-border bg-background px-5 pr-4 text-base font-semibold text-foreground">
            Saiba mais
            <i className="hgi-stroke hgi-standard hgi-arrow-up-right-01 text-sm" />
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="w-full px-4 pb-4 pt-2">
        <p
          className={cn(
            'truncate text-base font-bold',
            isPrimary ? 'text-primary-foreground' : 'text-[#101828]'
          )}
        >
          {loja.nome}
        </p>
        <p
          className={cn(
            'text-sm font-medium tracking-[0.2px]',
            isPrimary ? 'text-[#e1f6fa]' : 'text-muted-foreground'
          )}
        >
          {loja.piso}
        </p>
      </div>
    </Link>
  );
}
