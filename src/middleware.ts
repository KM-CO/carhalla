import { NextRequest, NextResponse } from "next/server";
import { authConfig } from "./auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

export async function middleware(request: NextRequest) {
    const session = await auth();
    const isAuthenticated = !!session?.user;

    const res = NextResponse.next()
    const reqUrl = new URL(request.url);
    if (isAuthenticated) {
        if (reqUrl.pathname.startsWith('/login')) {
            return NextResponse.redirect(new URL('/', request.url))
        }
        if (reqUrl.pathname.startsWith('/signup')) {
            return NextResponse.redirect(new URL('/', request.url))
        }
        if (reqUrl.pathname.startsWith('/view')) {
            return NextResponse.redirect(new URL(reqUrl.pathname.replace("view", "car"), request.url))
        }
    } else {
        if (!reqUrl.pathname.startsWith("/view") && !reqUrl.pathname.startsWith("/api/auth/") && !reqUrl.pathname.startsWith("/api/cars")
            && !(reqUrl.pathname == "/signup" || reqUrl.pathname == "/login" || reqUrl.pathname == "/api/users/signup")) {
            return NextResponse.redirect(new URL("/", request.url));
        }
    
        res.headers.append('Access-Control-Allow-Credentials', "true");
        res.headers.append('Access-Control-Allow-Origin', 'https://localhost:3000'); // replace this your actual origin
        res.headers.append('Access-Control-Allow-Methods', 'GET');
        res.headers.append(
            'Access-Control-Allow-Headers',
            'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
        );
    }
    return res;
}

export const config = {
    matcher: [
        "/car/:id*",
        "/view/:id*",
        "/login",
        "/signup",
        "/api/:path*"
    ]
};