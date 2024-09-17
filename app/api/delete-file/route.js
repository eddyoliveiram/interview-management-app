import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(req) {
    try {
        const { fileUrl } = await req.json();

        const filePath = path.join(process.cwd(), 'public', fileUrl);

        await fs.unlink(filePath);

        return NextResponse.json({ status: 'success', message: 'Arquivo deletado com sucesso' });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ status: 'fail', error: e.message }, { status: 500 });
    }
}
