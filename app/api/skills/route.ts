import { NextResponse } from 'next/server';
import connectDB from '@/lib/db/connect';
import Skill from '@/lib/models/Skill';

export async function GET() {
    try {
        await connectDB();
        const skills = await Skill.find({}).sort({ updatedAt: -1 });
        console.log("skilss", skills)
        return NextResponse.json(skills);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await connectDB();
        const body = await req.json();
        const skill = await Skill.create(body);
        return NextResponse.json(skill, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
}
