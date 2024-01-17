import mongoose, { Document, Types } from "mongoose";

export interface Group extends Document {
  name?: string;
  uuid: string;
  category: string;
  project?: {
    name?: string;
    problem?: string;
    solution?: string;
    impact?: string;
    keyFeatures?: string[];
    complexity?: string;
    timeline?: string;
    description?: string;
    shortDescription?: string;
    coreSkills?: string[];
    interests?: string[];
  };
  messages?: Types.ObjectId[];
  owner?: Types.ObjectId;
  members?: Types.ObjectId[];
  invitations?: {
    pending?: Types.ObjectId[];
    rejected?: Types.ObjectId[];
    outgoing?: Types.ObjectId[];
  };
  suggestedTopics?: {
    name?: string;
    problem?: string;
    solution?: string;
    impact?: string;
    keyFeatures?: string[];
    complexity?: string;
    timeline?: string;
    description?: string;
    shortDescription?: string;
    coreSkills?: string[];
    interests?: string[];
  }[];
  visibility?: "Private" | "Public";
}

const groupSchema = new mongoose.Schema({
  name: {
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
    keyFeatures: [String],
    complexity: String,
    timeline: String,
    description: String,
    shortDescription: String,
    coreSkills: [String],
    interests: [String],
  },

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
      keyFeatures: [String],
      complexity: String,
      timeline: String,
      description: String,
      shortDescription: String,
      coreSkills: [String],
      interests: [String],
    },
  ],
  visibility: {
    type: String,
    enum: ["Private", "Public"],
    default: "Public",
  },
});

const GroupModel =
  mongoose.models?.Group || mongoose.model("Group", groupSchema);

export default GroupModel;
