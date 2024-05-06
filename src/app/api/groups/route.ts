import getCurrentUser from "@/utils/getCurrentUser";
import Group from "@/models/Group";
import { NextApiRequest } from "next";

export const POST = async (req: Request, res: Response) => {
  try {
    const { currentUser } = await getCurrentUser();
    if (!currentUser) {
      return new Response("Invalid authentication", {
        status: 401,
      });
    }

    const { project, uuid, name } = await req.json();

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
  } catch (err) {
    console.log(err);
    return new Response("An error occurred", {
      status: 400,
    });
  }
};

export const GET = async (req: NextApiRequest, res: Response) => {
  try {
    const user = req.query?.user;
    const { currentUser } = await getCurrentUser();

    const allGroups = await Group.find({
      members: { $nin: [currentUser?._id] },
      visibility: "Public",
      "project.name": { $exists: true },
    })
      .populate("members")
      .populate("updates.author");
    const groups = user
      ? allGroups.filter((group) => group.members.includes(user))
      : allGroups;
    if (!groups) {
      return new Response("Groups not found", { status: 400 });
    }

    return Response.json({ success: true, data: groups });
  } catch (err) {
    console.log(err);
    return new Response("An error occurred", {
      status: 400,
    });
  }
};
