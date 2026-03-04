import { NextResponse } from 'next/server';
import connectDB from '@/lib/db/connect';
import User from '@/lib/models/User';

export async function GET() {
    try {
        await connectDB();

        // Check if user already exists
        const userCount = await User.countDocuments();
        if (userCount > 0) {
            return NextResponse.json({ message: 'User already exists. Seeding aborted.' }, { status: 400 });
        }

        const adminEmail = process.env.ADMIN_EMAIL || 'admin@cyber.net';
        const adminPassword = process.env.ADMIN_PASSWORD || 'cyber-pass-2026';

        await User.create({
            email: adminEmail,
            password: adminPassword,
        });

        return NextResponse.json({
            message: 'Admin user created successfully.',
            credentials: {
                email: adminEmail,
                password: adminPassword
            }
        });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
