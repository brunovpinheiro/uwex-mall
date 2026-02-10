'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils/cn';
import { mainNav } from '@/config/navigation.config';
import { HorariosWidget } from '@/components/ui/horarios-widget';
import { MegaMenu } from '@/components/layout/mega-menu';

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close mega menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mega menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Navbar */}
      <div className="bg-background relative z-[2] flex h-20 w-full items-center justify-center px-(--padding-global-mobile) shadow-[0px_8px_10px_0px_rgba(38,54,79,0.06)] md:px-(--padding-global)">
        <div className="flex w-full max-w-(--max-container) items-center gap-6">
          {/* Logo */}
          <div className="flex max-w-72 flex-1 items-start py-4">
            <Link href="/" className="relative h-12 w-[150px] overflow-hidden">
              <Image
                src="/assets/logo-color.svg"
                alt="Shopping Estação"
                fill
                className="object-contain object-left"
                priority
              />
            </Link>
          </div>

          {/* Nav Menu - Desktop */}
          <nav className="hidden flex-1 items-center justify-center gap-4 lg:flex">
            {mainNav.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname === item.href || pathname?.startsWith(item.href + '/');
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative flex h-20 items-center justify-center overflow-hidden px-2"
                >
                  <span
                    className={cn(
                      'hover:text-foreground text-[15px] leading-[1.5] font-medium motion-safe:transition-colors',
                      isActive ? 'text-foreground' : 'text-muted-foreground'
                    )}
                  >
                    {item.title}
                  </span>
                  {isActive && (
                    <span className="bg-primary absolute -bottom-1 left-1/2 h-1 w-10 -translate-x-1/2 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right section */}
          <div className="flex max-w-72 flex-1 items-center justify-end gap-4">
            {/* Horarios Widget - Desktop */}
            <div className="hidden lg:block">
              <HorariosWidget />
            </div>

            {/* Search Button */}
            <button
              className="hover:bg-secondary flex size-10 items-center justify-center rounded-xl motion-safe:transition-colors"
              aria-label="Buscar"
            >
              <Image
                src="/assets/icon-search.svg"
                alt=""
                width={20}
                height={20}
                className="size-5"
              />
            </button>

            {/* Menu Button */}
            <button
              className="bg-primary hover:bg-primary-hover flex size-10 items-center justify-center rounded-xl motion-safe:transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={isMenuOpen}
            >
              <Image
                src={isMenuOpen ? '/assets/icon-menu-close.svg' : '/assets/icon-menu.svg'}
                alt=""
                width={24}
                height={24}
                className="size-6"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mega Menu */}
      <MegaMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Overlay */}
      <div
        className={cn(
          'fixed inset-0 top-20 bg-black/40',
          isMenuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        )}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      />
    </header>
  );
}
