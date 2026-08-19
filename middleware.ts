import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const noIndexPaths = ["/login", "/admin", "/dashboard", "/api", "/reports"];

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  if (noIndexPaths.some((path) => request.nextUrl.pathname.startsWith(path))) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|opengraph-image|icon).*)"],
};
