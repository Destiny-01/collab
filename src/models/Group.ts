import mongoose, { Document, Types } from "mongoose";
import { UserDocument } from "./User";

export interface Group extends Document {
  name?: string;
  photo: string;
  uuid: string;
  category: string;
  project?: {
    name?: string;
    problem?: string;
    solution?: string;
    impact?: string;
    key_features?: string[];
    complexity?: string;
    estimated_timeline?: string;
    description?: string;
    short_description?: string;
    core_skills?: string[];
    interests?: string[];
  };
  messages?: Types.ObjectId[];
  owner?: Types.ObjectId;
  members?: UserDocument[];
  invitations?: {
    pending?: Types.ObjectId[];
    rejected?: Types.ObjectId[];
    outgoing?: Types.ObjectId[];
  };
  updates?: {
    title: String;
    details: String;
    author: {
      name: string;
      avatar: string;
    };
    date: Date;
  }[];
  suggestedTopics?: {
    _id?: string;
    name?: string;
    problem?: string;
    solution?: string;
    impact?: string;
    key_features?: string[];
    complexity?: string;
    estimated_timeline?: string;
    description?: string;
    short_description?: string;
    core_skills?: string[];
    interests?: string[];
  }[];
  visibility?: "Private" | "Public";
  votes: number;
  createdAt: Date;
}

const groupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    photo: {
      type: String,
    },
    uuid: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    project: {
      name: String,
      problem: String,
      solution: String,
      impact: String,
      key_features: [String],
      complexity: String,
      timeline: String,
      description: String,
      short_description: String,
      core_skills: [String],
      interests: [String],
    },
    updates: [
      {
        title: String,
        details: String,
        author: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        date: Date,
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    invitations: {
      pending: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      rejected: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      outgoing: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
    suggestedTopics: [
      {
        name: String,
        problem: String,
        solution: String,
        impact: String,
        key_features: [String],
        complexity: String,
        description: String,
        short_description: String,
        estimated_timeline: String,
        core_skills: [String],
        interests: [String],
      },
    ],
    visibility: {
      type: String,
      enum: ["Private", "Public"],
      default: "Public",
    },
    votes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

groupSchema.pre(/^find/, function (next) {
  (this as any).populate("members");
  next();
});

const GroupModel =
  mongoose.models?.Group || mongoose.model("Group", groupSchema);

export default GroupModel;
