import Group from "@/models/Group";
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

    const group = await Group.findOne({ uuid: params.id }).populate("owner");
    if (!group) {
      return new Response("Group not found", {
        status: 400,
      });
    }
    if (group.members.includes(currentUser._id)) {
      return new Response("Already in this group", {
        status: 400,
      });
    }

    const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
    const content = `<h3>${currentUser.name} has asked to join your group</h3>
      <p>Accept his request now</p>
      <a href="${BASE_URL}/api/groups/respond?response=Accept&incoming_user_id=${currentUser._id}><button>Accept</button></a>`;

    const isMailSent = await sendEmail(
      group.owner.email,
      "Someone has asked to join your group",
      content
    );
    if (!isMailSent) {
      return new Response("An error occurred while sending mail", {
        status: 400,
      });
    }

    group.invitations.pending.push(currentUser._id);
    await group.save();

    return Response.json({ success: true, data: group });
  } catch (err) {
    console.log(err);
    return new Response("An error occurred", {
      status: 400,
    });
  }
};
