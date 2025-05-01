// app/api/signup/route.js
import connectDatabase from "@/config/database";
import Users from "@/models/usersModel";
import bcrypt from "bcrypt";
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

    // Hash the password
    const saltRounds = 10; // You can adjust the number of salt rounds
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new Users({
      userName: name,
      userEmail: email,
      userPassword: hashedPassword, // Save the hashed password
      userSyllabi: [],
      userClasses: [],
      userDateSigned: new Date().toISOString(),
      userRole: "User",
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
