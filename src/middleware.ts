import { NextRequest, NextResponse } from "next/server";
import { authConfig } from "./auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

export async function middleware(request: NextRequest) {
    
    const session = await auth();
    
    
    const isAuthenticated = session !== null && session.user ? true : false;

    const res = NextResponse.next();
    const reqUrl = new URL(request.url);

    if (isAuthenticated) {
        
        if (session && session.user && session.user.email) {
            request.headers.set('user-email', session.user.email);  // Safely set email in headers
        }

        
        if (reqUrl.pathname.startsWith('/login')) {
            return NextResponse.redirect(new URL('/', request.url));
        }
        if (reqUrl.pathname.startsWith('/signup')) {
            return NextResponse.redirect(new URL('/', request.url));
        }
        if (reqUrl.pathname.startsWith('/car/') || reqUrl.pathname.startsWith('/view/')) {
            let owner;
            const id = reqUrl.pathname.startsWith('/car/') ? reqUrl.pathname.replace("/car/", ``) : reqUrl.pathname.replace("/view/", ``);
            let newUrl;
            try {
                const response = await fetch(`http://localhost:3000/api/cars/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not okay');
                }
                const data = await response.json();
                owner = data.owner;
                if (owner === session?.user?.name) {
                    newUrl = reqUrl.pathname.replace("/view", "/car");
                } else {
                    newUrl = reqUrl.pathname.replace("/car", "/view");
                }
                return NextResponse.rewrite(new URL(newUrl, request.url));
            } catch (error) {
                console.log(`Error checking ownership:`, error);
            }
        }
    } else {
        
        if (!reqUrl.pathname.startsWith("/view") && !reqUrl.pathname.startsWith("/api/auth/") && !reqUrl.pathname.startsWith("/api/cars")
            && !(reqUrl.pathname == "/signup" || reqUrl.pathname == "/login" || reqUrl.pathname == "/api/users/signup")) {
            return NextResponse.redirect(new URL("/", request.url));
        }

        
        res.headers.append('Access-Control-Allow-Credentials', "true");
        res.headers.append('Access-Control-Allow-Origin', 'https://localhost:3000'); // Replace with actual origin
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
