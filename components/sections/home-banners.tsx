// app/components/MySwiper.tsx
'use client';

import React from 'react';

// Componentes React do Swiper
import { Swiper, SwiperSlide } from 'swiper/react';

// Módulos que vamos usar (adicione/remova conforme precisar)
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

// CSS do Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

// Tipagem para cada slide com imagens responsivas
interface SlideImage {
  desktop: string;
  mobile: string;
  alt?: string;
}

interface MySwiperProps {
  slides?: SlideImage[];
}

export function MySwiper({ slides }: MySwiperProps) {
  const slidesToRender = slides ?? [
    {
      desktop: '/images/banner-1-desktop.jpg',
      mobile: '/images/banner-1-mobile.jpg',
      alt: 'Banner 1',
    },
    {
      desktop: '/images/banner-2-desktop.jpg',
      mobile: '/images/banner-2-mobile.jpg',
      alt: 'Banner 2',
    },
  ];

  return (
    <Swiper
      // registra os módulos
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={30}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSlideChange={(swiper) => {
        console.log('slide change -> activeIndex:', swiper.activeIndex);
      }}
      onSwiper={(swiper) => {
        console.log('Swiper instance:', swiper);
      }}
      style={{ width: '100%' }}
    >
      {slidesToRender.map((slide, index) => (
        <SwiperSlide key={`${slide.desktop}-${index}`}>
          <div
            style={{
              width: '100%',
              height: 'auto',
              position: 'relative',
            }}
          >
            <picture>
              <source
                media="(min-width: 768px)"
                srcSet={slide.desktop}
              />
              <img
                src={slide.mobile}
                alt={slide.alt || `Banner ${index + 1}`}
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </picture>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
