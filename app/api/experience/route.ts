import { NextResponse } from 'next/server';
import connectDB from '@/lib/db/connect';
import Experience from '@/lib/models/Experience';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        await connectDB();
        const experience = await Experience.find({}).sort({ createdAt: -1 });
        return NextResponse.json(experience);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await connectDB();
        const body = await req.json();
        const experience = await Experience.create(body);
        return NextResponse.json(experience, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
}
