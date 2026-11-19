import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const CASE_REDIRECTS: Record<string, string> = {
  "/Sponsor": "/sponsor",
  "/Sponsor/": "/sponsor",
  "/Nominate": "/nominate",
  "/Nominate/": "/nominate",
  "/Summit": "/summit",
  "/Summit/": "/summit",
};

export function proxy(request: NextRequest) {
  const hostname = request.nextUrl.hostname;
  const pathname = request.nextUrl.pathname;

  // 1. Redirect Vercel deployment domain to the official domain
  if (hostname === "imetexpo-frontend.vercel.app") {
    const url = request.nextUrl.clone();

    url.protocol = "https:";
    url.hostname = "www.indiametexpo.com";
    url.port = "";

    return NextResponse.redirect(url, 301);
  }

  // 2. Handle existing case-sensitive route redirects
  const destination = CASE_REDIRECTS[pathname];

  if (destination) {
    const url = request.nextUrl.clone();
    url.pathname = destination;

    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};