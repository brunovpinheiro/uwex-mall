import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ContatoForm from '@/components/forms/contato-form';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export const metadata = {
  title: 'Contato',
  description: 'Entre em contato com o shopping',
};

export default function ContatoPage() {
  return (
    <main className="min-h-screen">
      <section className="bg-muted py-12">
        <div className="container">
          <h1 className="text-4xl font-bold">Contato</h1>
          <p className="text-muted-foreground mt-2">
            Entre em contato conosco. Estamos à disposição para ajudá-lo!
          </p>
        </div>
      </section>

      <section className="container py-12">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações de Contato</CardTitle>
                <CardDescription>
                  Escolha a melhor forma de entrar em contato conosco
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-semibold">Telefone</p>
                    <p className="text-muted-foreground">(00) 0000-0000</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-muted-foreground">contato@shopping.com.br</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-semibold">Endereço</p>
                    <p className="text-muted-foreground">
                      Rua Exemplo, 1000<br />
                      Bairro Centro - Cidade/UF<br />
                      CEP 00000-000
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-semibold">Horário de Funcionamento</p>
                    <p className="text-muted-foreground">
                      Segunda a sábado: 10h às 22h<br />
                      Domingo: 12h às 20h
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Localização</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">Mapa (Integrar com Google Maps)</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Envie sua Mensagem</CardTitle>
              <CardDescription>
                Preencha o formulário abaixo e entraremos em contato o mais breve possível
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ContatoForm />
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
