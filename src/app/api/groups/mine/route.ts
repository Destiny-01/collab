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

      const foundGroups = await Group.find({
        $or: [
          { members: { $in: [currentUser._id] } },
          { owner: currentUser._id },
        ],
      })
        .populate("members")
        .populate("updates.author");
      const groups = foundGroups.filter((group) => !!group.project.complexity);
      console.log({ currentUser, foundGroups });

      return Response.json({ success: true, data: groups });
    }
  } catch (err) {
    console.log(err);
    return new Response("An error occurred", {
      status: 400,
    });
  }
};
