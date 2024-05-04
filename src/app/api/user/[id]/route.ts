import User from "@/models/User";
import getCurrentUser from "@/utils/getCurrentUser";
import { NextApiHandler } from "next";

export const GET = async (req: Request, res: Response) => {
  try {
    const { currentUser } = await getCurrentUser();
    if (!currentUser) {
      return new Response("Invalid authentication", {
        status: 401,
      });
    }
    const email = currentUser.email;

    const userDetails = await User.findOne({ email });

    if (!userDetails) {
      return new Response("User not found", {
        status: 400,
      });
    }

    const { password, email_verification, invitations, ...user } =
      userDetails.toObject();
    return Response.json({ success: true, data: user });
  } catch (err) {
    console.log(err);
    return new Response("An error occured", {
      status: 400,
    });
  }
};
