import { connectToDB } from "@/lib/database";
import User from "@/models/users";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const token = req.cookies.get("auth_token")?.value;

    await connectToDB();

    if (!token) {
      return NextResponse.json({ email: "", role: "" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);

    const userId = await (decoded as JwtPayload)?.userId;

    const user = await User.findById(userId).select("-password -fullName");

    if (!user) {
      return NextResponse.json({ email: "", role: "" });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Internal server error" }),
      { status: 500 }
    );
  }
};
