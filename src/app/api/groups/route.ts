import User from "@/app/models/User";
import { NextApiHandler } from "next";
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

      const { project, uuid, name } = req.body;

      const group = await Group.findOne({ uuid });
      if (!group) {
        return new Response("Group not found", {
          status: 400,
        });
      }

      group.project = project;
      group.details = project;
      group.name = name;

      await group.save();

      return Response.json({ success: true, data: group });
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
