import connectDatabase from "@/config/database";
import Users from "@/models/usersModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDatabase();
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Please provide both email and password." },
        { status: 400 }
      );
    }

    const user = await Users.findOne({ userEmail: email });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password." },
        { status: 401 }
      );
    }

    if (user.userPassword === password) {
      return NextResponse.json(
        { message: "Login successful!" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Invalid email or password." },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}
