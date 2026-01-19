import { z } from 'zod';

export const contatoSchema = z.object({
  nome: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('Email inválido'),
  telefone: z.string().min(10, 'Telefone inválido').optional(),
  assunto: z.string().min(5, 'Assunto deve ter no mínimo 5 caracteres'),
  mensagem: z.string().min(10, 'Mensagem deve ter no mínimo 10 caracteres'),
});

export const comercializacaoSchema = z.object({
  nome: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('Email inválido'),
  telefone: z.string().min(10, 'Telefone inválido'),
  empresa: z.string().min(2, 'Nome da empresa deve ter no mínimo 2 caracteres'),
  ramo: z.string().min(2, 'Ramo de atividade deve ter no mínimo 2 caracteres'),
  area: z.number().positive('Área deve ser maior que 0').optional(),
  mensagem: z.string().min(10, 'Mensagem deve ter no mínimo 10 caracteres'),
});

export const merchandisingSchema = z.object({
  nome: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('Email inválido'),
  telefone: z.string().min(10, 'Telefone inválido'),
  empresa: z.string().min(2, 'Nome da empresa deve ter no mínimo 2 caracteres'),
  tipoAcao: z.enum(['stand', 'degustacao', 'promocao', 'evento', 'outro']),
  dataDesejada: z.string().optional(),
  descricao: z.string().min(20, 'Descrição deve ter no mínimo 20 caracteres'),
});

export const newsletterSchema = z.object({
  email: z.string().email('Email inválido'),
  nome: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres').optional(),
});

export type ContatoFormData = z.infer<typeof contatoSchema>;
export type ComercializacaoFormData = z.infer<typeof comercializacaoSchema>;
export type MerchandisingFormData = z.infer<typeof merchandisingSchema>;
export type NewsletterFormData = z.infer<typeof newsletterSchema>;
