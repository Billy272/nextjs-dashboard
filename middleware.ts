import { auth } from "./auth"; // Import NextAuth's `auth` helper
import { NextResponse } from "next/server";

export async function middleware(req: { url: string | URL | undefined; }) {
    const session = await auth(); // Get user session

    console.log("Middleware executed, Session:", session); // Debugging

    if (!session) {
        // If not authenticated, redirect to login
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/profile/:path*"], // Protect specific routes
};
