import Contact from "@/models/contacts";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const contactId = searchParams.get("contactId");

  try {
    await Contact.findByIdAndDelete(contactId);

    return NextResponse.json({ message: "Contact deleted successfully" });
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Internal server error" }),
      { status: 500 }
    );
  }
};
