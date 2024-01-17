import getCurrentUser from "@/utils/getCurrentUser";
import Group from "@/models/Group";

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

export const GET = async (req: Request, res: Response) => {
  try {
    const groups = await Group.find({ visibility: "Public" });
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
