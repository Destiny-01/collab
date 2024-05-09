import { sortUserByCountries } from "./../../../utils/sortCountries";
import User from "@/models/User";
import { getMatchesForGroup } from "@/services/match.service";
import getCurrentUser from "@/utils/getCurrentUser";
import { NextApiHandler } from "next";

export const GET = async (req: Request, res: Response) => {
  try {
    const { currentUser } = await getCurrentUser();

    const users = await User.aggregate([
      {
        $match: {
          _id: { $ne: currentUser?._id },
        },
      },
      { $sample: { size: 20 } },
    ]);
    if (!currentUser) {
      return Response.json({ success: true, users });
    }

    const sortedUsers = sortUserByCountries(currentUser?.country, users);

    return Response.json({ success: true, data: sortedUsers });
  } catch (err) {
    console.log(err);
    return new Response("An error occured", {
      status: 400,
    });
  }
};

export const PUT = async (req: Request, res: Response) => {
  try {
    const { currentUser } = await getCurrentUser();
    if (!currentUser) {
      return new Response("Invalid authentication", {
        status: 401,
      });
    }
    const email = currentUser.email;

    const body = await req.json();

    const user = await User.findOneAndUpdate({ email }, body, { new: true });
    if (!user) {
      return new Response("User not found", {
        status: 400,
      });
    }

    return Response.json({ success: true, data: user });
  } catch (err) {
    console.log(err);
    return new Response("An error occured", {
      status: 400,
    });
  }
};
