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
        const originalFilename = file.name;
        const fileExtension = path.extname(originalFilename);
        const uniqueFilename = `${Date.now()}${fileExtension}`;
        const uploadPath = path.join(process.cwd(), 'public/uploads', uniqueFilename);
        await fs.writeFile(uploadPath, buffer);

        return NextResponse.json({ status: "success", fileUrl: `/uploads/${uniqueFilename}` });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ status: "fail", error: e.message }, { status: 500 });
    }
}
