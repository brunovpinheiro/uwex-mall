import Link from 'next/link';

import { cn } from '@/lib/utils/cn';
import { megaMenuNav } from '@/config/navigation.config';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const quickGuideItems = [
  {
    label: 'Vitrine Virtual',
    href: '/vitrine-virtual',
    icon: 'hgi-shopping-bag-01',
    bg: 'bg-[#f9d2d4]',
    iconColor: 'text-[#e91e63]',
  },
  {
    label: 'Comodidades',
    href: '/comodidades',
    icon: 'hgi-user-love-01',
    bg: 'bg-[#d2dcf9]',
    iconColor: 'text-[#3f51b5]',
  },
  {
    label: 'Eventos',
    href: '/eventos',
    icon: 'hgi-calendar-favorite-01',
    bg: 'bg-[#fdeace]',
    iconColor: 'text-[#ff9800]',
  },
  {
    label: 'Cinema',
    href: '/cinema',
    icon: 'hgi-film-roll-02',
    bg: 'bg-[#ddeedd]',
    iconColor: 'text-[#4caf50]',
  },
];

export function MegaMenu({ isOpen, onClose }: MegaMenuProps) {
  return (
    <div
      className={cn(
        'relative z-[1] w-full overflow-hidden overscroll-contain',
        isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
      )}
    >
      <div className="flex w-full flex-col items-center gap-6 bg-(--mega-menu-background) px-(--padding-global-mobile) py-14 md:px-(--padding-global)">
        <div className="flex w-full max-w-(--max-container) gap-4">
          {/* Column 1: Menu Links */}
          <div className="flex flex-1 flex-col gap-3 p-6">
            <h3 className="text-sm font-bold tracking-[0.2px] text-(--mega-menu-foreground)">
              Menu
            </h3>
            <nav className="flex flex-col gap-0">
              {megaMenuNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="hover:text-primary relative text-[19px] leading-[1.5] font-normal text-white motion-safe:transition-colors"
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 2: Horarios */}
          <div className="flex flex-1 flex-col gap-4 rounded-[20px] bg-(--mega-menu-background-subtle) p-6">
            <h3 className="text-sm font-bold tracking-[0.2px] text-(--mega-menu-foreground)">
              Horários
            </h3>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-0.5">
                <p className="text-sm font-medium tracking-[0.2px] text-(--mega-menu-foreground-subtle)">
                  Lojas
                </p>
                <div className="text-sm leading-[1.5] font-normal text-(--mega-menu-foreground)">
                  <p>Seg - Sáb 10h às 22h</p>
                  <p>Dom e feriados 14h às 20h</p>
                </div>
              </div>
              <div className="flex flex-col gap-0.5">
                <p className="text-sm font-medium tracking-[0.2px] text-(--mega-menu-foreground-subtle)">
                  Alimentação
                </p>
                <div className="text-sm leading-[1.5] font-normal text-(--mega-menu-foreground)">
                  <p>Seg - Qui 10h às 22h</p>
                  <p>Sex - Sáb 10h às 23h</p>
                  <p>Dom e feriados 11h às 22h</p>
                </div>
              </div>
              <div className="flex flex-col gap-0.5">
                <p className="text-sm font-medium tracking-[0.2px] text-(--mega-menu-foreground-subtle)">
                  Office
                </p>
                <p className="text-sm leading-[1.5] font-normal text-(--mega-menu-foreground)">
                  Seg - Sex 07h às 19h
                </p>
              </div>
            </div>
          </div>

          {/* Column 3: Contato */}
          <div className="flex flex-1 flex-col gap-2 rounded-[20px] bg-(--mega-menu-background-subtle) p-6">
            <h3 className="text-sm font-bold tracking-[0.2px] text-(--mega-menu-foreground)">
              Contato
            </h3>
            <div className="flex flex-col gap-5">
              {/* Address */}
              <div className="flex items-center gap-4">
                <i className="hgi-stroke hgi-standard hgi-location-01 shrink-0 text-2xl text-(--mega-menu-foreground)" />
                <p className="text-sm leading-[1.5] font-medium tracking-[0.2px] text-(--mega-menu-foreground)">
                  Av. Sete de Setembro, 2775 - Rebouças - Curitiba, PR - CEP: 80230010
                </p>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <i className="hgi-stroke hgi-standard hgi-call-02 shrink-0 text-2xl text-(--mega-menu-foreground)" />
                <p className="text-sm leading-[1.5] font-medium tracking-[0.2px] text-(--mega-menu-foreground)">
                  (41) 3094-5300
                </p>
              </div>

              {/* Divider */}
              <div className="h-px w-full bg-(--mega-menu-border)" />

              {/* Social */}
              <div className="flex gap-4">
                <Link
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-10 items-center justify-center rounded-xl hover:bg-white/10 motion-safe:transition-colors"
                  aria-label="Facebook"
                >
                  <i className="hgi-stroke hgi-standard hgi-facebook-02 text-xl text-(--mega-menu-foreground)" />
                </Link>
                <Link
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-10 items-center justify-center rounded-xl hover:bg-white/10 motion-safe:transition-colors"
                  aria-label="Instagram"
                >
                  <i className="hgi-stroke hgi-standard hgi-instagram text-xl text-(--mega-menu-foreground)" />
                </Link>
                <Link
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-10 items-center justify-center rounded-xl hover:bg-white/10 motion-safe:transition-colors"
                  aria-label="TikTok"
                >
                  <i className="hgi-stroke hgi-standard hgi-tiktok text-xl text-(--mega-menu-foreground)" />
                </Link>
              </div>
            </div>
          </div>

          {/* Column 4: Guia Rapido */}
          <div className="flex flex-1 flex-col rounded-[20px] bg-(--mega-menu-background-subtle) p-6">
            <h3 className="mb-2 text-sm font-bold tracking-[0.2px] text-(--mega-menu-foreground)">
              Guia Rápido
            </h3>
            {quickGuideItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  'flex flex-1 items-center gap-4 p-2 hover:bg-white/5 motion-safe:transition-colors',
                  index < quickGuideItems.length - 1 && 'border-b border-(--mega-menu-border)'
                )}
              >
                <div
                  className={cn(
                    'flex size-10 shrink-0 items-center justify-center rounded-xl',
                    item.bg
                  )}
                >
                  <i className={cn('hgi-stroke hgi-standard text-xl', item.icon, item.iconColor)} />
                </div>
                <span className="text-base leading-[1.5] font-bold text-(--mega-menu-foreground)">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
