import { NextResponse } from 'next/server';
import connectDB from '@/lib/db/connect';
import Contact from '@/lib/models/Contact';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await connectDB();
        const body = await req.json();
        const contact = await Contact.findByIdAndUpdate(id, body, { new: true });
        if (!contact) return NextResponse.json({ message: 'Not found' }, { status: 404 });
        return NextResponse.json(contact);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await connectDB();
        const contact = await Contact.findByIdAndDelete(id);
        if (!contact) return NextResponse.json({ message: 'Not found' }, { status: 404 });
        return NextResponse.json({ message: 'Deleted successfully' });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
