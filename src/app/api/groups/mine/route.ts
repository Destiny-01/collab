import { NextApiHandler } from "next";
import Group from "@/models/Group";
import getCurrentUser from "@/utils/getCurrentUser";

export const GET = async (req: Request, res: Response) => {
  try {
    if (req.method === "GET") {
      const { currentUser } = await getCurrentUser();
      if (!currentUser) {
        return new Response("Invalid authentication", {
          status: 401,
        });
      }

      const groups = await Group.find({
        $or: [{ members: { $in: [currentUser._id] }, owner: currentUser._id }],
      });

      return Response.json({ success: true, data: groups });
    }
  } catch (err) {
    console.log(err);
    return new Response("An error occurred", {
      status: 400,
    });
  }
};
