import Group from "@/models/Group";
import User from "@/models/User";
import getCurrentUser from "@/utils/getCurrentUser";
import sendEmail from "@/utils/sendMail";

export const GET = async (
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

    const { searchParams } = new URL(req.url || "");
    const response = searchParams.get("response");
    const incoming_user_id = searchParams.get("incoming_user_id");

    const group = await Group.findOne({ uuid: params.id }).populate("owner");
    if (!group) {
      return new Response("Group not found", {
        status: 400,
      });
    }
    const currentUserId = incoming_user_id || currentUser._id;

    if (
      group.members.includes(currentUserId) &&
      group.owner._id !== currentUserId
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

    return Response.redirect(
      `${process.env.BASE_URL}/projects/${group.uuid}/joined`
    );
  } catch (err) {
    console.log(err);
    return new Response("An error occurred", {
      status: 400,
    });
  }
};
