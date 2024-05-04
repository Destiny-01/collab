import User from "@/models/User";
import { NextApiRequest } from "next";

export const GET = async (req: NextApiRequest, res: Response) => {
  try {
    const { searchParams } = new URL(req.url || "");
    const email = searchParams.get("email");
    const email_verification = searchParams.get("email_verification");

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
