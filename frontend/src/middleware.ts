import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("ecommerce_auth_token")?.value;
  const { pathname } = request.nextUrl;

  // Protected customer routes
  const protectedCustomerRoutes = ["/checkout", "/orders", "/profile", "/notifications"];
  const isProtectedCustomerRoute = protectedCustomerRoutes.some((route) => pathname.startsWith(route));

  // Protected admin routes
  const isAdminRoute = pathname.startsWith("/admin");

  if ((isProtectedCustomerRoute || isAdminRoute) && !token) {
    // In dev demo mode with mock fallback, if cookie isn't present yet, allow direct viewing unless production
    const isDev = process.env.NODE_ENV !== "production";
    if (!isDev) {
      const url = new URL("/login", request.url);
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/checkout/:path*",
    "/orders/:path*",
    "/profile/:path*",
    "/notifications/:path*",
    "/admin/:path*",
  ],
};
