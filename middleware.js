import { NextResponse } from "next/server";

export function middleware(request) {
  const path = request.nextUrl.pathname;

  // ✅ Allow everything except / and /status
  if (path !== "/" && path !== "/status") {
    return NextResponse.next();
  }

  // 🎯 Target launch date (YYYY, MM-1, DD, HH, MM)
  const launchDate = new Date(2025, 8, 4, 0, 0, 0).getTime(); // 4 Sept 2025 00:00:00

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
          max-width: 700px;
          margin: auto;
          text-align: center;
        }
        .launch-msg {
          font-size: 24px;
          font-weight: bold;
          color: white;
          padding: 18px 22px;
          margin-top: 20px;
          border-radius: 10px;
          background: linear-gradient(90deg, #ff512f, #dd2476);
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
          animation: pulse 1.5s infinite ease-in-out;
        }
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        .update-box {
          margin-top: 25px;
          padding: 18px 22px;
          background: #f9f9f9;
          border: 2px solid #0078d7;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          text-align: left;
          font-size: 15px;
          line-height: 1.7;
        }
        .update-box h2 {
          margin-top: 0;
          margin-bottom: 12px;
          font-size: 20px;
          font-weight: bold;
          text-align: center;
          color: #0078d7;
        }
        .point {
          margin: 10px 0;
          font-weight: 500;
        }
        .red { color: #d32f2f; }       /* Warning */
        .green { color: #388e3c; }     /* Assurance */
        .blue { color: #1565c0; }      /* Info */
        .purple { color: #6a1b9a; }    /* Highlight */
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

        <div id="countdown" class="launch-msg">Loading countdown...</div>

        <div class="update-box">
          <h2>Important Update</h2>
          <p class="point red">No more UIDs will be accepted for now due to certain reasons.</p>
          <p class="point green">Those who have already submitted their UID on this website, don’t worry — your video will be uploaded within the stipulated time.</p>
          <p class="point blue">After all registered UIDs are uploaded, the website will reopen for the next set of users.</p>
          <p class="point purple" style="text-align:center;">Keep supporting us, a special surprise awaits you at 50K!</p>
        </div>

        <a href="/admin" class="login-link">Admin Login</a>
      </div>

      <script>
        const countdownElement = document.getElementById('countdown');
        const launchDate = ${launchDate};

        function updateCountdown() {
          const now = new Date().getTime();
          const distance = launchDate - now;

          if (distance <= 0) {
            countdownElement.textContent = "Website is now Live!";
            return;
          }

          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);

          countdownElement.textContent = \`Website will be open in \${days}d \${hours}h \${minutes}m \${seconds}s\`;
        }

        updateCountdown(); // First call
        setInterval(updateCountdown, 1000); // Update every second
      </script>
    </body>
    </html>
  `;

  return new NextResponse(html, {
    status: 404,
    headers: { "Content-Type": "text/html" },
  });
}

export const config = {
  matcher: ["/", "/status"], // Restrict only these routes
};        .container {
          max-width: 700px;
          margin: auto;
          text-align: center;
        }
        .launch-msg {
          font-size: 24px;
          font-weight: bold;
          color: white;
          padding: 18px 22px;
          margin-top: 20px;
          border-radius: 10px;
          background: linear-gradient(90deg, #ff512f, #dd2476);
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
          animation: pulse 1.5s infinite ease-in-out;
        }
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        .update-box {
          margin-top: 25px;
          padding: 18px 22px;
          background: linear-gradient(90deg, #0078d7, #005fa3);
          color: white;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
          text-align: left;
          font-size: 15px;
          line-height: 1.6;
        }
        .update-box h2 {
          margin-top: 0;
          margin-bottom: 10px;
          font-size: 20px;
          font-weight: bold;
          text-align: center;
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

        <div id="countdown" class="launch-msg">Loading countdown...</div>

        <div class="update-box">
          <h2>Important Update</h2>
          <p>No more UIDs will be accepted for now due to certain reasons.</p>
          <p>Those who have already submitted their UID on this website, don’t worry — your video will be uploaded within the stipulated time.</p>
          <p>After all registered UIDs are uploaded, the website will reopen for the next set of users.</p>
          <p style="text-align:center; margin-top:10px; font-weight:bold;">Keep supporting us — a special surprise awaits you at 50K!</p>
        </div>

        <a href="/admin" class="login-link">Admin Login</a>
      </div>

      <script>
        const countdownElement = document.getElementById('countdown');
        const launchDate = ${launchDate};

        function updateCountdown() {
          const now = new Date().getTime();
          const distance = launchDate - now;

          if (distance <= 0) {
            countdownElement.textContent = "Website is now Live!";
            return;
          }

          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);

          countdownElement.textContent = \`Website will be open in \${days}d \${hours}h \${minutes}m \${seconds}s\`;
        }

        updateCountdown(); // First call
        setInterval(updateCountdown, 1000); // Update every second
      </script>
    </body>
    </html>
  `;

  return new NextResponse(html, {
    status: 404,
    headers: { "Content-Type": "text/html" },
  });
}

export const config = {
  matcher: ["/", "/status"], // Restrict only these routes
};
