"use server";

import { revalidatePath } from "next/cache";

import { connectToDatabase } from "@/lib/mongodb/database";
import Event from "@/lib/mongodb/database/models/event.model";
import User from "@/lib/mongodb/database/models/user.model";
import Category from "@/lib/mongodb/database/models/category.model";
import { handleError } from "@/lib/utils";

import {
  CreateEventParams,
  UpdateEventParams,
  DeleteEventParams,
  GetAllEventsParams,
  GetEventsByUserParams,
  GetRelatedEventsByCategoryParams,
} from "@/types";
import { deleteOrder } from "@/lib/mongodb/actions/order.actions";
import { useRouter } from "next/navigation";

const getCategoryByName = async (name: string) => {
  return Category.findOne({ name: { $regex: name, $options: "i" } });
};

const populateEvent = (query: any) => {
  return query
    .populate({
      path: "organizer",
      model: User,
      select: "_id firstName lastName",
    })
    .populate({ path: "category", model: Category, select: "_id name" });
};

// CREATE
export async function createEvent({ userId, event, path }: CreateEventParams) {
  try {
    await connectToDatabase();

    const organizer = await User.findById(userId);
    if (!organizer) throw new Error("Organizer not found");

    const newEvent = await Event.create({
      ...event,
      category: event.categoryId,
      organizer: userId,
    });
    revalidatePath(path);

    return JSON.parse(JSON.stringify(newEvent));
  } catch (error) {
    handleError(error);
  }
}

// GET ONE EVENT BY ID
export async function getEventById(eventId: string) {
  try {
    await connectToDatabase();

    const event = Event.findById(eventId);

    if (!event) throw new Error("Event not found");
    // if (!event.isApproved) throw new Error("Event has not been approved yet!");

    const e = await populateEvent(event);
    return JSON.parse(JSON.stringify(e));
  } catch (error) {
    handleError(error);
  }
}

// UPDATE
export async function updateEvent({ userId, event, path }: UpdateEventParams) {
  try {
    await connectToDatabase();

    const eventToUpdate = await Event.findById(event._id);
    if (!eventToUpdate || eventToUpdate.organizer.toHexString() !== userId) {
      throw new Error("Unauthorized or event not found");
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      event._id,
      { ...event, category: event.categoryId },
      { new: true },
    );
    revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedEvent));
  } catch (error) {
    handleError(error);
  }
}

// DELETE
export async function deleteEvent({ eventId, path }: DeleteEventParams) {
  try {
    await connectToDatabase();

    const deletedEvent = await Event.findByIdAndDelete(eventId);
    if (deletedEvent) {
      await deleteOrder(eventId);
      revalidatePath(path);
    }
  } catch (error) {
    handleError(error);
  }
}

export async function approveEvent(eventId: string) {
  try {
    await connectToDatabase();

    const event = await Event.findByIdAndUpdate(
      eventId,
      { isApproved: true },
      { new: true },
    )
      .populate({
        path: "organizer",
        model: User,
        select: "_id firstName lastName",
      })
      .populate({ path: "category", model: Category, select: "_id name" });

    return JSON.parse(JSON.stringify(event));
  } catch (e) {
    handleError(e);
  }
}

export async function deleteEventAsAdmin(eventId: string) {
  try {
    await connectToDatabase();

    const deletedEvent = await Event.findByIdAndDelete(eventId);
    if (deletedEvent) {
      await deleteOrder(eventId);
      return JSON.parse(JSON.stringify(deletedEvent));
    }
  } catch (error) {
    handleError(error);
  }
}

