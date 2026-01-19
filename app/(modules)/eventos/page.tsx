import { Suspense } from 'react';
import { getEventos } from '@/lib/strapi/queries';
import { extractStrapiData } from '@/lib/strapi/utils';
import { Skeleton } from '@/components/ui/skeleton';
import EventoCard from '@/components/modules/eventos/evento-card';
import type { Evento } from '@/types/strapi';

export const revalidate = 900;

export const metadata = {
  title: 'Eventos',
  description: 'Confira a programação de eventos e atividades do shopping',
};

async function EventosContent() {
  const eventosResponse = await getEventos();
  const eventos = extractStrapiData<Evento[]>(eventosResponse);

  if (!eventos || eventos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Nenhum evento encontrado</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {eventos.map((evento) => (
        <EventoCard key={evento.id} evento={evento} />
      ))}
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="space-y-4">
          <Skeleton className="aspect-video rounded-lg" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  );
}

export default function EventosPage() {
  return (
    <main className="min-h-screen">
      <section className="bg-muted py-12">
        <div className="container">
          <h1 className="text-4xl font-bold">Eventos</h1>
          <p className="text-muted-foreground mt-2">
            Confira a programação de eventos e atividades
          </p>
        </div>
      </section>

      <section className="container py-12">
        <Suspense fallback={<LoadingSkeleton />}>
          <EventosContent />
        </Suspense>
      </section>
    </main>
  );
}
