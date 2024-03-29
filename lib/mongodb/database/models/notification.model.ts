import { Schema, model, models } from "mongoose";

const NotificationSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  read: { type: Boolean, default: false },
});

const Notification =
  models.Notification || model("Notification", NotificationSchema);

export default Notification;
