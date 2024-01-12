import { connectDB } from "@/app/utils/db";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/app/models/User";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth/next";
import { AuthOptions } from "next-auth";

const login = async (credentials: Record<any, string>) => {
  try {
    await connectDB();
    const user = await User.findOne({ email: credentials.email });
    if (!user) throw new Error("Wrong credentials");

    const isCorrect = await bcrypt.compare(credentials.password, user.password);
    if (!isCorrect) throw new Error("Wrong credentials");

    user.details = credentials.details;
    await user.save();

    return user;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const authOptions: AuthOptions = {
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        try {
          if (!credentials) {
            throw new Error("Invalid credentials");
          }

          const user = await login(credentials);
          return user;
        } catch (error) {
          console.log(error);
          throw new Error("failed to login");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.username = user.username;
        token.name = user.name;
        token.email = user.email;
        token.details = user.details;
        token.avatar = user.avatar;
        token.isVerified = user.isVerified;
        token.id = user._id;
      }

      return token;
    },
    async session({ session, token }: any) {
      if (token) {
        session.user.username = token.username;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.id = token.id;
        session.user.details = token.details;
        session.user.avatar = token.avatar;
        session.user.isVerified = token.isVerified;
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
