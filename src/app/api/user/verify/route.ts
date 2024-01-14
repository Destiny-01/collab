import User from "@/models/User";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === "GET") {
      const { email, email_verification } = req.query;

      const user = await User.findOne({ email, email_verification });
      if (!user) {
        return new Response("Invalid or expired verification", {
          status: 400,
        });
      }

      user.isVerified = true;
      user.email_verification = "";
      await user.save();

      return Response.json({ success: true, data: user });
    }
  } catch (err) {
    console.log(err);
    return new Response("An error occured", {
      status: 400,
    });
  }
};

export default handler;
