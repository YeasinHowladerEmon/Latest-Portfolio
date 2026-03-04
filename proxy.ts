import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-secret');

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Segments to protect
    const isDashboardRoute = pathname.startsWith('/dashboard');
    // const isApiDashRoute = pathname.startsWith('/api') && !pathname.includes('/auth/login') && !pathname.includes('/api/debug/seed');

    if (isDashboardRoute) {
        const token = request.cookies.get('token')?.value;

        if (!token) {
            // if (isApiDashRoute) {
            //     return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
            // }
            return NextResponse.redirect(new URL('/login', request.url));
        }

        try {
            await jwtVerify(token, JWT_SECRET);
            return NextResponse.next();
        } catch (error) {
            console.error('Proxy JWT Error:', error);
            // if (isApiDashRoute) {
            //     return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
            // }
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        // '/api/projects/:path*',
        // '/api/skills/:path*',
        // '/api/experience/:path*',
        // '/api/contact/:path*',
    ],
};
