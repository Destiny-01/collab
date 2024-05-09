import User from "@/models/User";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const userDetails = await User.findById(params.id).populate("groups");
    if (!userDetails) {
      return new Response("User not found", {
        status: 400,
      });
    }

    const { password, email_verification, invitations, ...user } =
      userDetails.toObject();
    return Response.json({ success: true, data: user });
  } catch (err) {
    console.log(err);
    return new Response("An error occured", {
      status: 400,
    });
  }
};
