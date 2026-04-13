import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configuration: Allowed file types and max size (e.g., 5MB)
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get('file');

        if (!file || !(file instanceof File)) {
            return NextResponse.json({ message: 'No file uploaded or invalid file format' }, { status: 400 });
        }

        // 1. Validate File Size
        if (file.size > MAX_SIZE) {
            return NextResponse.json({ message: 'File too large. Max size is 5MB.' }, { status: 400 });
        }

        // 2. Validate File Type
        if (!ALLOWED_TYPES.includes(file.type)) {
            return NextResponse.json({ message: `Invalid file type: ${file.type}. Allowed: JPEG, PNG, WEBP, GIF.` }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Upload to Cloudinary
        const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({
                resource_type: 'auto',
                folder: 'emon-portfolio/projects',
            }, (error, result) => {
                if (error) reject(error);
                else resolve(result);
            }).end(buffer);
        }) as any;

        return NextResponse.json({
            success: true,
            url: result.secure_url,
            public_id: result.public_id,
            size: file.size,
            mimetype: file.type
        });
    } catch (error: any) {
        console.error('Upload Error:', error);
        return NextResponse.json({
            success: false,
            message: error.message || 'Internal Server Error during upload'
        }, { status: 500 });
    }
}
