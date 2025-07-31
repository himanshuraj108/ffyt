import { NextResponse } from "next/server";

export function middleware(request) {
  const path = request.nextUrl.pathname;
  const isAdminPath = path === "/admin";
  const isDashboardPath = path.startsWith("/dashboard");
  const token = request.cookies.get("admin_token")?.value || "";

  // Force authentication for dashboard and api/adminupdate
  if ((isDashboardPath || path.startsWith("/api/adminupdate")) && !token) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  // Redirect authenticated users away from login
  if (isAdminPath && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin",
    "/api/adminupdate/:path*",
    "/api/admindelete/:path*"
  ]
};
