// src/middleware.ts
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token'); // Protection via JWT [cite: 12, 89]

  if (!token && (request.nextUrl.pathname.startsWith('/my-borrowings') || request.nextUrl.pathname.startsWith('/profile'))) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}