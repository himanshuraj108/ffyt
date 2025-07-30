import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    const ADMIN_USERID = process.env.ADMIN_USERID;
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

    if (!ADMIN_USERID || !ADMIN_PASSWORD) {
      throw new Error("Environment variables not defined");
    }

    if (username === ADMIN_USERID && password === ADMIN_PASSWORD) {
      const response = NextResponse.json(
        { message: "Success", success: true },
        { status: 200 }
      );

      response.cookies.set("admin_token", "admin_authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 24 hours
      });

      return response;
    } else {
      return NextResponse.json(
        { message: "Failed", success: false },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Login route error:", error);
    return NextResponse.json(
      { message: "Server Error", error: error.message, success: false },
      { status: 500 }
    );
  }
}
