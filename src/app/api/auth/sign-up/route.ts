import { connectToDB } from "@/lib/database";
import { UserDataType } from "@/lib/types";
import User from "@/models/users";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const userData = (await req.json()) as UserDataType;

  try {
    await connectToDB();

    const isUserExist = await User.findOne({ email: userData.email });

    if (isUserExist) {
      return new NextResponse(
        JSON.stringify({ message: "User already exists" }),
        { status: 409 }
      );
    }

    userData.role = "User";

    const newUser = new User(userData);
    await newUser.save();

    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: "1d",
      }
    );

    let response = NextResponse.json({ message: "Success" });

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
