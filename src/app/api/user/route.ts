import { sortUserByCountries } from "./../../../utils/sortCountries";
import User from "@/models/User";
import getCurrentUser from "@/utils/getCurrentUser";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  try {
    const { currentUser } = await getCurrentUser();

    if (req.method === "GET") {
      const users = await User.aggregate([
        { $match: { niche: currentUser?.details?.niche || req.body.category } },
        { $sample: { size: 10 } },
      ]);
      if (!currentUser) {
        return Response.json({ success: true, users });
      }

      const sortedUsers = sortUserByCountries(
        currentUser.details?.country,
        users
      );

      return Response.json({ success: true, data: sortedUsers });
    }
  } catch (err) {
    console.log(err);
    return new Response("An error occured", {
      status: 400,
    });
  }
};

export default handler;
