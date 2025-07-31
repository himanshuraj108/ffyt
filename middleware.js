// middleware.js
import { NextResponse } from 'next/server';

export function middleware() {
  return new NextResponse('403 Forbidden – Access Denied', {
    status: 403,
  });
}
