import Group, { Group as GroupType } from "@/models/Group";
import getCurrentUser from "@/utils/getCurrentUser";

export const PUT = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const { currentUser } = await getCurrentUser();
    if (!currentUser) {
      return new Response("Invalid authentication", {
        status: 401,
      });
    }
    const body = await req.json();
    console.log(body);

    const group = await Group.findOne({
      uuid: params.id,
    });
    if (!group) {
      return new Response("Group not found", {
        status: 400,
      });
    }
    if (
      !group.members.some(
        (member: { email: string }) => member.email === currentUser.email
      ) &&
      group.owner.toString() !== currentUser._id.toString()
    ) {
      return new Response("Not a part of this group", {
        status: 400,
      });
    }

    group.updates.push({
      ...body,
      date: Date.now(),
      author: currentUser._id,
    });
    await group.save();

    return Response.json({ success: true, data: group });
  } catch (err) {
    console.log(err);
    return new Response("An error occurred", {
      status: 400,
    });
  }
};

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const group = await Group.findOne({
      uuid: params.id,
    });

    if (!group) {
      return new Response("Group not found or access denied", {
        status: 400,
      });
    }

    return Response.json({ success: true, data: group });
  } catch (err) {
    console.log(err);
    return new Response("An error occurred", {
      status: 400,
    });
  }
};
