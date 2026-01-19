'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contatoSchema, ContatoFormData } from '@/lib/validations/forms';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export default function ContatoForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContatoFormData>({
    resolver: zodResolver(contatoSchema),
  });

  async function onSubmit(data: ContatoFormData) {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/forms/contato', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar formulário');
      }

      toast.success('Mensagem enviada com sucesso!');
      reset();
    } catch (error) {
      toast.error('Erro ao enviar mensagem. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="nome" className="text-sm font-medium">
          Nome *
        </label>
        <Input
          id="nome"
          {...register('nome')}
          placeholder="Seu nome completo"
          className="mt-1"
        />
        {errors.nome && (
          <p className="text-sm text-destructive mt-1">{errors.nome.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="text-sm font-medium">
          Email *
        </label>
        <Input
          id="email"
          type="email"
          {...register('email')}
          placeholder="seu@email.com"
          className="mt-1"
        />
        {errors.email && (
          <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="telefone" className="text-sm font-medium">
          Telefone
        </label>
        <Input
          id="telefone"
          {...register('telefone')}
          placeholder="(00) 00000-0000"
          className="mt-1"
        />
        {errors.telefone && (
          <p className="text-sm text-destructive mt-1">{errors.telefone.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="assunto" className="text-sm font-medium">
          Assunto *
        </label>
        <Input
          id="assunto"
          {...register('assunto')}
          placeholder="Assunto da mensagem"
          className="mt-1"
        />
        {errors.assunto && (
          <p className="text-sm text-destructive mt-1">{errors.assunto.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="mensagem" className="text-sm font-medium">
          Mensagem *
        </label>
        <textarea
          id="mensagem"
          {...register('mensagem')}
          placeholder="Escreva sua mensagem"
          rows={5}
          className="mt-1 flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
        {errors.mensagem && (
          <p className="text-sm text-destructive mt-1">{errors.mensagem.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
      </Button>
    </form>
  );
}
