import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/dbConnect';
import Vaga from '@/app/models/Vaga';

export async function GET(req) {
    await dbConnect();

    const { searchParams } = new URL(req.url, `http://${req.headers.host}`);
    const page = parseInt(searchParams.get('page')) || 0;
    const limit = parseInt(searchParams.get('limit')) || 5;

    try {
        const vagas = await Vaga.aggregate([
            { $addFields: { statusOrder: { $cond: { if: { $eq: ["$status", "Currículo Rejeitado"] }, then: 1, else: 0 } } } },
            { $sort: { statusOrder: 1, _id: -1 } },
            { $skip: page * limit },
            { $limit: limit }
        ]);

        const totalVagas = await Vaga.countDocuments();

        return NextResponse.json({ success: true, data: vagas, total: totalVagas });

    } catch (error) {
        console.error('Erro ao buscar vagas:', error.message);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 }); // Ajustado para erro 500
    }
}

export async function POST(req) {
    await dbConnect();

    try {
        const body = await req.json();
        const novaVaga = new Vaga({
            empresa: body.empresa,
            cargo: body.cargo,
            descricaoVaga: body.descricaoVaga,
            salarioModalidade: body.salarioModalidade,
            origem: body.origem,
            status: body.status,
            curriculoEnviado: body.curriculoEnviado
        });

        await novaVaga.save();

        return NextResponse.json({ success: true, data: novaVaga });
    } catch (error) {
        console.error('Erro ao criar vaga:', error.message);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
