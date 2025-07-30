import { NextResponse } from "next/server";
import User from "@/models/user.schema";
import dbConnect from "@/config/db";

export async function GET() {
  try {
    await dbConnect();
    const users = await User.find({}, { uid: 1, status: 1, _id: 0 });
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching users", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const { uid } = await req.json();

    if (!uid) {
      return NextResponse.json({ message: "Uid is required" }, { status: 400 });
    }

    const checkUid = await User.findOne({ uid });
    if (checkUid) {
      return NextResponse.json(
        { message: "User already Exists" },
        { status: 400 }
      );
    }
    const createUser = await User.create({
      uid,
      createdAt: new Date(),
      status: 'pending'
    });

    return NextResponse.json({ message: "Added Success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error in API" }, { status: 500 });
  }
}
