import { NextResponse } from "next/server";

export default function middelWare(req) {
    const token = req.cookies.get('my_token')?.value
    const { pathname } = req.nextUrl;
    if (!token && pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/login', req.url))
    }


    const authRoute = ['/login', '/register', '/forgot-password', '/reset-password'];
    if (token && authRoute.some(route => pathname.startsWith(route))) {
        return NextResponse.redirect(new URL('/dashboard', req.url))
    }
    return NextResponse.next()

}
export const config = {
    matcher: ['/dashboard/:path*', '/login', '/register', '/forgot-password', '/reset-password']
}