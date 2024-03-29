import { UpdateUserParams } from "@/types";
import { connectToDatabase } from "@/lib/mongodb/database";
import User from "@/lib/mongodb/database/models/user.model";
import { handleError } from "@/lib/utils";
import Event from "@/lib/mongodb/database/models/event.model";
import Order from "@/lib/mongodb/database/models/order.model";
import { revalidatePath } from "next/cache";

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

export async function deleteUser(clerkId: string, adminId: string) {
  try {
    await connectToDatabase();

    if (clerkId === adminId) {
      throw new Error("You cannot delete yourself");
    }

    const admin = await User.findById(adminId);
    const isUserAdmin = admin?.isAdmin;

    if (!isUserAdmin) {
      throw new Error("You do not have permission to delete users");
    }

    const userToDelete = await User.findOne({ clerkId });

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

    // Delete user
    const deletedUser = await User.findByIdAndDelete(userToDelete._id);
    revalidatePath("/");

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {
    handleError(error);
  }
}
