import bcrypt from "bcryptjs";
import User from "@/models/User";
import { connectDB } from "@/utils/db";
import { NextApiHandler } from "next";
import { v4 as uuid } from "uuid";
import sendEmail from "@/utils/sendMail";
import getCurrentUser from "@/utils/getCurrentUser";
import Feedback from "@/models/Feedback";

export const POST = async (req: Request, res: Response) => {
  try {
    await connectDB();
    const body = await req.json();

    const { currentUser } = await getCurrentUser();
    if (!currentUser) {
      return new Response("Invalid authentication", {
        status: 401,
      });
    }

    const feedback = await Feedback.create({ ...body, user: currentUser._id });

    return Response.json({ success: true });
  } catch (err: any) {
    console.log(err);
    return new Response("An error occured", {
      status: 400,
    });
  }
};
