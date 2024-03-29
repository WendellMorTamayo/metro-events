"use client";

import React, { useTransition } from "react";
import Image from "next/image";

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
import { deleteUser } from "@/lib/mongodb/actions/user.actions";
import { toast } from "@/components/ui/use-toast";

export const DeleteUserConfirmation = ({
  userId,
  adminId,
}: {
  userId: string;
  adminId: string;
}) => {
  let [isPending, startTransition] = useTransition();
  console.log("Result::", userId);
  return (
    <AlertDialog>
      <AlertDialogTrigger className={"flex justify-between"}>
        <Image
          src="/assets/icons/delete.svg"
          alt="delete"
          width={20}
          height={20}
        />
        <p className={"hover:text-red-500"}>Delete user</p>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete?</AlertDialogTitle>
          <AlertDialogDescription className="p-regular-16 text-grey-600">
            This will permanently delete this user
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction
            onClick={() =>
              startTransition(async () => {
                if (adminId === userId) {
                  toast({
                    title: "Error",
                    description: "You cannot delete yourself",
                    variant: "destructive",
                  });
                  return;
                }
                await deleteUser(userId);
                toast({
                  title: "User deleted",
                  description: `User has been deleted`,
                });
              })
            }
          >
            {isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
