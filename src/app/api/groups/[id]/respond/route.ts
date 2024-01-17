import Group from "@/models/Group";
import User from "@/models/User";
import getCurrentUser from "@/utils/getCurrentUser";
import sendEmail from "@/utils/sendMail";

export const POST = async (
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

    const { response, incoming_user_id } = await req.json();
    const group = await Group.findOne({ uuid: params.id }).populate("owner");
    if (!group) {
      return new Response("Group not found", {
        status: 400,
      });
    }
    const currentUserId = incoming_user_id || currentUser._id;

    if (
      group.members.includes(currentUser._id) &&
      group.owner._id !== currentUser._id
    ) {
      return new Response("Already in this group", {
        status: 400,
      });
    }

    group.invitations.pending = group.invitations.pending.filter(
      (x: string) => x !== currentUserId
    );
    group.invitations.outgoing = group.invitations.outgoing.filter(
      (x: string) => x !== currentUserId
    );
    if (response === "Accept") {
      group.members.push(currentUserId);
    } else {
      group.invitations.rejected.push(currentUserId);
    }

    await User.findByIdAndUpdate(currentUserId, {
      $pull: { invitations: group._id },
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
