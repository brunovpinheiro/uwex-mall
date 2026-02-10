'use client';

import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Button } from '@/components/ui/button';
import LojaCard from '@/components/modules/lojas/loja-card';
import type { Loja } from '@/types/strapi';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const placeholderLojas: Loja[] = [
  { id: 1, nome: 'Arezzo', slug: 'arezzo', descricao: '', logo: { id: 1, url: 'https://placehold.co/400x500' }, categoria: { id: 1, nome: 'Moda', slug: 'moda', ordem: 1 }, localizacao: '', piso: 'Piso 1', destaque: true, ativo: true, createdAt: '', updatedAt: '' },
  { id: 2, nome: 'Acium', slug: 'acium', descricao: '', logo: { id: 2, url: 'https://placehold.co/400x500' }, categoria: { id: 1, nome: 'Moda', slug: 'moda', ordem: 1 }, localizacao: '', piso: 'Piso 1', destaque: true, ativo: true, createdAt: '', updatedAt: '' },
  { id: 3, nome: 'Adidas Performance', slug: 'adidas-performance', descricao: '', logo: { id: 3, url: 'https://placehold.co/400x500' }, categoria: { id: 1, nome: 'Moda', slug: 'moda', ordem: 1 }, localizacao: '', piso: 'Piso 1', destaque: true, ativo: true, createdAt: '', updatedAt: '' },
  { id: 4, nome: 'Havaianas', slug: 'havaianas', descricao: '', logo: { id: 4, url: 'https://placehold.co/400x500' }, categoria: { id: 1, nome: 'Moda', slug: 'moda', ordem: 1 }, localizacao: '', piso: 'Piso 1', destaque: true, ativo: true, createdAt: '', updatedAt: '' },
  { id: 5, nome: 'Ana Capri', slug: 'ana-capri', descricao: '', logo: { id: 5, url: 'https://placehold.co/400x500' }, categoria: { id: 1, nome: 'Moda', slug: 'moda', ordem: 1 }, localizacao: '', piso: 'Piso 1', destaque: true, ativo: true, createdAt: '', updatedAt: '' },
  { id: 6, nome: 'Artwalk', slug: 'artwalk', descricao: '', logo: { id: 6, url: 'https://placehold.co/400x500' }, categoria: { id: 1, nome: 'Moda', slug: 'moda', ordem: 1 }, localizacao: '', piso: 'Piso 1', destaque: true, ativo: true, createdAt: '', updatedAt: '' },
  { id: 7, nome: 'Anita Voss', slug: 'anita-voss', descricao: '', logo: { id: 7, url: 'https://placehold.co/400x500' }, categoria: { id: 1, nome: 'Moda', slug: 'moda', ordem: 1 }, localizacao: '', piso: 'Piso 1', destaque: true, ativo: true, createdAt: '', updatedAt: '' },
  { id: 8, nome: 'Bloodstream', slug: 'bloodstream', descricao: '', logo: { id: 8, url: 'https://placehold.co/400x500' }, categoria: { id: 1, nome: 'Moda', slug: 'moda', ordem: 1 }, localizacao: '', piso: 'Piso 1', destaque: true, ativo: true, createdAt: '', updatedAt: '' },
];

interface StoresSectionProps {
  lojas?: Loja[];
}

export function StoresSection({ lojas = placeholderLojas }: StoresSectionProps) {
  return (
    <section className="relative overflow-hidden bg-primary py-24">
      {/* Background pattern */}
      <div className="pointer-events-none absolute inset-0 flex items-start justify-center opacity-10">
        <svg
          width="1025"
          height="769"
          viewBox="0 0 1025 769"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-auto"
        >
          <circle cx="512" cy="384" r="380" stroke="white" strokeWidth="1" opacity="0.3" />
          <circle cx="512" cy="384" r="280" stroke="white" strokeWidth="1" opacity="0.2" />
          <circle cx="512" cy="384" r="180" stroke="white" strokeWidth="1" opacity="0.15" />
        </svg>
      </div>

      <div className="relative mx-auto flex max-w-(--max-container) flex-col gap-6 px-(--padding-global)">
        {/* Heading */}
        <div className="flex items-center gap-[30px]">
          <div className="flex flex-1 items-center gap-4">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-[20px] bg-white/20">
              <i className="hgi-stroke hgi-standard hgi-store-01 text-[32px] text-white" />
            </div>
            <h2 className="font-heading text-[33px] font-bold leading-[1.3] text-primary-foreground">
              Nossas lojas
            </h2>
          </div>

          <Button variant="outline" size="lg" asChild>
            <Link href="/lojas">
              Confira nossas lojas
              <i className="hgi-stroke hgi-standard hgi-arrow-right-01 text-xl" />
            </Link>
          </Button>
        </div>

        {/* Swiper slider for store cards */}
        <div className="-mx-(--padding-global)">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={32}
            slidesPerView="auto"
            navigation
            pagination={{ 
              clickable: true,
              dynamicBullets: true 
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              320: {
                slidesPerView: 1.2,
                spaceBetween: 16,
              },
              640: {
                slidesPerView: 2.2,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 3.5,
                spaceBetween: 32,
              },
              1280: {
                slidesPerView: 4.5,
                spaceBetween: 32,
              },
            }}
            className="px-(--padding-global) pb-12"
          >
            {lojas.map((loja) => (
              <SwiperSlide key={loja.id} className="w-[240px]!">
                <LojaCard loja={loja} variant="primary" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
