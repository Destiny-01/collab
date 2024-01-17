import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/options";
import User from "../models/User";
import { connectDB } from "./db";

const getCurrentUser = async () => {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    console.log(session);

    if (!session?.user?.email) {
      return { currentUser: null, session: null };
    }

    const currentUser = await User.findOne({ email: session.user.email });

    if (!currentUser) {
      return { currentUser: null, session: null };
    }

    return { currentUser, session: session.user };
  } catch (err) {
    return { currentUser: null, session: null };
  }
};

export default getCurrentUser;
