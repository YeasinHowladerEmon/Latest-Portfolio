import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Define upload directory
        const uploadDir = join(process.cwd(), 'public', 'uploads', 'projects');

        // Ensure directory exists
        try {
            await mkdir(uploadDir, { recursive: true });
        } catch (err) {
            // Already exists or other error
        }

        // Create unique filename
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const filename = `${uniqueSuffix}-${file.name.replace(/\s+/g, '-')}`;
        const path = join(uploadDir, filename);

        await writeFile(path, buffer);

        // Return the public URL
        const publicUrl = `/uploads/projects/${filename}`;

        return NextResponse.json({ url: publicUrl });
    } catch (error: any) {
        console.error('Upload Error:', error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
