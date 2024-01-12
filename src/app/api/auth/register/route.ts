import bcrypt from "bcryptjs";
import User from "@/app/models/User";
import { connectDB } from "@/app/utils/db";
import { NextApiHandler } from "next";
import { uuid } from "uuidv4";
import sendEmail from "@/app/utils/sendMail";

const handler: NextApiHandler = async (req, res) => {
  try {
    await connectDB();

    const { email, password, username, name } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return new Response("Email already in use", { status: 400 });
    }

    const email_verification = uuid();
    const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
    const content = `<h3>We are glad to have you on board</h3>
      <p>Please click here to verify your email address.</p>
      <a href="${BASE_URL}/api/user/verify?email=${email}&email_verification=${email_verification}"><button>Verify</button></a>`;

    const isEmailSent = await sendEmail(
      email,
      "Kindly verify your email address",
      content
    );
    if (!isEmailSent) {
      return new Response("An error occurred while sending email", {
        status: 400,
      });
    }

    const newUser = await User.create({
      email,
      password,
      username,
      name,
      email_verification,
    });

    return Response.json({ success: true, data: newUser });
  } catch (err: any) {
    return new Response("An error occured", {
      status: 400,
    });
  }
};
export default handler;
