import { NextResponse } from "next/server";
import dbConnect from "@/config/db";
import User from "@/models/user.schema";

export async function GET(req) {
  try {
    await dbConnect();
    const users = await User.find({})
      .select('uid status createdAt -_id')
      .sort({ createdAt: -1 })
      .lean()
      .exec();
    
    // Format the dates properly
    const formattedUsers = users.map(user => ({
      ...user,
      createdAt: user.createdAt ? new Date(user.createdAt).toISOString() : new Date().toISOString()
    }));
    return NextResponse.json({ users: formattedUsers }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Status API ERROR", error: error.message },
      { status: 500 }
    );
  }
}
