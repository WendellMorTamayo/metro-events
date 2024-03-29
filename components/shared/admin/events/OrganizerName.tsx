"use client";
import React, { useEffect, useState, useTransition } from "react";
import {
  getUserById,
  getUserFullName,
} from "@/lib/mongodb/actions/user.actions";

function OrganizerName({ organizerId }: { organizerId: string }) {
  let [isPending, startTransition] = useTransition();
  const [name, setName] = useState("");
  let user;
  useEffect(() => {
    startTransition(async () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      user = await getUserById(organizerId);
      // @ts-ignore
      setName((user.firstName + " " + user.lastName).toString());
      console.log("User::::", user);
    });
  }, [organizerId]);
  return <div>{!isPending && <p>{name}</p>}</div>;
}

export default OrganizerName;
