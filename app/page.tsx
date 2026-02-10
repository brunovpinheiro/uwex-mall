import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MySwiper } from '@/components/sections/home-banners';
import { NewsEventsSection } from '@/components/sections/news-events-section';
import { StoresSection } from '@/components/sections/stores-section';
import { NowShowingSection } from '@/components/sections/now-showing-section';
import { VirtualShowcaseSection } from '@/components/sections/virtual-showcase-section';
import { AmenitiesSection } from '@/components/sections/amenities-section';
import { BannersSection } from '@/components/sections/banners-section';
import Footer from '@/components/layout/footer';

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

      <section className="s-home-news-events">
        <NewsEventsSection />
      </section>

      <section className="s-home-minibanners"></section>

      <StoresSection />

      <NowShowingSection />

      <BannersSection />

      <VirtualShowcaseSection />

      <AmenitiesSection />

      <Footer />
    </main>
  );
}
