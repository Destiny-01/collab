import getCurrentUser from "@/utils/getCurrentUser";
import User from "@/models/User";
import sendEmail from "@/utils/sendMail";
import { NextApiRequest } from "next";

export const POST = async (req: Request, res: Response) => {
  try {
    const { currentUser } = await getCurrentUser();
    if (!currentUser) {
      return new Response("Invalid authentication", {
        status: 401,
      });
    }

    const { email, reason } = await req.json();
    const user = await User.findOne({ email });
    if (!user) {
      return new Response("User does not exist", {
        status: 400,
      });
    }

    const content = `<h3>A user has been reported</h3>
      <p>${currentUser.name} has reported ${user.name} with email address ${email} with reason ${reason} </p>`;

    const isMailSent = await sendEmail(
      process.env.APP_ADMIN || "",
      "A user has been reported",
      content
    );
    if (!isMailSent) {
      return new Response("An error occurred while sending mail", {
        status: 400,
      });
    }

    user.isReported = true;
    await user.save();

    return Response.json({ success: true, data: user });
  } catch (err) {
    console.log(err);
    return new Response("An error occurred", {
      status: 400,
    });
  }
};
