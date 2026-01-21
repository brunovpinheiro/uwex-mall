import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { Toaster } from 'sonner';
import Navbar from '@/components/layout/navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Shopping Center',
    template: '%s | Shopping Center',
  },
  description: 'O melhor shopping center da região',
  keywords: 'shopping, lojas, cinema, eventos, gastronomia',
  authors: [{ name: 'Shopping Center' }],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'Shopping Center',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
