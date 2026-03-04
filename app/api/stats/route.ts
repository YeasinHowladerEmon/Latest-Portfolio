import { NextResponse } from 'next/server';
import connectDB from '@/lib/db/connect';
import Project from '@/lib/models/Project';
import Skill from '@/lib/models/Skill';
import Experience from '@/lib/models/Experience';
import Contact from '@/lib/models/Contact';

export async function GET() {
    try {
        await connectDB();

        const [projectCount, skillCount, experienceCount, contactCount, recentContacts] = await Promise.all([
            Project.countDocuments(),
            Skill.countDocuments(),
            Experience.countDocuments(),
            Contact.countDocuments(),
            Contact.find().sort({ createdAt: -1 }).limit(5)
        ]);

        return NextResponse.json({
            projects: projectCount,
            skills: skillCount,
            experience: experienceCount,
            contacts: contactCount,
            recentContacts
        });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
