import connectDatabase from "@/config/database";
import Users from "@/models/usersModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDatabase();
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Please provide all required fields." },
        { status: 400 }
      );
    }

    const existingUser = await Users.findOne({ userEmail: email });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email address already in use." },
        { status: 409 }
      );
    }

    const newUser = new Users({
      userName: name,
      userEmail: email,
      userPassword: password,
      userSyllabi: [],
      userClasses: [],
      userDateSigned: new Date().toISOString(),
      userRole: "User", //
    });

    await newUser.save();

    return NextResponse.json(
      { message: "Signup successful!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { message: "Something went wrong during signup." },
      { status: 500 }
    );
  }
}
