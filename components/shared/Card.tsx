import React from "react";
import { IEvent } from "@/lib/mongodb/database/models/event.model";
import Link from "next/link";
import { formatDateTime } from "@/lib/utils";
import Image from "next/image";
import { auth } from "@clerk/nextjs";
import { DeleteConfirmation } from "@/components/shared/DeleteConfirmation";
import { HeartButton } from "@/components/shared/HeartButton";

type CardProps = {
  event: IEvent;
  hasOrderLink?: boolean;
  hidePrice?: boolean;
};
const Card = ({ event, hasOrderLink, hidePrice }: CardProps) => {
  if (!event) return null;
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  console.log("USER ID: ", event);
  const isEventCreator = userId === event.organizer._id.toString();
  const isUpvoted: boolean = event.upVoters.includes(userId);
  return (
    <div
      className={
        "group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]"
      }
    >
      <Link
        href={`/events/${event._id}`}
        style={{ backgroundImage: `url(${event.imageUrl})` }}
        className={
          "flex-center flex-grow bg-gray-50 bg-cover bg-center text-grey-600"
        }
      />
      {isEventCreator && !hidePrice && (
        <div
          className={
            "absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all"
          }
        >
          <Link href={`/events/${event._id}/update`}>
            <Image
              src={"/assets/icons/edit.svg"}
              alt={"edit"}
              width={20}
              height={20}
            />
          </Link>
          <DeleteConfirmation eventId={event._id} />
        </div>
      )}
      <div className={"flex min-h-[230px] flex-col gap-3 p-5 md:gap-4"}>
        {!hidePrice && (
          <div className={"flex flex-between"}>
            <div className={"flex gap-2"}>
              <span
                className={
                  "p-semibold-14 w-min rounded-full bg-green-100 px-4 py-1 text-green-600"
                }
              >
                {event.isFree ? "FREE" : `$${event.price}`}
              </span>
              <p
                className={
                  "p-semibold-14 w-min rounded-full bg-grey-500/10 px-4 py-1 text-grey-500 line-clamp-1"
                }
              >
                {event.category.name}
              </p>
            </div>
            <div className={"h-14 w-14 absolute justify-start right-7"}>
              <HeartButton
                eventId={event._id}
                userId={userId}
                isUpvoted={isUpvoted}
              />
            </div>
          </div>
        )}

        <p className={"p-medium-16 md:p-medium-18 text-grey-600"}>
          {formatDateTime(event.startDate).dateTime}
        </p>

        <Link href={`/events/${event._id}`}>
          <p
            className={
              "p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black"
            }
          >
            {event.title}
          </p>
        </Link>

        <div className={"flex-between w-full"}>
          <p className={"p-medium-14 md:p-medium-16 text-grey-600"}>
            {event.organizer.firstName} {event.organizer.lastName}
          </p>
          {hasOrderLink && (
            <Link
              href={`/orders?eventId=${event._id}`}
              className={"flex gap-2"}
            >
              <p className={"text-primary-500"}>Order Details</p>
              <Image
                src={"/assets/icons/arrow.svg"}
                alt={"search"}
                width={10}
                height={10}
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
export default Card;
