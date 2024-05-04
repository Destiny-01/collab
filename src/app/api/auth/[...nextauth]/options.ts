import { connectDB } from "@/utils/db";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth/next";
import { AuthOptions } from "next-auth";

const login = async (credentials: Record<any, string>) => {
  try {
    await connectDB();
    const user = await User.findOne({ email: credentials.email }).populate(
      "groups"
    );
    console.log(user);
    if (!user) throw new Error("Wrong credentials");

    if (!user.isVerified) throw new Error("Please verify your email first");

    const isCorrect = await bcrypt.compare(credentials.password, user.password);
    if (!isCorrect) throw new Error("Wrong credentials");

    return user;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const authOptions: AuthOptions = {
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/auth/login",
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
          console.log(credentials);

          const user = await login(credentials);
          return user;
        } catch (error: any) {
          console.log(error);
          throw new Error(error);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        return { ...token, ...session.user };
      }
      return { ...token, user };
      // if (user) {
      //   token.username = user.username;
      //   token.name = user.name;
      //   token.email = user.email;
      //   token.details = user.details;
      //   token.avatar = user.avatar;
      //   token.isVerified = user.isVerified;
      //   token.groups = user.groups;
      //   token.id = user._id;
      // }

      return token;
    },
    async session({ session, token }) {
      // if (token) {
      //   session.user.username = token.username;
      //   session.user.name = token.name;
      //   session.user.email = token.email;
      //   session.user.id = token.id;
      //   session.user.details = token.details;
      //   session.user.avatar = token.avatar;
      //   session.user.groups = token.groups;
      //   session.user.isVerified = token.isVerified;
      // }
      session.user = token;

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
