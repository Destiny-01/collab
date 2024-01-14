import User from "@/models/User";
import getCurrentUser from "@/utils/getCurrentUser";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  try {
    const { currentUser } = await getCurrentUser();
    if (!currentUser) {
      return new Response("Invalid authentication", {
        status: 401,
      });
    }
    const email = currentUser.email;

    if (req.method === "PUT") {
      const { details } = req.body;

      const user = await User.findOneAndUpdate(
        { email },
        { details },
        { new: true }
      );
      if (!user) {
        return new Response("User not found", {
          status: 400,
        });
      }

      return Response.json({ success: true, data: user });
    } else if (req.method === "GET") {
      const user = await User.findOne({ email });

      if (!user) {
        return new Response("User not found", {
          status: 400,
        });
      }

      return Response.json({ success: true, data: user });
    }
  } catch (err) {
    console.log(err);
    return new Response("An error occured", {
      status: 400,
    });
  }
};

export default handler;
