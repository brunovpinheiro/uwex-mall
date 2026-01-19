import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MySwiper } from '@/components/sections/home-banners';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <MySwiper slides={['Primeiro slide', 'Segundo slide', 'Terceiro slide', 'Quarto slide']} />

      <section className="container mx-auto px-4 py-20">
        <div className="space-y-6 text-center">
          <h1 className="text-5xl font-bold">Bem-vindo ao Shopping Center</h1>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
            Seu destino completo para compras, entretenimento e gastronomia
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-8">
            <Button asChild size="lg">
              <Link href="/lojas">Nossas Lojas</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/eventos">Eventos</Link>
            </Button>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Lojas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Descubra as melhores marcas e lojas em um só lugar
              </p>
              <Button asChild className="mt-4" variant="link">
                <Link href="/lojas">Ver todas as lojas</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Eventos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Confira a programação de eventos e atividades</p>
              <Button asChild className="mt-4" variant="link">
                <Link href="/eventos">Ver eventos</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cinema</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Veja os filmes em cartaz e horários das sessões
              </p>
              <Button asChild className="mt-4" variant="link">
                <Link href="/cinema">Ver programação</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
