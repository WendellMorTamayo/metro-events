"use server";

import { CreateUserParams, UpdateUserParams } from "@/types";
import { handleError } from "@/lib/utils";
import { connectToDatabase } from "@/lib/mongodb/database";
import User from "@/lib/mongodb/database/models/user.model";
import Event from "@/lib/mongodb/database/models/event.model";
import Order from "@/lib/mongodb/database/models/order.model";
import { revalidatePath } from "next/cache";
import Category from "@/lib/mongodb/database/models/category.model";
import { deleteUserFromClerk } from "@/app/api/webhook/clerk/route";

export const createUser = async (user: CreateUserParams) => {
  try {
    await connectToDatabase();
    const newUser = await User.create(user);

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
};

export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    await connectToDatabase();

    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
      new: true,
    });

    if (!updatedUser) throw new Error("User update failed");
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
}

export async function deleteUser(clerkId: string) {
  try {
    await connectToDatabase();

    console.log("Deleting user with id: ", clerkId);
    // Find user to delete
    const userToDelete = await User.findOne({
      _id: clerkId,
    });
    console.log("User to delete: ", userToDelete);
    if (!userToDelete) {
      throw new Error("User not found");
    }
    // Unlink relationships
    await Promise.all([
      Event.updateMany(
        { _id: { $in: userToDelete.events } },
        { $pull: { organizer: userToDelete._id } },
      ),

      // Update the 'orders' collection to remove references to the user
      Order.updateMany(
        { _id: { $in: userToDelete.orders } },
        { $unset: { buyer: 1 } },
      ),
    ]);
    await deleteUserFromClerk(userToDelete.clerkId);
    // Delete user
    const deletedUser = await User.findByIdAndDelete(userToDelete._id);
    revalidatePath("/");

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {
    handleError(error);
  }
}

export async function changeUserRole(
  clerkId: string,
  adminId: string,
  isAdmin: boolean,
) {
  try {
    await connectToDatabase();
    const isUserAdmin = await checkUserIsAdmin(adminId);
    if (!isUserAdmin) {
      throw new Error("You are not authorized to perform this action");
    }
    const updatedUser = await User.findByIdAndUpdate(
      clerkId,
      { isAdmin },
      { new: true },
    );
    console.log("UPDATED USER::::", updatedUser);
    revalidatePath("/");
    return updatedUser ? JSON.parse(JSON.stringify(updatedUser)) : null;
  } catch (e) {
    handleError(e);
  }
}

export async function checkUserIsAdmin(clerkId: string) {
  try {
    await connectToDatabase();

    const user = await User.findById(clerkId);
    return user && user.isAdmin;
  } catch (error) {
    handleError(error);
  }
}

export async function makeUserAdmin(clerkId: string) {
  try {
    await connectToDatabase();

    const user = await User.findByIdAndUpdate(
      { clerkId },
      { isAdmin: true },
      { new: true },
    );

    if (!user) throw new Error("User update failed");
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
}

export const getAllUsers = async () => {
  try {
    await connectToDatabase();
    const users = await User.find();
    console.log(users);
    return JSON.parse(JSON.stringify(users));
  } catch (error) {
    handleError(error);
  }
};

export const getLatestUsers = async () => {
  try {
    await connectToDatabase();
    const users = await User.find().sort({ createdAt: -1 }).limit(5);
    console.log(users);
    return JSON.parse(JSON.stringify(users));
  } catch (error) {
    handleError(error);
  }
};

export const getTotalUsers = async () => {
  try {
    await connectToDatabase();
    const users = await User.find();
    return users.length;
  } catch (error) {
    handleError(error);
  }
};

export const getUserById = async (clerkId: string) => {
  try {
    await connectToDatabase();
    const user = await User.findById(clerkId);
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
};

export const getUserFullName = async (clerkId: string) => {
  try {
    await connectToDatabase();
    const user = await User.findById(clerkId);
    return `${user.firstName} ${user.lastName}`;
  } catch (error) {
    handleError(error);
  }
};
