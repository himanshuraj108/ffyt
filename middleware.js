import { NextResponse } from "next/server";

export function middleware(request) {
  const path = request.nextUrl.pathname;

  // ✅ Allow /admin and /admindashboard without blocking
  if (path === "/admin" || path === "/dashboard") {
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
};      status: 200,
      headers: { "Content-Type": "text/html" },
    });
  }

  // ❌ All other routes show 404 with launch message + login link
  return new NextResponse(errorPageHTML(), {
    status: 404,
    headers: { "Content-Type": "text/html" },
  });
}

function loginPageHTML(errorMsg = "") {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <title>Admin Login</title>
    <style>
      body {
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
        background-color: #f4f4f4;
        margin: 0;
      }
      .container {
        background: white;
        padding: 30px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
        text-align: center;
        width: 300px;
      }
      h1 {
        margin-bottom: 10px;
      }
      .launch-msg {
        font-size: 14px;
        color: #555;
        margin-bottom: 20px;
      }
      input {
        width: 100%;
        padding: 10px;
        margin: 8px 0;
        border: 1px solid #ccc;
        border-radius: 4px;
      }
      button {
        width: 100%;
        padding: 10px;
        background: #0078d7;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
      button:hover {
        background: #005fa3;
      }
      .error {
        color: red;
        font-size: 14px;
        margin-bottom: 10px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Admin Login</h1>
      <div class="launch-msg">Website will be open in 7 days</div>
      ${errorMsg ? `<div class="error">${errorMsg}</div>` : ""}
      <form method="POST" action="/admin">
        <input type="text" name="username" placeholder="Username" required />
        <input type="password" name="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  </body>
  </html>
  `;
}

function errorPageHTML() {
  return `
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
}

export const config = {
  matcher: ["/:path*"], // Apply to all routes
};
