"use client";

import React, { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { IEvent } from "@/lib/mongodb/database/models/event.model";
import { getAllUsers, getUserById } from "@/lib/mongodb/actions/user.actions";
import { createParticipant } from "@/lib/mongodb/actions/participant.actions";
import { createOrder } from "@/lib/mongodb/actions/order.actions";

export const Checkout = ({
  event,
  userId,
  hasPurchased,
  hasParticipated,
}: {
  event: IEvent;
  userId: string;
  hasPurchased: boolean;
  hasParticipated: boolean;
}) => {
  const [active, setActive] = useState(hasPurchased);
  let [isPending, startTransition] = useTransition();

  const handleClick = async () => {
    setActive(!active);
    startTransition(async () => {
      const user = await getUserById(userId);
      const order = await createOrder({
        eventId: event._id,
        buyerId: userId,
        totalAmount: event.isFree ? "0" : event.price,
      });
      console.log(order);
    });
  };

  return (
    <Button
      type={"submit"}
      role={"link"}
      size={"lg"}
      className="button sm:w-fit"
      onClick={handleClick}
      disabled={active || !hasParticipated}
    >
      {active ? "Purchased" : isPending ? "Joining..." : "Buy Ticket"}
    </Button>
  );
};
export default Checkout;
