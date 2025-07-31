// middleware.ts
import { NextResponse } from 'next/server';

export function middleware() {
  return new NextResponse('Server temporarily down', { status: 503 });
}
