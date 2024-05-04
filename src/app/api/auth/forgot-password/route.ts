import User from "@/models/User";
import { connectDB } from "@/utils/db";
import { v4 as uuid } from "uuid";
import sendEmail from "@/utils/sendMail";

export const POST = async (req: Request, res: Response) => {
  try {
    await connectDB();

    const { email } = await req.json();
    const user = await User.findOne({ email });
    if (!user) {
      return new Response("User not found", { status: 400 });
    }
    if (!user.isVerified) {
      return new Response("Kindly confirm your mail before proceeding", {
        status: 400,
      });
    }

    const email_verification = uuid();
    const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
    const content = `<h3>Reset password request</h3>
      <p>Please click here to reset your password.</p>
      <a href="${BASE_URL}/auth/reset-password?code=${email_verification}"><button>Reset</button></a>`;

    const isEmailSent = await sendEmail(
      email,
      "Reset Password Request",
      content
    );
    if (!isEmailSent) {
      return new Response("An error occurred while sending email", {
        status: 400,
      });
    }

    user.email_verification = email_verification;
    await user.save();

    return Response.json({ success: true, data: user });
  } catch (err: any) {
    console.log(err);
    return new Response("An error occured", {
      status: 400,
    });
  }
};
