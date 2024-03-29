"use server";

import Notification from "@/lib/mongodb/database/models/notification.model";
import User from "@/lib/mongodb/database/models/user.model";
import { handleError } from "@/lib/utils";
import { connectToDatabase } from "@/lib/mongodb/database";

export async function sendNotification(userId: string, message: string) {
  try {
    await connectToDatabase();

    const notification = await Notification.create({ user: userId, message });

    await User.findByIdAndUpdate(userId, {
      $push: { notifications: notification._id },
    });
    console.log("Notification sent:", notification);
    return notification;
  } catch (error) {
    handleError(error);
  }
}

export async function getNotifications(userId: string) {
  try {
    await connectToDatabase();
    const notifications = await Notification.find({ user: userId }).sort({
      createdAt: "desc",
    });

    if (!notifications) {
      throw new Error("User not found");
    }

    return JSON.parse(JSON.stringify(notifications));
  } catch (error) {
    handleError(error);
  }
}

export async function clearNotifications(userId: string) {
  try {
    await connectToDatabase();

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { notifications: [] } },
      { new: true },
    );

    if (!user) {
      throw new Error("User not found");
    }

    return user.notifications;
  } catch (error) {
    handleError(error);
  }
}

export async function readNotification(notificationId: string) {
  try {
    await connectToDatabase();

    const notification = await Notification.findByIdAndUpdate(
      notificationId,
      { read: true },
      { new: true },
    );

    if (!notification) {
      throw new Error("Notification not found");
    }

    return JSON.parse(JSON.stringify(notification));
  } catch (error) {
    handleError(error);
  }
}
