import { NextRequest, NextResponse } from 'next/server';
import { contatoSchema } from '@/lib/validations/forms';
import { z } from 'zod';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validatedData = contatoSchema.parse(body);

    // TODO: Implementar envio de email
    console.log('Contato recebido:', validatedData);

    // Opcional: Salvar no Strapi
    // await strapi.post('/api/contatos', { data: validatedData });

    return NextResponse.json({
      success: true,
      message: 'Mensagem enviada com sucesso!',
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Erro ao enviar contato:', error);
    return NextResponse.json(
      { error: 'Erro ao enviar mensagem' },
      { status: 500 }
    );
  }
}
