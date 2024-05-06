import User from "@/models/User";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest, res: Response) => {
  try {
    const { email, email_verification } = req.nextUrl.searchParams;
    
    const user = await User.findOne({ email, email_verification });
    if (!user) {
      return new Response("Invalid or expired verification", {
        status: 400,
      });
    }

    user.isVerified = true;
    user.email_verification = "";
    await user.save();

    return Response.redirect(`${process.env.BASE_URL}/auth/verified`);
  } catch (err) {
    console.log(err);
    return new Response("An error occured", {
      status: 400,
    });
  }
};
