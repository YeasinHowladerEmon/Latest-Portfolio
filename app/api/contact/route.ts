import { NextResponse } from 'next/server';
import connectDB from '@/lib/db/connect';
import Contact from '@/lib/models/Contact';

export async function GET() {
    try {
        await connectDB();
        const contacts = await Contact.find({}).sort({ createdAt: -1 });
        return NextResponse.json(contacts);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await connectDB();
        const body = await req.json();
        const contact = await Contact.create(body);
        return NextResponse.json(contact, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
}
