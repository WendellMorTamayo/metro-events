"use client";

import React, { useState, useTransition } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { EditIcon } from "lucide-react";
import UserModel from "@/lib/mongodb/database/models/user.model";
import { changeUserRole } from "@/lib/mongodb/actions/user.actions";
import { toast } from "@/components/ui/use-toast";
import { sendNotification } from "@/lib/mongodb/actions/notification.actions";

export const UpdateUserConfirmation = ({
  user,
  adminId,
}: {
  user: any;
  adminId: string;
}) => {
  let [isPending, startTransition] = useTransition();
  const [isAdmin, setIsAdmin] = useState(user.isAdmin);
  const router = useRouter();
  console.log("Result::", user);
  return (
    <AlertDialog>
      <AlertDialogTrigger className={"flex justify-between"}>
        <EditIcon className={"w-4 h-4"} />
        <p>Change role</p>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Update user role? </AlertDialogTitle>
          <AlertDialogDescription className="p-regular-16 text-grey-600">
            <div className={"flex flex-row"}>
              <p className={"text-start p-bold-16 px-1"}>
                This will change {user.username + "'s"} role to:{" "}
              </p>
              {isAdmin ? (
                <p className={"text-start p-bold-16 text-red-500"}>User</p>
              ) : (
                <p className={"text-start p-bold-16 text-red-500"}>Admin</p>
              )}
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction
            onClick={() =>
              startTransition(async () => {
                if (adminId === user._id) {
                  toast({
                    title: "Cannot change your role",
                    description: "You cannot change your own role",
                  });
                  return;
                }
                setIsAdmin(!isAdmin);
                await changeUserRole(user._id, adminId, !user.isAdmin);
                await sendNotification(
                  user._id,
                  `Your role has been updated to ${user.isAdmin ? "User" : "Admin"}`,
                );
                toast({
                  title: "User role updated",
                  description: `User role has been updated to ${
                    user.isAdmin ? "User" : "Admin"
                  }`,
                });
              })
            }
          >
            {isPending ? "Updating..." : "Update"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
