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
import {
  deleteEvent,
  deleteEventAsAdmin,
} from "@/lib/mongodb/actions/event.actions";
import { deleteOrder } from "@/lib/mongodb/actions/order.actions";

export const DeleteParticipantConfirmation = ({
  event,
  eventId,
}: {
  event: any;
  eventId: string;
}) => {
  let [isPending, startTransition] = useTransition();
  console.log("Result::", eventId);
  return (
    <AlertDialog>
      <AlertDialogTrigger className={"flex w-14 justify-between"}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-trash"
        >
          <path d="M3 6h18" />
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
        </svg>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete?</AlertDialogTitle>
          <AlertDialogDescription className="p-regular-16 text-grey-600">
            This will permanently delete this event
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction
            onClick={() =>
              startTransition(async () => {
                await deleteOrder(eventId);
                console.log("EVENT ID: ", eventId);
                toast({
                  title: "Event deleted",
                  description: `Event has been deleted`,
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
