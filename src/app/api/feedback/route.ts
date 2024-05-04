import bcrypt from "bcryptjs";
import User from "@/models/User";
import { connectDB } from "@/utils/db";
import { NextApiHandler } from "next";
import { v4 as uuid } from "uuid";
import sendEmail from "@/utils/sendMail";
import getCurrentUser from "@/utils/getCurrentUser";

export const POST = async (req: Request, res: Response) => {
  try {
    await connectDB();
    const { type, message } = await req.json();

    const { currentUser } = await getCurrentUser();
    if (!currentUser) {
      return new Response("Invalid authentication", {
        status: 401,
      });
    }

    const user = await User.findOne({ email: currentUser.email });
    if (!user) {
      return new Response("User not found", { status: 400 });
    }

    const content = `<h3>User with email <b>${user.email}</b> has sent a ${type} type feedback </h3>
      <p>${message}</p>`;

    const isEmailSent = await sendEmail(
      process.env.EMAIL || "",
      "You've received a feedback from Collabo",
      content
    );
    if (!isEmailSent) {
      return new Response("An error occurred while sending email", {
        status: 400,
      });
    }

    return Response.json({ success: true });
  } catch (err: any) {
    console.log(err);
    return new Response("An error occured", {
      status: 400,
    });
  }
};
