// app/api/test/route.js
import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/dbConnect';
import Vaga from '@/app/models/Vaga';

export async function GET() {
    // Retorna uma resposta JSON simples para testar se a rota está funcionando
    return NextResponse.json({ message: 'API de teste funcionando!', success: true });
}
