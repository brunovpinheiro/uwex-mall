'use client';

import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface BannerItem {
  id: number;
  image: string;
  alt: string;
  link?: string;
}

interface BannersSectionProps {
  banners?: BannerItem[];
}

const placeholderBanners: BannerItem[] = [
  {
    id: 1,
    image: '/f6a7850e4d871bdbe838c5b287a12a7762af1270.png',
    alt: 'Banner Podi - Baixe o app oficial do shopping',
    link: '#',
  },
  {
    id: 2,
    image: 'https://placehold.co/1408x320/3b82f6/ffffff?text=Banner+2',
    alt: 'Banner 2',
    link: '#',
  },
  {
    id: 3,
    image: 'https://placehold.co/1408x320/22c55e/ffffff?text=Banner+3',
    alt: 'Banner 3',
    link: '#',
  },
];

export function BannersSection({ banners = placeholderBanners }: BannersSectionProps) {
  return (
    <section className="bg-background flex items-center justify-center px-20 pb-24">
      <div className="w-full max-w-[1408px] overflow-hidden rounded-[24px] shadow-[0px_20px_24px_-4px_rgba(16,24,40,0.03),0px_8px_8px_-4px_rgba(16,24,40,0.03)]">
        <div className="overflow-hidden rounded-[20px]">
          <Swiper
            modules={[Navigation, Pagination, A11y, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={banners.length > 1}
            className="banners-swiper"
          >
            {banners.map((banner) => (
              <SwiperSlide key={banner.id}>
                {banner.link ? (
                  <a
                    href={banner.link}
                    className="block w-full"
                    aria-label={banner.alt}
                  >
                    <div className="relative aspect-1408/320 w-full">
                      <Image
                        src={banner.image}
                        alt={banner.alt}
                        fill
                        className="object-cover"
                        priority={banner.id === 1}
                      />
                    </div>
                  </a>
                ) : (
                  <div className="relative aspect-1408/320 w-full">
                    <Image
                      src={banner.image}
                      alt={banner.alt}
                      fill
                      className="object-cover"
                      priority={banner.id === 1}
                    />
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
