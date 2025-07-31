// middleware.js
import { NextResponse } from 'next/server';

export function middleware() {
  const html = `
    <html>
      <head>
        <title>403 Forbidden</title>
      </head>
      <body style="background-color:#fff; display:flex; align-items:center; justify-content:center; height:100vh;">
        <h1 style="color:red; font-size:2rem; font-family:sans-serif;">
          403 Forbidden – Access Denied
        </h1>
      </body>
    </html>
  `;

  return new NextResponse(html, {
    status: 403,
    headers: {
      'Content-Type': 'text/html',
    },
  });
}
