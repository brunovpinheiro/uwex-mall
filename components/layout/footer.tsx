import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function Footer() {
  return (
    <footer className="w-full bg-(--footer-background) px-(--padding-global-mobile) py-14 md:px-(--padding-global) md:pt-14 md:pb-10">
      <div className="container mx-auto flex flex-col gap-8">
        {/* Header: Logo + Navigation */}
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          {/* Logo */}
          <div className="relative h-16 w-[170px]">
            <Image
              src="/assets/logo-estacao-branca.svg"
              alt="Shopping Estação"
              fill
              className="object-contain object-left"
            />
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap items-center gap-4 md:gap-4">
            <Link
              href="/merchandising"
              className="text-sm font-medium tracking-wide text-(--footer-foreground) hover:opacity-80 motion-safe:transition-opacity"
            >
              Merchandising
            </Link>
            <Link
              href="/comercializacao"
              className="text-sm font-medium tracking-wide text-(--footer-foreground) hover:opacity-80 motion-safe:transition-opacity"
            >
              Comercialização
            </Link>
            <Link
              href="/politica-privacidade"
              className="text-sm font-medium tracking-wide text-(--footer-foreground) hover:opacity-80 motion-safe:transition-opacity"
            >
              Política de privacidade
            </Link>
            <Link
              href="/contato"
              className="text-sm font-medium tracking-wide text-(--footer-foreground) hover:opacity-80 motion-safe:transition-opacity"
            >
              Fale conosco
            </Link>
            <Button
              variant="outline"
              size="sm"
              className="border-(--footer-border) bg-transparent text-(--footer-foreground) hover:bg-white/10"
              asChild
            >
              <Link href="/trabalhe-conosco">Trabalhe conosco</Link>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-(--footer-border) bg-transparent text-(--footer-foreground) hover:bg-white/10"
              asChild
            >
              <Link href="/acesso-lojista">Acesso Lojista</Link>
            </Button>
          </nav>
        </div>

        {/* Content Cards */}
        <div className="flex flex-col gap-2 md:flex-row">
          {/* Horários */}
          <div className="flex flex-1 flex-col gap-4 rounded-[20px] bg-(--footer-background-subtle) p-8">
            <h3 className="text-sm font-bold tracking-wide text-(--footer-foreground)">Horários</h3>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-0.5">
                <p className="text-sm font-medium text-(--footer-foreground-subtle)">Lojas</p>
                <div className="text-base text-(--footer-foreground)">
                  <p className="mb-0">Seg - Sáb 10h às 22h</p>
                  <p>Dom e feriados 14h às 20h</p>
                </div>
              </div>
              <div className="flex flex-col gap-0.5">
                <p className="text-sm font-medium text-(--footer-foreground-subtle)">Alimentação</p>
                <div className="text-base text-(--footer-foreground)">
                  <p className="mb-0">Seg - Qui 10h às 22h</p>
                  <p className="mb-0">Sex - Sáb 10h às 23h</p>
                  <p>Dom e feriados 11h às 22h</p>
                </div>
              </div>
              <div className="flex flex-col gap-0.5">
                <p className="text-sm font-medium text-(--footer-foreground-subtle)">Office</p>
                <p className="text-base text-(--footer-foreground)">Seg - Sex 07h às 19h</p>
              </div>
            </div>
          </div>

          {/* Contato */}
          <div className="flex flex-1 flex-col gap-2 rounded-[20px] bg-(--footer-background-subtle) p-8">
            <h3 className="text-sm font-bold tracking-wide text-(--footer-foreground)">Contato</h3>
            <div className="flex flex-col gap-5">
              {/* Endereço */}
              <div className="flex gap-4">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center">
                  <i className="hgi-stroke hgi-standard hgi-location-01 text-xl text-(--footer-foreground)" />
                </div>
                <p className="flex-1 text-base text-(--footer-foreground)">
                  Av. Sete de Setembro, 2775 - Rebouças - Curitiba, PR - CEP: 80230010
                </p>
              </div>

              {/* Telefone */}
              <div className="flex gap-4">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center">
                  <i className="hgi-stroke hgi-standard hgi-call text-xl text-(--footer-foreground)" />
                </div>
                <p className="flex-1 text-base text-(--footer-foreground)">(41) 3094-5300</p>
              </div>

              {/* Divider */}
              <div className="h-px w-full bg-(--footer-border)" />

              {/* Social Links */}
              <div className="flex gap-4">
                <Link
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl hover:bg-white/10 motion-safe:transition-colors"
                  aria-label="Facebook"
                >
                  <i className="hgi-stroke hgi-standard hgi-facebook-02 text-xl text-(--footer-foreground)" />
                </Link>
                <Link
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl hover:bg-white/10 motion-safe:transition-colors"
                  aria-label="Instagram"
                >
                  <i className="hgi-stroke hgi-standard hgi-instagram text-xl text-(--footer-foreground)" />
                </Link>
                <Link
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl hover:bg-white/10 motion-safe:transition-colors"
                  aria-label="TikTok"
                >
                  <i className="hgi-stroke hgi-standard hgi-tiktok text-xl text-(--footer-foreground)" />
                </Link>
              </div>
            </div>
          </div>

          {/* Estacionamento */}
          <div className="flex flex-1 flex-col gap-4 rounded-[20px] bg-(--footer-background-subtle) p-8">
            <h3 className="text-sm font-bold tracking-wide text-(--footer-foreground)">
              Estacionamento
            </h3>
            <div className="flex-1 text-base text-(--footer-foreground)">
              <p className="mb-1">0 a 15 minutos: Grátis</p>
              <p className="mb-1">16 a 30 minutos: R$ 8,00</p>
              <p className="mb-1">De 31 min até 4ª hora: R$ 14,00</p>
              <p className="mb-1">Após a 4ª hora: +R$ 3,00 a cada 15 min.</p>
              <p>Taxa de Pernoite: R$ 20,00</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-fit border-(--footer-border) bg-transparent text-(--footer-foreground) hover:bg-white/10"
              asChild
            >
              <Link href="/estacionamento">Mais detalhes</Link>
            </Button>
          </div>

          {/* Baixe nosso App */}
          <div className="flex w-full flex-1 flex-col gap-4 rounded-[20px] bg-(--footer-background-subtle) p-8 lg:max-w-[200px]">
            <h3 className="text-sm font-bold tracking-wide text-(--footer-foreground)">
              Baixe nosso App
            </h3>
            <div className="flex flex-col gap-3">
              <Link
                href="https://play.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 motion-safe:transition-opacity"
              >
                <div className="relative h-10 w-[130px]">
                  <Image
                    src="/assets/f0f0375e0ed9e0ddfea8158aa96433b422362d3d.png"
                    alt="Disponível no Google Play"
                    fill
                    className="object-contain object-left"
                  />
                </div>
              </Link>
              <Link
                href="https://apps.apple.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 motion-safe:transition-opacity"
              >
                <div className="relative h-10 w-[130px]">
                  <Image
                    src="/assets/24e7a60a1e5b9f1249742d8d82837340d26b1654.png"
                    alt="Disponível na App Store"
                    fill
                    className="object-contain object-left"
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <p className="text-xs text-(--footer-foreground-subtle)">
            Copyright © 2024 Shopping Estação – Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4">
            <p className="text-xs text-(--footer-foreground-subtle)">Administração</p>
            <div className="relative h-12 w-[45px]">
              <Image
                src="/assets/logo-tacla-branca.svg"
                alt="Tacla Shopping"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
