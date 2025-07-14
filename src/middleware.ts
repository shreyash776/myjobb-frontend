import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;

  
  if (
    (request.nextUrl.pathname === "/" || request.nextUrl.pathname === "/signup" ||request.nextUrl.pathname==="/otp" ||
      request.nextUrl.pathname ===""
    ) &&
    token
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
 
     
  if (
    request.nextUrl.pathname.startsWith("/dashboard") &&
    !token
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/dashboard", "/login", "/signup","/"],
};
