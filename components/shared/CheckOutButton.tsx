"use client";

import React, { useEffect, useState, useTransition } from "react";

import { IEvent } from "@/lib/mongodb/database/models/event.model";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Checkout from "./Checkout";

const CheckOutButton = ({
  event,
  participants,
  hasPurchased,
}: {
  event: IEvent;
  participants: string[];
  hasPurchased: boolean;
}) => {
  const [isPending, startTransition] = useTransition();
  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;
  const hasEventFinished = new Date(event.endDateTime) < new Date();

  return (
    <div className={"flex items-center gap-3"}>
      {hasEventFinished ? (
        <p className={"p-2 text-red-400"}>
          Sorry, tickets are no longer available.
        </p>
      ) : (
        <>
          <SignedOut>
            <Button asChild className={"button rounded-full"} size={"lg"}>
              <Link href={"/sign-in"}>Get Tickets</Link>
            </Button>
          </SignedOut>
          <SignedIn>
            <Checkout
              event={event}
              userId={userId}
              hasPurchased={hasPurchased}
            />
          </SignedIn>
        </>
      )}
    </div>
  );
};
export default CheckOutButton;
