import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MySwiper } from '@/components/sections/home-banners';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <section className="s-home-slider">
        <MySwiper
          slides={[
            {
              desktop: 'https://placehold.co/1728x560',
              mobile: 'https://placehold.co/800x600',
              alt: 'Banner Principal 1',
            },
            {
              desktop: 'https://placehold.co/1728x560',
              mobile: 'https://placehold.co/800x600',
              alt: 'Banner Principal 2',
            },
          ]}
        />
      </section>

      <section className="s-home-news-events"></section>

      <section className="s-home-minibanners"></section>

      <section className="s-home-lojas"></section>

      <section className="s-home-cinema"></section>

      <section className="s-home-middlebanners"></section>

      <section className="s-home-vitrine"></section>

      <section className="s-home-comodidades py-24">
        <div className="container mx-auto">
          <div className="s-comodidades_component text-center">
            <h2 className="s-comodidades_title text-4xl">Tudo para sua visita ser melhor</h2>
          </div>
        </div>
      </section>

      <section className="s-home-newsletter"></section>
    </main>
  );
}
