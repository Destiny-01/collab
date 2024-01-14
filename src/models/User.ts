import mongoose, { Types, Document, Model } from "mongoose";

interface UserDetails {
  short_description?: string;
  bio?: string;
  niche?: string;
  secondary_niche?: string;
  country?: string;
  phone_number?: string;
  timezone?: string;
  skills?: string[];
  social_profile?: string;
  language?: string;
  interest?: string[];
}

export interface User {
  username: string;
  name: string;
  email: string;
  password: string;
  avatar?: string;
  email_verification: string;
  isVerified?: boolean;
  isReported?: boolean;
  groups: Types.ObjectId[] | string[]; // Assuming you are using ObjectId or string for references
  invitations: Types.ObjectId[] | string[]; // Assuming you are using ObjectId or string for references
  details?: UserDetails;
}

interface UserDocument extends User, Document {
  id: any;
}

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
    language: {
      type: String,
    },
  },
});

export default (mongoose.models.User as unknown as Model<UserDocument>) ||
  mongoose.model<User>("User", userSchema);
