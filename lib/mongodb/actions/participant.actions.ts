"use server";

import { handleError } from "@/lib/utils";
import { connectToDatabase } from "@/lib/mongodb/database";
import Participant from "@/lib/mongodb/database/models/participant.model";
import Event from "@/lib/mongodb/database/models/event.model";
import { createOrder } from "@/lib/mongodb/actions/order.actions";

type CreateParticipantProps = {
  name: string;
  email: string;
  eventId: string;
  userId: string;
};
export const createParticipant = async ({
  name,
  email,
  eventId,
  userId,
}: CreateParticipantProps) => {
  try {
    await connectToDatabase();

    const participant = await Participant.findOne({
      event: eventId,
      user: userId,
    });

    if (participant) {
      return JSON.parse(
        JSON.stringify({
          message: "Participant already exists",
          status: "error",
        }),
      );
    }
    const newParticipant = await Participant.create({
      name,
      email,
      isApproved: false,
      user: userId,
      event: eventId,
    });

    return JSON.parse(JSON.stringify(newParticipant));
  } catch (error) {
    handleError(error);
  }
};

export const getAllParticipants = async () => {
  try {
    await connectToDatabase();

    const participants = await Participant.find();
    return JSON.parse(JSON.stringify(participants));
  } catch (error) {
    handleError(error);
  }
};

export const getParticipantsByEvent = async (eventId: string) => {
  try {
    await connectToDatabase();
    console.log("EVENT ID: ", eventId);
    const participants = await Participant.findOne({ event: eventId });
    console.log("PARTICIPANTS: ", participants);
    return JSON.parse(JSON.stringify(participants));
  } catch (error) {
    handleError(error);
  }
};

export const getParticipantById = async (participantId: string) => {
  try {
    await connectToDatabase();

    const participant = await Participant.findById(participantId);
    return JSON.parse(JSON.stringify(participant));
  } catch (error) {
    handleError(error);
  }
};

export const approveParticipant = async (participantId: string) => {
  try {
    await connectToDatabase();

    const participant = await Participant.findByIdAndUpdate(
      participantId,
      { isApproved: true },
      { new: true },
    );

    return JSON.parse(JSON.stringify(participant));
  } catch (e) {
    handleError(e);
  }
};
