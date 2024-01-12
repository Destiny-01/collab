import User from "@/app/models/User";
import { NextApiHandler } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import getCurrentUser from "@/app/utils/getCurrentUser";
import Group from "@/app/models/Group";

const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === "POST") {
      const { currentUser } = await getCurrentUser();
      if (!currentUser) {
        return new Response("Invalid authentication", {
          status: 401,
        });
      }

      const { email, details } = req.body;

      const user = await User.findOneAndUpdate(
        { email },
        { details },
        { new: true }
      );
      if (!user) {
        return new Response("User not found", { status: 400 });
      }

      return Response.json({ success: true, data: user });
    } else if (req.method === "GET") {
      const groups = await Group.find({ visibility: "Public" });
      if (!groups) {
        return new Response("Groups not found", { status: 400 });
      }

      return Response.json({ success: true, data: groups });
    }
  } catch (err) {
    console.log(err);
    return new Response("An error occurred", {
      status: 400,
    });
  }
};

export default handler;
