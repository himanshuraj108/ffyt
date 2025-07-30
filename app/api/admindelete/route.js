import { NextResponse } from "next/server";
import dbConnect from "@/config/db";
import User from "@/models/user.schema";

export async function DELETE(req) {
  try {
    await dbConnect();
    const { uid } = await req.json();

    if (!uid) {
      return NextResponse.json(
        { message: "UID is required" },
        { status: 400 }
      );
    }

    const deletedUser = await User.findOneAndDelete({ uid });

    if (!deletedUser) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { message: "Error deleting user", error: error.message },
      { status: 500 }
    );
  }
}
