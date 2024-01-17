import User from "@/models/User";
import getCurrentUser from "@/utils/getCurrentUser";
import { NextApiHandler } from "next";

export const PUT = async (req: Request, res: Response) => {
  try {
    const { currentUser } = await getCurrentUser();
    if (!currentUser) {
      return new Response("Invalid authentication", {
        status: 401,
      });
    }
    const email = currentUser.email;

    const { details, username, name } = await req.json();

    const user = await User.findOneAndUpdate(
      { email },
      { details, username, name },
      { new: true }
    );
    if (!user) {
      return new Response("User not found", {
        status: 400,
      });
    }

    return Response.json({ success: true, data: user });
  } catch (err) {
    console.log(err);
    return new Response("An error occured", {
      status: 400,
    });
  }
};

export const GET = async (req: Request, res: Response) => {
  try {
    const { currentUser } = await getCurrentUser();
    if (!currentUser) {
      return new Response("Invalid authentication", {
        status: 401,
      });
    }
    const email = currentUser.email;

    const user = await User.findOne({ email });

    if (!user) {
      return new Response("User not found", {
        status: 400,
      });
    }

    return Response.json({ success: true, data: user });
  } catch (err) {
    console.log(err);
    return new Response("An error occured", {
      status: 400,
    });
  }
};
