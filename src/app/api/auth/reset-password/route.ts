import User from "@/models/User";
import { connectDB } from "@/utils/db";
import bcrypt from "bcryptjs";

export const POST = async (req: Request, res: Response) => {
  try {
    await connectDB();

    const { password, email_verification } = await req.json();
    const user = await User.findOne({ email_verification });

    if (!user) {
      return new Response("Invalid verification or verification expired", {
        status: 400,
      });
    }
    if (!user.isVerified) {
      return new Response("Kindly confirm your mail before proceeding", {
        status: 400,
      });
    }

    user.password = await bcrypt.hash(password, 10);
    user.email_verification = "";
    await user.save();

    return Response.json({ success: true, data: user });
  } catch (err: any) {
    console.log(err);
    return new Response("An error occured", {
      status: 400,
    });
  }
};
