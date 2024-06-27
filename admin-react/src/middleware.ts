// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')

    // If token exists, continue to the requested page
    if (token) {
        return NextResponse.next()
    }

    // If token does not exist, redirect to the login page
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
}

// This will apply the middleware to all routes under `/dashboard`
export const config = {
    matcher: '/dashboard/:path*',
}
