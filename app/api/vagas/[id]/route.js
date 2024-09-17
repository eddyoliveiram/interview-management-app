import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/dbConnect';
import Vaga from '@/app/models/Vaga';

// Método GET para obter uma vaga pelo ID
export async function GET(req, { params }) {
    await dbConnect();

    try {
        const vaga = await Vaga.findById(params.id);

        if (!vaga) {
            return NextResponse.json({ success: false, message: 'Vaga não encontrada' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: vaga });
    } catch (error) {
        console.error('Erro ao buscar vaga:', error.message);
        return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }
}

export async function PUT(req, { params }) {
    await dbConnect();

    const { id } = params;

    try {
        const vaga = await Vaga.findById(id);

        if (!vaga) {
            return NextResponse.json({ success: false, message: 'Vaga não encontrada' }, { status: 404 });
        }

        const body = await req.json();

        vaga.empresa = body.empresa;
        vaga.cargo = body.cargo;
        vaga.descricaoVaga = body.descricaoVaga;
        vaga.salarioModalidade = body.salarioModalidade;
        vaga.origem = body.origem;
        vaga.status = body.status;
        vaga.curriculoEnviado = body.curriculoEnviado; // Certifique-se de que este campo está sendo atualizado

        await vaga.save();

        return NextResponse.json({ success: true, data: vaga });
    } catch (error) {
        console.error('Erro ao atualizar vaga:', error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}


export async function DELETE(req, { params }) {
    await dbConnect();

    try {
        const vagaDeletada = await Vaga.findByIdAndDelete(params.id);

        if (!vagaDeletada) {
            return NextResponse.json({ success: false, message: 'Vaga não encontrada' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: vagaDeletada });
    } catch (error) {
        console.error('Erro ao deletar vaga:', error.message);
        return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }
}
