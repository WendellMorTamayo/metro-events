"use client";
import React, { useTransition } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CopyIcon, MoreHorizontal, TrashIcon } from "lucide-react";
import { DeleteEventConfirmation } from "@/components/shared/admin/events/DeleteEventConfirmation";
import { ApproveEventConfirmation } from "@/components/shared/admin/events/ApproveEventConfirmation";

export default function EventTableRowActions({ event, adminId }: any) {
  const [isPending, startTransition] = useTransition();

  return (
    <>
      <Button
        className={"w-14 rounded-none"}
        variant="default"
        onClick={() => {
          console.log("row");
        }}
      >
        <ApproveEventConfirmation
          eventId={event._id}
          adminId={adminId}
          userId={event.organizer}
        />
      </Button>
      <Button
        className={"w-14 rounded-none"}
        variant="destructive"
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        <DeleteEventConfirmation eventId={event._id} adminId={adminId} />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(event.organizer)}
            className={"flex items-center justify-start"}
          >
            <CopyIcon className={"w-4 h-4"} />
            <p>Copy organizer ID</p>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(event._id)}
            className={"flex items-center justify-start"}
          >
            <CopyIcon className={"w-4 h-4"} />
            <p>Copy event ID</p>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={(e) => e.preventDefault()}
            className={"flex items-center justify-between"}
          >
            {/*<UpdateUserConfirmation user={user} adminId={adminId} />*/}
          </DropdownMenuItem>
          <DropdownMenuItem
            className={"flex items-center justify-between text-red-500"}
            onClick={(e) => e.preventDefault()}
          >
            {/*<DeleteUserConfirmation userId={user._id} adminId={adminId} />*/}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
