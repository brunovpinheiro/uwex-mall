import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const revalidate = 900;

export const metadata = {
  title: 'Cinema',
  description: 'Confira a programação do cinema e os filmes em cartaz',
};

function CinemaLoading() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="space-y-4">
          <Skeleton className="aspect-2/3 rounded-lg" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      ))}
    </div>
  );
}

async function CinemaContent() {
  // TODO: Implementar busca de filmes da API Ingresso.com
  // const filmes = await ingressoClient.getFilmesEmCartaz();

  return (
    <div className="py-12 text-center">
      <div className="mb-4 flex justify-center">
        <i className="hgi-stroke hgi-standard hgi-cinema-01 text-muted-foreground text-[64px]" />
      </div>
      <h3 className="mb-2 text-xl font-semibold">Em breve</h3>
      <p className="text-muted-foreground mx-auto max-w-md">
        A programação do cinema estará disponível em breve. Configure a integração com a API do
        Ingresso.com.
      </p>
    </div>
  );
}

export default function CinemaPage() {
  return (
    <main className="min-h-screen">
      <section className="bg-muted py-12">
        <div className="container">
          <h1 className="text-4xl font-bold">Cinema</h1>
          <p className="text-muted-foreground mt-2">
            Confira a programação e reserve seus ingressos
          </p>
        </div>
      </section>

      <section className="container py-12">
        <Suspense fallback={<CinemaLoading />}>
          <CinemaContent />
        </Suspense>
      </section>
    </main>
  );
}
