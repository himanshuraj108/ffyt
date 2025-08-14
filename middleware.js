import { NextResponse } from "next/server";

export function middleware(request) {
  const path = request.nextUrl.pathname;

  // ✅ Allow /admin and /admindashboard without blocking
  if (path === "/admin" || path === "/admindashboard") {
    return NextResponse.next();
  }

  // ❌ Block all other pages with styled 404 + attractive launch message
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
          text-align: center;
        }
        .launch-msg {
          font-size: 22px;
          font-weight: bold;
          color: white;
          padding: 15px 20px;
          margin-top: 20px;
          border-radius: 8px;
          background: linear-gradient(90deg, #ff4b1f, #ff9068);
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
          animation: pulse 1.5s infinite;
        }
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        a.login-link {
          display: inline-block;
          margin-top: 15px;
          padding: 10px 16px;
          background: #0078d7;
          color: white;
          text-decoration: none;
          border-radius: 4px;
          font-size: 14px;
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
        <div class="launch-msg">🚀 Website will be open in 7 days 🚀</div>
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
