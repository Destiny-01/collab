import { sortUserByCountries } from "./../../../utils/sortCountries";
import User from "@/models/User";
import { getMatchesForGroup } from "@/services/match.service";
import getCurrentUser from "@/utils/getCurrentUser";
import { NextApiHandler } from "next";

export const GET = async (req: Request, res: Response) => {
  try {
    const { currentUser } = await getCurrentUser();

    const body = await req.json();

    const users = await User.aggregate([{ $sample: { size: 10 } }]);
    if (!currentUser) {
      return Response.json({ success: true, users });
    }

    // const matchedUsers = await getMatchesForGroup(currentUser._id, false);
    // if (!matchedUsers) {
    //   return Response.json({ success: true, users });
    // }

    const sortedUsers = sortUserByCountries(
      currentUser.details?.country,
      users
    );

    return Response.json({ success: true, data: sortedUsers });
  } catch (err) {
    console.log(err);
    return new Response("An error occured", {
      status: 400,
    });
  }
};
