// import { NextApiHandler } from "next";
import Group from "@/app/models/Group";
import getCurrentUser from "@/app/utils/getCurrentUser";

const handler = async (
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

    if (req.method === "PUT") {
      const group = await Group.findOneAndUpdate(
        { uuid: params.id },
        { ...req.body },
        { new: true }
      );
      if (!group) {
        return new Response("Group not found", {
          status: 400,
        });
      }

      return Response.json({ success: true, data: group });
    } else if (req.method === "GET") {
      const group = await Group.findOne({
        uuid: params.id,
        members: { $in: [currentUser._id] },
      });

      if (!group) {
        return new Response("Group not found or access denied", {
          status: 400,
        });
      }

      return Response.json({ success: true, data: group });
    }
  } catch (err) {
    console.log(err);
    return new Response("An error occurred", {
      status: 400,
    });
  }
};

export default handler;
