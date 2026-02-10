'use client';

import Link from 'next/link';
import Image from 'next/image';
import { getStrapiMedia } from '@/lib/strapi/utils';
import { cn } from '@/lib/utils/cn';
import type { Produto } from '@/types/strapi';

interface ProdutoCardProps {
  produto: Produto;
  className?: string;
}

function formatPrice(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

function calcDiscount(original: number, promotional: number): number {
  return Math.round(((original - promotional) / original) * 100);
}

export default function ProdutoCard({ produto, className }: ProdutoCardProps) {
  // Se a imagem já tem um caminho absoluto (começa com /), usa diretamente
  // Caso contrário, usa getStrapiMedia para buscar do Strapi
  const imageUrl = produto.imagemPrincipal?.url?.startsWith('/')
    ? produto.imagemPrincipal.url
    : getStrapiMedia(produto.imagemPrincipal) ||
      `https://placehold.co/297x298/E2E8F0/585E6A?text=${encodeURIComponent(produto.nome)}`;

  const hasDiscount = produto.precoPromocional != null && produto.precoPromocional < produto.preco;
  const discount = hasDiscount ? calcDiscount(produto.preco, produto.precoPromocional!) : 0;

  return (
    <Link
      href={`/vitrine-virtual/${produto.slug}`}
      className={cn(
        'group border-border bg-card flex flex-col items-center overflow-hidden rounded-[20px] border',
        className
      )}
    >
      {/* Image */}
      <div className="relative aspect-[257.5/258] w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={produto.nome}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          sizes="(max-width: 768px) 50vw, 300px"
        />

        {/* Discount badge */}
        {hasDiscount && (
          <span className="absolute top-4 right-[15.5px] inline-flex h-6 items-center rounded-full bg-[#eb5654] px-2 text-xs font-bold text-white">
            -{discount}%
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex w-full flex-col gap-2 px-5 py-3">
        <div className="flex flex-col leading-[1.3] tracking-[0.2px]">
          <span className="text-muted-foreground text-sm font-normal">{produto.loja?.nome}</span>
          <span className="text-foreground truncate text-sm font-bold">{produto.nome}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-primary text-base leading-normal font-bold">
            {formatPrice(hasDiscount ? produto.precoPromocional! : produto.preco)}
          </span>
          {hasDiscount && (
            <span className="text-muted-foreground text-xs leading-[1.2] font-normal line-through">
              {formatPrice(produto.preco)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
