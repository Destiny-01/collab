import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  short_description: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  uuid: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
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
  visibility: {
    type: String,
    enum: ["Private", "Public"],
    default: "Public",
  },
});

const Group = mongoose.models.Group || mongoose.model("Group", groupSchema);

export default Group;
