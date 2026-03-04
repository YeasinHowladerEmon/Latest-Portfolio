import { NextResponse } from 'next/server';
import connectDB from '@/lib/db/connect';
import Project from '@/lib/models/Project';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await connectDB();
        const project = await Project.findById(id);
        if (!project) return NextResponse.json({ message: 'Not found' }, { status: 404 });
        return NextResponse.json(project);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await connectDB();
        const body = await req.json();
        const project = await Project.findByIdAndUpdate(id, body, { new: true });
        if (!project) return NextResponse.json({ message: 'Not found' }, { status: 404 });
        return NextResponse.json(project);
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
        const project = await Project.findByIdAndDelete(id);
        if (!project) return NextResponse.json({ message: 'Not found' }, { status: 404 });
        return NextResponse.json({ message: 'Deleted successfully' });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
