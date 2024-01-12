import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
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
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isReported: {
    type: Boolean,
    default: false,
  },
  groups: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Group",
    },
  ],
  invitations: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Group",
    },
  ],
  details: {
    short_description: {
      type: String,
    },
    bio: {
      type: String,
    },
    niche: {
      type: String,
    },
    secondary_niche: {
      type: String,
    },
    country: {
      type: String,
    },
    phone_number: {
      type: String,
    },
    timezone: {
      type: String,
    },
    skills: [
      {
        type: String,
      },
    ],
    social_profile: {
      type: String,
    },
    interest: [
      {
        type: String,
      },
    ],
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
