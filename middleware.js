import { NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
export function middleware(req) {
  if (!getSessionCookie(req)) {
    const u = new URL("/signin", req.url); u.searchParams.set("from", req.nextUrl.pathname); u.searchParams.set("denied", "1");
    return NextResponse.redirect(u);
  }
  return NextResponse.next();
}
export const config = { matcher: ["/product/:path*", "/profile/:path*"] };
