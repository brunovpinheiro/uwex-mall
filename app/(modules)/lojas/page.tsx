import { Suspense } from 'react';
import { getLojas, getCategoriasLojas } from '@/lib/strapi/queries';
import { Skeleton } from '@/components/ui/skeleton';
import LojaCard from '@/components/modules/lojas/loja-card';
import { extractStrapiData } from '@/lib/strapi/utils';
import type { Loja } from '@/types/strapi';

export const revalidate = 1800;

export const metadata = {
  title: 'Lojas',
  description: 'Conheça todas as lojas do shopping',
};

async function LojasContent() {
  const [lojasResponse, categorias] = await Promise.all([
    getLojas(),
    getCategoriasLojas(),
  ]);

  const lojas = extractStrapiData<Loja[]>(lojasResponse);

  if (!lojas || lojas.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Nenhuma loja encontrada</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {lojas.map((loja) => (
        <LojaCard key={loja.id} loja={loja} />
      ))}
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="space-y-4">
          <Skeleton className="aspect-square rounded-lg" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      ))}
    </div>
  );
}

export default function LojasPage() {
  return (
    <main className="min-h-screen">
      <section className="bg-muted py-12">
        <div className="container">
          <h1 className="text-4xl font-bold">Nossas Lojas</h1>
          <p className="text-muted-foreground mt-2">
            Descubra as melhores marcas e lojas em um só lugar
          </p>
        </div>
      </section>

      <section className="container py-12">
        <Suspense fallback={<LoadingSkeleton />}>
          <LojasContent />
        </Suspense>
      </section>
    </main>
  );
}
