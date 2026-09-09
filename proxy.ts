import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const CASE_REDIRECTS: Record<string, string> = {
  '/Sponsor': '/sponsor',
  '/Sponsor/': '/sponsor',
  '/Nominate': '/nominate',
  '/Nominate/': '/nominate',
  '/Summit': '/summit',
  '/Summit/': '/summit',
};

export function proxy(request: NextRequest) {
  const destination = CASE_REDIRECTS[request.nextUrl.pathname];
  if (!destination) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = destination;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/Sponsor', '/Sponsor/', '/Nominate', '/Nominate/', '/Summit', '/Summit/'],
};
