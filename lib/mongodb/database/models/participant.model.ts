import { model, models, Schema } from "mongoose";

const ParticipantSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  isApproved: { type: Boolean, default: false },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  event: { type: Schema.Types.ObjectId, ref: "Event" },
});

const Participant =
  models.Participant || model("Participant", ParticipantSchema);

export default Participant;
