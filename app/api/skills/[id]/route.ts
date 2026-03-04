import { NextResponse } from 'next/server';
import connectDB from '@/lib/db/connect';
import Skill from '@/lib/models/Skill';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await connectDB();
        const body = await req.json();
        const skill = await Skill.findByIdAndUpdate(id, body, { new: true });
        if (!skill) return NextResponse.json({ message: 'Not found' }, { status: 404 });
        return NextResponse.json(skill);
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
        const skill = await Skill.findByIdAndDelete(id);
        if (!skill) return NextResponse.json({ message: 'Not found' }, { status: 404 });
        return NextResponse.json({ message: 'Deleted successfully' });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
