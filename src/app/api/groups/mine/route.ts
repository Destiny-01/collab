import { NextApiHandler } from "next";
import Group from "@/app/models/Group";
import getCurrentUser from "@/app/utils/getCurrentUser";

const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === "GET") {
      const { currentUser } = await getCurrentUser();
      if (!currentUser) {
        return new Response("Invalid authentication", {
          status: 401,
        });
      }

      const groups = await Group.find({ members: { $in: [currentUser._id] } });

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
