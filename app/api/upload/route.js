import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(req) {
    try {
        const formData = await req.formData();

        const file = formData.get("file");
        if (!file) {
            return NextResponse.json({ status: "fail", error: "Nenhum arquivo enviado." }, { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = new Uint8Array(arrayBuffer);
        const uploadPath = path.join(process.cwd(), 'public/uploads', file.name);
        await fs.writeFile(uploadPath, buffer);

        return NextResponse.json({ status: "success", fileUrl: `/uploads/${file.name}` });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ status: "fail", error: e.message }, { status: 500 });
    }
}
