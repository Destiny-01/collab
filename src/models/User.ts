import mongoose, { Types, Document, Model } from "mongoose";

export interface User {
  username?: string;
  name?: string;
  email: string;
  password: string;
  avatar?: string;
  email_verification?: string;
  isVerified: boolean;
  isProfileCompleted: boolean;
  groups: Types.ObjectId[];
  invitations: Types.ObjectId[];
  bio?: string;
  company?: string;
  title?: string;
  country?: string;
  interests: string[];
  votedProjects: string[];
  createdAt: Date;
}

export interface UserDocument extends User, Document {
  id: any;
}

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    email_verification: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isProfileCompleted: {
      type: Boolean,
      default: false,
    },
    groups: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group",
      },
    ],
    invitations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group",
      },
    ],
    bio: {
      type: String,
    },
    company: {
      type: String,
    },
    title: {
      type: String,
    },
    country: {
      type: String,
    },
    interests: [
      {
        type: String,
      },
    ],
    votedProjects: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

export default (mongoose.models?.User as unknown as Model<UserDocument>) ||
  mongoose.model<User>("User", userSchema);
