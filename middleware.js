// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  return new NextResponse('403 Forbidden – Access Denied', {
    status: 403,
  });
}
