import { connectToDB } from "@/lib/database";
import Contact from "@/models/contacts";
import User from "@/models/users";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const page = searchParams.get("page");
  const search = searchParams.get("search");

  try {
    let query: any = {};

    if (search) {
      query.$or = [
        { name: new RegExp(search, "i") },
        { phone: new RegExp(search, "i") },
        { email: new RegExp(search, "i") },
      ];
    }

    // const query = await constructSearchQuery(req.query);
    const token = req.cookies.get("auth_token")?.value;

    await connectToDB();

    if (!token) {
      return new NextResponse(
        JSON.stringify({ message: "Unauthorized access" }),
        { status: 409 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);

    const userId = await (decoded as JwtPayload)?.userId;

    const user = await User.findById(userId).select("-password -fullName");

    if (!user && user.role !== "Admin") {
      return new NextResponse(
        JSON.stringify({ message: "Unauthorized access" }),
        { status: 409 }
      );
    }

    const total = await Contact.countDocuments(query);

    const pageSize = 10;
    let pageNumber = parseInt(page || "1");

    console.log(Math.ceil(total / pageSize));
    if (total <= 5) pageNumber = 1;

    const skip = (pageNumber - 1) * pageSize;

    const contacts = await Contact.find(query).skip(skip).limit(pageSize);

    const responseData = {
      data: contacts,
      pagination: {
        total,
        page: pageNumber,
        pages: Math.ceil(total / pageSize),
      },
    };

    return NextResponse.json(responseData);
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Internal server error" }),
      { status: 500 }
    );
  }
};