// GET ALL APPROVED EVENTS
export async function getAllApprovedEvents({
  query,
  limit = 6,
  page,
  category,
}: GetAllEventsParams) {
  try {
    await connectToDatabase();

    const titleCondition = query
      ? { title: { $regex: query, $options: "i" } }
      : {};
    const categoryCondition = category
      ? await getCategoryByName(category)
      : null;
    const conditions = {
      $and: [
        titleCondition,
        categoryCondition ? { category: categoryCondition._id } : {},
        { isApproved: true },
      ],
    };

    const skipAmount = (Number(page) - 1) * limit;
    const eventsQuery = Event.find(conditions)
      .sort({ createdAt: "asc" })
      .skip(skipAmount)
      .limit(limit);

    const events = await populateEvent(eventsQuery);
    const eventsCount = await Event.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(events)),
      totalPages: Math.ceil(eventsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

export async function getNotApprovedEvents() {
  try {
    await connectToDatabase();

    const events = await Event.find({ isApproved: false });
    return JSON.parse(JSON.stringify(events));
  } catch (error) {
    handleError(error);
  }
}

// GET ALL EVENTS
export async function getAllEvents({
  query,
  limit = 6,
  page,
  category,
}: GetAllEventsParams) {
  try {
    await connectToDatabase();

    const titleCondition = query
      ? { title: { $regex: query, $options: "i" } }
      : {};
    const categoryCondition = category
      ? await getCategoryByName(category)
      : null;
    const conditions = {
      $and: [
        titleCondition,
        categoryCondition ? { category: categoryCondition._id } : {},
      ],
    };

    const skipAmount = (Number(page) - 1) * limit;
    const eventsQuery = Event.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const events = await populateEvent(eventsQuery);
    const eventsCount = await Event.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(events)),
      totalPages: Math.ceil(eventsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

// GET EVENTS BY ORGANIZER
export async function getEventsByUser({
  userId,
  limit = 6,
  page,
}: GetEventsByUserParams) {
  try {
    await connectToDatabase();

    const conditions = { organizer: userId };
    const skipAmount = (page - 1) * limit;

    const eventsQuery = Event.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const events = await populateEvent(eventsQuery);
    const eventsCount = await Event.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(events)),
      totalPages: Math.ceil(eventsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

// GET RELATED EVENTS: EVENTS WITH SAME CATEGORY
export async function getRelatedEventsByCategory({
  categoryId,
  eventId,
  limit = 3,
  page = 1,
}: GetRelatedEventsByCategoryParams) {
  try {
    await connectToDatabase();

    const skipAmount = (Number(page) - 1) * limit;
    const conditions = {
      $and: [
        { category: categoryId },
        { _id: { $ne: eventId } },
        { isApproved: true },
        { location: { $ne: null } },
      ],
    };

    const eventsQuery = Event.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const events = await populateEvent(eventsQuery);
    const eventsCount = await Event.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(events)),
      totalPages: Math.ceil(eventsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

export async function checkEventApproved(eventId: string) {
  try {
    await connectToDatabase();

    const user = await Event.findById(eventId);
    return user && user.isAdmin;
  } catch (error) {
    handleError(error);
  }
}

type UpVoteEventProps = {
  eventId: string;
  userId: string;
};
export async function upVoteEvent({ eventId, userId }: UpVoteEventProps) {
  try {
    await connectToDatabase();

    const event = await Event.findById(eventId);
    console.log("EVENT: ", event.upVoters.length);
    if (!event) {
      throw new Error("Event not found");
    }

    const upVoters = event.upVoters;
    let upVotes = event.upVotes;
    if (upVoters.includes(userId)) {
      upVotes -= 1;
      upVoters.pull(userId);
      await Event.findByIdAndUpdate(
        eventId,
        { upVoters, upVotes },
        { new: true },
      );
      return JSON.parse(JSON.stringify(upVoters));
    }
    upVotes += 1;
    upVoters.push(userId);
    await Event.findByIdAndUpdate(
      eventId,
      { upVoters, upVotes },
      { new: true },
    );

    return JSON.parse(JSON.stringify(upVoters));
  } catch (error) {
    handleError(error);
  }
}

export const checkUserUpvoted = async (eventId: string, userId: string) => {
  try {
    await connectToDatabase();

    const event = await Event.findById(eventId);
    return event?.upVoters.includes(userId);
  } catch (error) {
    handleError(error);
  }
};

export async function getAllUpvoters(eventId: string) {
  try {
    await connectToDatabase();

    const event = await Event.findById(eventId);
    return JSON.parse(
      JSON.stringify({
        userUpVotes: event?.upVoters,
        upvoteCount: event?.upVoters.countDocuments(),
      }),
    );
  } catch (error) {
    handleError(error);
  }
}

export async function getEventParticipants(eventId: string) {
  try {
    await connectToDatabase();

    const event = await Event.findById(eventId);
    return JSON.parse(
      JSON.stringify({
        participants: event?.participants,
        participantsCount: event?.participants.length,
      }),
    );
  } catch (error) {
    handleError(error);
  }
}

export async function checkUserHasPurchasedTickets(
  eventId: string,
  userId: string,
) {
  try {
    await connectToDatabase();
    const event = await Event.findById(eventId);
    return event?.participants.includes(userId);
  } catch (error) {
    handleError(error);
  }
}

export async function getTotalEvents() {
  try {
    await connectToDatabase();
    const events = await Event.find();
    return events.length;
  } catch (error) {
    handleError(error);
  }
}
