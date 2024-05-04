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

    const group = await Group.findOne({ uuid: params.id }).populate("owner");
    if (!group) {
      return new Response("Group not found", {
        status: 400,
      });
    }
    if (currentUser.votedProjects?.includes(params.id)) {
      return new Response("Already voted", {
        status: 400,
      });
    }

    currentUser.votedProjects = [];
    currentUser.votedProjects.push(params.id);
    console.log(currentUser);
    group.votes = (group.votes || 0) + 1;

    await group.save();
    await currentUser.save();

    return Response.json({ success: true, data: group });
  } catch (err) {
    console.log(err);
    return new Response("An error occurred", {
      status: 400,
    });
  }
};
