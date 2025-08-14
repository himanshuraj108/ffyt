import { NextResponse } from "next/server";

export function middleware(request) {
  const path = request.nextUrl.pathname;

  // ✅ Allow /admin and /admindashboard without blocking
  if (path === "/admin" || path === "/admindashboard") {
    return NextResponse.next();
  }

  // ❌ Block all other pages with styled 404 + launch message
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Server Error</title>
      <style>
        body {
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          background: white;
          color: #333;
          margin: 50px;
        }
        h1 {
          color: #b00;
          font-size: 24px;
          border-bottom: 1px solid #ccc;
          padding-bottom: 5px;
        }
        p {
          font-size: 14px;
          line-height: 1.5;
        }
        .container {
          max-width: 600px;
          margin: auto;
        }
        .launch-msg {
          font-size: 14px;
          color: #555;
          margin-top: 15px;
        }
        a.login-link {
          display: inline-block;
          margin-top: 10px;
          padding: 8px 14px;
          background: #0078d7;
          color: white;
          text-decoration: none;
          border-radius: 4px;
        }
        a.login-link:hover {
          background: #005fa3;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Server Error</h1>
        <p><b>404 - File or directory not found.</b></p>
        <p>The resource you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
        <div class="launch-msg">Website will be open in 7 days</div>
        <a href="/admin" class="login-link">Admin Login</a>
      </div>
    </body>
    </html>
  `;
  
  return new NextResponse(html, {
    status: 404,
    headers: { "Content-Type": "text/html" },
  });
}

export const config = {
  matcher: ["/:path*"], // Apply to all routes
};
