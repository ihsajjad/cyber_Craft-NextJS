import { connectToDB } from "@/lib/database";
import { UserDataType } from "@/lib/types";
import User from "@/models/users";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const userData = (await req.json()) as UserDataType;

  try {
    await connectToDB();

    const user = await User.findOne({ email: userData.email });

    if (!user) {
      return new NextResponse(
        JSON.stringify({ message: "User doesn't exists" }),
        { status: 409 }
      );
    }

    const isValidUser = user.password === userData.password;

    if (!isValidUser) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid credentials" }),
        { status: 409 }
      );
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: "1d",
      }
    );

    let response = NextResponse.json({ email: user.email, role: user.role });

    // setting the cookies to the user's browser
    response.cookies.set("auth_token", token, {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400000,
    });

    return response;
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Internal server error" }),
      { status: 500 }
    );
  }
};
