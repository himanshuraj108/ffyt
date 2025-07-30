import { NextResponse } from "next/server";
import dbConnect from "@/config/db";
import User from "@/models/user.schema";

export async function OPTIONS(req) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      Allow: "PUT, OPTIONS",
      "Content-Type": "application/json",
    },
  });
}

export async function PUT(req) {
  try {
    console.log("AdminUpdate PUT request received");
    await dbConnect();
    const body = await req.json();
    console.log("Request body:", body);
    const { uid, status } = body;

    // Validate status
    const validStatuses = ["pending", "completed", "invalid"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { message: "Invalid status value." },
        { status: 400 }
      );
    }

    // Update user status
    const result = await User.findOneAndUpdate(
      { uid },
      { status },
      { new: true }
    );

    if (!result) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Status updated.", user: result },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Update error", error: error.message },
      { status: 500 }
    );
  }
}
