// app/api/login/route.js
import connectDatabase from "@/config/database";
import Users from "@/models/usersModel";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Please provide both email and password." },
        { status: 400 }
      );
    }

    await connectDatabase();
    const user = await Users.findOne({ userEmail: email });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password." },
        { status: 401 }
      );
    }

    // Compare the entered password with the hashed password
    const passwordMatch = await bcrypt.compare(password, user.userPassword);

    if (passwordMatch) {
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
