'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold text-destructive">Ops!</h1>
        <h2 className="text-2xl font-bold">Algo deu errado</h2>
        <p className="text-muted-foreground max-w-md">
          Ocorreu um erro inesperado. Por favor, tente novamente.
        </p>
        <div className="flex gap-4 justify-center">
          <Button onClick={() => reset()}>Tentar novamente</Button>
          <Button variant="outline" onClick={() => window.location.href = '/'}>
            Voltar para o início
          </Button>
        </div>
      </div>
    </div>
  );
}
