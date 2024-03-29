"use client";
import React, { useTransition } from "react";

import { Button } from "@/components/ui/button";
import { ApproveParticipantConfirmation } from "@/components/shared/participant/ApproveParticipantConfirmation";
import { DeleteParticipantConfirmation } from "@/components/shared/participant/DeleteParticipantConfirmation";

export default function ParticipantRowActions({ event }: any) {
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
        <ApproveParticipantConfirmation
          event={event}
          eventId={event._id}
          userId={event.buyer}
        />
      </Button>
      <Button
        className={"w-14 rounded-none"}
        variant="destructive"
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        <DeleteParticipantConfirmation eventId={event._id} event={event} />
      </Button>
    </>
  );
}
