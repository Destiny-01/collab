import User from "@/models/User";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest, res: Response) => {
  try {
    const email = req.nextUrl.searchParams.get("email");
    const email_verification =
      req.nextUrl.searchParams.get("email_verification");

    const user = await User.findOne({ email, email_verification });
    if (!user) {
      return new Response("Invalid or expired verification", {
        status: 400,
      });
    }

    user.isVerified = true;
    user.email_verification = "";
    await user.save();

    return Response.redirect("/auth/login");
  } catch (err) {
    console.log(err);
    return new Response("An error occured", {
      status: 400,
    });
  }
};
