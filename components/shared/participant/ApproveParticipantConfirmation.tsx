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
import { toast } from "@/components/ui/use-toast";
import { sendNotification } from "@/lib/mongodb/actions/notification.actions";
import { createParticipant } from "@/lib/mongodb/actions/participant.actions";
import { getUserById } from "@/lib/mongodb/actions/user.actions";
import { deleteOrder } from "@/lib/mongodb/actions/order.actions";

export const ApproveParticipantConfirmation = ({
  event,
  eventId,
  userId,
}: {
  event: any;
  eventId: string;
  userId: string;
}) => {
  let [isPending, startTransition] = useTransition();

  console.log("Result::", eventId);
  return (
    <AlertDialog>
      <AlertDialogTrigger className={"flex w-14 justify-between"}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-check"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to approve this user?
          </AlertDialogTitle>
          <AlertDialogDescription className="p-regular-16 text-grey-600">
            This will approve the user and they will be able to participate in
            the event.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction
            onClick={() =>
              startTransition(async () => {
                const user = await getUserById(userId);
                const participant = await createParticipant({
                  name: user.firstName + " " + user.lastName,
                  email: user.email,
                  eventId,
                  userId,
                });
                await deleteOrder(eventId);
                console.log("Participant", participant);
                await sendNotification(
                  userId,
                  "Your participation in an event has been approved!",
                );
                toast({
                  title: "Participant approved",
                  description: `Participant has been approved`,
                });
              })
            }
          >
            {isPending ? "Approving..." : "Approve"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
