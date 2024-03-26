"use client";

import React, { useState, useTransition } from "react";
import { AiFillHeart } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { upVoteEvent } from "@/lib/mongodb/actions/event.actions";

type HeartButtonProps = {
  eventId: string;
  userId: string;
  isUpvoted: boolean;
};

export const HeartButton = ({
  eventId,
  userId,
  isUpvoted,
}: HeartButtonProps) => {
  const [isPending, startTransition] = useTransition();
  const [isLocalUpvoted, setIsLocalUpvoted] = useState(isUpvoted);

  const handleClick = async () => {
    startTransition(async () => {
      const res = await upVoteEvent({ eventId, userId });
      setIsLocalUpvoted(res?.includes(userId) || !isLocalUpvoted);
      console.log("res::", res);
    });
  };

  return (
    <Button
      variant={"ghost"}
      asChild
      className={`flex items-center cursor-pointer transition-all gap-1 ${isLocalUpvoted ? "text-red-600" : "text-grey-500"}  hover:${isLocalUpvoted ? "text-grey-500" : "text-red-600"}`}
      onClick={handleClick}
    >
      <AiFillHeart className={"w-20 h-20 "} />
    </Button>
  );
};
