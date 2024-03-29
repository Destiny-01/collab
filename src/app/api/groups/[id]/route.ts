import Group from "@/models/Group";
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

    const group = await Group.findOneAndUpdate(
      { uuid: params.id },
      { ...(await req.json()) },
      { new: true }
    );
    if (!group) {
      return new Response("Group not found", {
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
