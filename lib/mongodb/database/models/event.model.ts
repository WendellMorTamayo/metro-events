import { model, models, Schema } from "mongoose";

// @ts-ignore
export interface IEvent extends Document {
  _id: string;
  title: string;
  description?: string;
  location?: string;
  createdAt: Date;
  imageUrl: string;
  startDate: Date;
  endDateTime: Date;
  price: string;
  isFree: boolean;
  url?: string;
  category: { _id: string; name: string };
  organizer: { _id: string; firstName: string; lastName: string };
  upVotes: number;
  downVotes: number;
  userVotes: string[];
}

const EventSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  location: { type: String },
  createdAt: { type: Date, default: Date.now },
  imageUrl: { type: String, required: true },
  startDate: { type: Date, default: Date.now() },
  endDateTime: { type: Date, default: Date.now() },
  price: { type: String },
  isFree: { type: Boolean, default: false },
  url: { type: String },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  organizer: { type: Schema.Types.ObjectId, ref: "User" },
  upVotes: { type: Number, default: 0 },
  downVotes: { type: Number, default: 0 },
  userVotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const Event = models.Event || model("Event", EventSchema);

export default Event;
