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

    const { email } = await req.json();
    const group = await Group.findOne({ uuid: params.id }).populate("owner");
    if (!group) {
      return new Response("Group not found", {
        status: 400,
      });
    }
    if (group.owner !== currentUser._id) {
      return new Response("Not the group admin. Can't add people", {
        status: 400,
      });
    }

    const invitedUser = await User.findOne({ email });
    if (!invitedUser) {
      return new Response("User not found", {
        status: 400,
      });
    }

    if (group.members.includes(invitedUser._id)) {
      return new Response("Already in this group", {
        status: 400,
      });
    }

    const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
    const content = `<h3>${currentUser.name} has asked you to join his group</h3>
      <p>Accept his invitation</p>
      <a href="${BASE_URL}/api/groups/respond?response=Accept><button>Accept</button></a>`;

    const isMailSent = await sendEmail(
      email,
      "Someone has invited you to join their group",
      content
    );
    if (!isMailSent) {
      return new Response("An error occurred while sending mail", {
        status: 400,
      });
    }

    group.invitations.outgoing.push(currentUser._id);
    invitedUser.invitations.push(group._id);
    await group.save();
    await invitedUser.save();

    return Response.json({ success: true, data: group });
  } catch (err) {
    console.log(err);
    return new Response("An error occurred", {
      status: 400,
    });
  }
};
