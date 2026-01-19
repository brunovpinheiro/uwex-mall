import { Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Film } from 'lucide-react';

export const revalidate = 900;

export const metadata = {
  title: 'Cinema',
  description: 'Confira a programação do cinema e os filmes em cartaz',
};

function CinemaLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="space-y-4">
          <Skeleton className="aspect-[2/3] rounded-lg" />
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
    <div className="text-center py-12">
      <Film className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
      <h3 className="text-xl font-semibold mb-2">Em breve</h3>
      <p className="text-muted-foreground max-w-md mx-auto">
        A programação do cinema estará disponível em breve. Configure a integração com a API do Ingresso.com.
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
