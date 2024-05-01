import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    let response = NextResponse.json({ message: "Logout Successfull" });

    // removing the cookies from the user's browser
    response.cookies.set("auth_token", "", {
      expires: new Date(0),
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
