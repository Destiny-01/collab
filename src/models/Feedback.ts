import mongoose, { Types, Document, Model } from "mongoose";

export interface Feedback {
  whatYouThink: string;
}

export interface FeedbackDocument extends Feedback, Document {
  id: any;
}

const feedbackSchema = new mongoose.Schema(
  {
    what: {
      type: String,
    },
    how: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default (mongoose.models
  ?.Feedback as unknown as Model<FeedbackDocument>) ||
  mongoose.model<Feedback>("Feedback", feedbackSchema);
