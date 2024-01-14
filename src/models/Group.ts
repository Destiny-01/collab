import mongoose from "mongoose";

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
    short_description: String,
    description: String,
    problem: String,
    solution: String,
    impact: String,
    key_features: [String],
    complexity: String,
    estimated_timeline: String,
  },
  messages: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Message",
    },
  ],
  owner: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  members: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
  ],
  invitations: {
    pending: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
      },
    ],
    rejected: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
      },
    ],
    outgoing: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
      },
    ],
  },
  suggestedTopics: [
    {
      type: String,
    },
  ],
  details: {
    interests: [
      {
        type: String,
      },
    ],
    core_skills: [
      {
        type: String,
      },
    ],
  },
  visibility: {
    type: String,
    enum: ["Private", "Public"],
    default: "Public",
  },
});

const Group = mongoose.models.Group || mongoose.model("Group", groupSchema);

export default Group;
