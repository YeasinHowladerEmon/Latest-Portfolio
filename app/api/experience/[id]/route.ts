import { NextResponse } from 'next/server';
import connectDB from '@/lib/db/connect';
import Experience from '@/lib/models/Experience';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await connectDB();
        const body = await req.json();
        const exp = await Experience.findByIdAndUpdate(id, body, { new: true });
        if (!exp) return NextResponse.json({ message: 'Not found' }, { status: 404 });
        return NextResponse.json(exp);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        if (!id || id === 'undefined') {
            return NextResponse.json({ message: 'Invalid ID provided' }, { status: 400 });
        }
        await connectDB();
        const exp = await Experience.findByIdAndDelete(id);
        if (!exp) return NextResponse.json({ message: 'Not found' }, { status: 404 });
        return NextResponse.json({ message: 'Deleted successfully' });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
