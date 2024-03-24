"use server";

import Comment from "@/lib/mongodb/database/models/comment.model";
import User from "@/lib/mongodb/database/models/user.model";
import Event from "@/lib/mongodb/database/models/event.model";
import { handleError } from "@/lib/utils";
import { connectToDatabase } from "@/lib/mongodb/database";

export async function createComment(
  userId: string,
  eventId: string,
  content: string,
) {
  try {
    await connectToDatabase();

    const comment = await Comment.create({
      user: userId,
      event: eventId,
      content,
    });

    await User.findByIdAndUpdate(userId, { $push: { comments: comment._id } });

    await Event.findByIdAndUpdate(eventId, {
      $push: { comments: comment._id },
    });

    return comment;
  } catch (error) {
    handleError(error);
  }
}

export async function getComments(eventId: string) {
  try {
    await connectToDatabase();

    const event = await Event.findById(eventId).populate("comments");

    if (!event) {
      throw new Error("Event not found");
    }

    return event.comments;
  } catch (error) {
    handleError(error);
  }
}

export async function deleteComment(commentId: string) {
  try {
    await connectToDatabase();

    const commentToDelete = await Comment.findById(commentId);

    if (!commentToDelete) {
      throw new Error("Comment not found");
    }

    await User.findByIdAndUpdate(commentToDelete.user, {
      $pull: { comments: commentId },
    });

    await Event.findByIdAndUpdate(commentToDelete.event, {
      $pull: { comments: commentId },
    });

    await Comment.findByIdAndDelete(commentId);

    return commentToDelete;
  } catch (error) {
    handleError(error);
  }
}
