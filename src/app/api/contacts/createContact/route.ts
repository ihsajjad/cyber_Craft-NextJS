import { connectToDB } from "@/lib/database";
import { UserDataType } from "@/lib/types";
import Contact from "@/models/contacts";
import User from "@/models/users";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const contactData = (await req.json()) as UserDataType;

  try {
    await connectToDB();

    const isMatch = await User.findOne({ email: contactData.email });

    if (!isMatch) {
      return new NextResponse(
        JSON.stringify({ message: "Unauthorized Access" }),
        {
          status: 401,
        }
      );
    }

    const contact = new Contact(contactData);
    await contact.save();

    return NextResponse.json({ message: "Message was sent successfully" });
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Internal server error" }),
      { status: 500 }
    );
  }
};
