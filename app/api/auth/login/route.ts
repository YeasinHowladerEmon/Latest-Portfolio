import { NextResponse } from 'next/server';
import connectDB from '@/lib/db/connect';
import User from '@/lib/models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret';

export async function POST(req: Request) {
    try {
        await connectDB();
        const { email, password } = await req.json();

        // 1. Basic validation
        if (!email || !password) {
            return NextResponse.json(
                { message: 'Email and password are required' },
                { status: 400 }
            );
        }

        // 2. Find user (and explicitly select password)
        let user = await User.findOne({ email }).select('+password');

        // 3. SEEDING: If no user exists and it matches the admin env vars, create it
        // This is a convenient way to bootstrap the first user
        if (!user && email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            user = await User.create({ email, password });
            console.log('Seeded admin user');
        }

        if (!user) {
            return NextResponse.json(
                { message: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // 4. Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json(
                { message: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // 5. Generate JWT
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        // 6. Set HTTP-Only cookie
        const cookieStore = await cookies();
        cookieStore.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60, // 7 days
            path: '/',
        });

        return NextResponse.json(
            { message: 'Login successful', user: { id: user._id, email: user.email } },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Login error:', error);
        return NextResponse.json(
            { message: 'Server error during login' },
            { status: 500 }
        );
    }
}
