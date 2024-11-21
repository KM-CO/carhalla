import { NextRequest, NextResponse } from "next/server";
import { authConfig } from "./auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

export async function middleware(request: NextRequest) {
    const { nextUrl } = request;
    const session = await auth();
    const isAuthenticated = !!session?.user;

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
        if (!reqUrl.pathname.startsWith("/view")
            && !(reqUrl.pathname == "/signup" || reqUrl.pathname == "/login" || reqUrl.pathname == "/api/cars")) {
            return NextResponse.redirect(new URL("/", request.url));
        }
    }
    return NextResponse.next();
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