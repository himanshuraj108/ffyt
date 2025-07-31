import { NextResponse } from 'next/server';

export function middleware() {
  const html = `
    <html>
      <head>
        <title>Server Error</title>
      </head>
      <body style="font-family:Segoe UI,Tahoma,Geneva,Verdana,sans-serif;padding:40px;">
        <h1 style="color:#990000;">Server Error</h1>
        <h2>404 - File or directory not found.</h2>
        <p>The resource you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
      </body>
    </html>
  `;

  return new NextResponse(html, {
    status: 404,
    headers: {
      'Content-Type': 'text/html',
    },
  });
}

export const config = {
  matcher: '/:path*',
};
