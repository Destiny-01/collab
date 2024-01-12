import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  group: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Group",
  },
  author: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
});

const Message =
  mongoose.models.Message || mongoose.model("Message", messageSchema);

export default Message;
