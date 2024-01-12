import Group from "@/app/models/Group";
import User from "@/app/models/User";
import getCurrentUser from "@/app/utils/getCurrentUser";
import sendEmail from "@/app/utils/sendMail";
import { NextApiRequest } from "next";

const handler = async (
  req: NextApiRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { currentUser } = await getCurrentUser();
    if (!currentUser) {
      return new Response("Invalid authentication", {
        status: 401,
      });
    }

    if (req.method === "POST") {
      const { response } = req.body;
      const group = await Group.findOne({ uuid: params.id }).populate("owner");
      if (!group) {
        return new Response("Group not found", {
          status: 400,
        });
      }

      if (
        group.members.include(currentUser._id) &&
        group.owner._id !== currentUser._id
      ) {
        return new Response("Already in this group", {
          status: 400,
        });
      }

      group.invitations.pending = group.invitations.pending.filter(
        (x: string) => x !== currentUser._id
      );
      group.invitations.outgoing = group.invitations.outgoing.filter(
        (x: string) => x !== currentUser._id
      );
      if (response === "Accept") {
        group.members.push(currentUser._id);
      } else {
        group.invitations.rejected.push(currentUser._id);
      }

      await User.findByIdAndUpdate(currentUser._id, {
        $pull: { invitations: group._id },
      });
      await group.save();

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
