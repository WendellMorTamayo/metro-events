import { model, models, Schema } from "mongoose";

const CommentSchema = new Schema({
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  event: { type: Schema.Types.ObjectId, ref: "Event" },
});

const Comment = models.Comment || model("Comment", CommentSchema);

export default CommentSchema;
