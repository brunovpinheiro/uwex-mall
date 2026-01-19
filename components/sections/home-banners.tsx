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

// Tipagem opcional de props, caso queira deixar genérico
interface MySwiperProps {
  slides?: string[];
}

export function MySwiper({ slides }: MySwiperProps) {
  const slidesToRender = slides ?? ['Slide 1', 'Slide 2', 'Slide 3'];

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
      {slidesToRender.map((text) => (
        <SwiperSlide key={text}>
          <div
            style={{
              background: '#0f172a',
              color: 'white',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
            }}
          >
            {text}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
