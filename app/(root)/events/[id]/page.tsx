import React, { useMemo } from "react";
import { SearchParamProps } from "@/types";
import {
  checkUserHasPurchasedTickets,
  checkUserUpvoted,
  getEventById,
  getRelatedEventsByCategory,
} from "@/lib/mongodb/actions/event.actions";
import Image from "next/image";
import { formatDateTime } from "@/lib/utils";
import Collection from "@/components/shared/Collection";
import CheckOutButton from "@/components/shared/CheckOutButton";
import { HeartButton } from "@/components/shared/HeartButton";
import { auth } from "@clerk/nextjs";
import { getParticipantsByEvent } from "@/lib/mongodb/actions/participant.actions";
import { DataTable } from "@/components/shared/participant/data-table";
import { columns } from "@/components/shared/participant/columns";
import { getOrdersByEventId } from "@/lib/mongodb/actions/order.actions";

const EventDetails = async ({
  params: { id },
  searchParams,
}: SearchParamProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const event = await getEventById(id);
  const relatedEvents = await getRelatedEventsByCategory({
    categoryId: event.category._id,
    eventId: id,
    page: searchParams.page as string,
  });

  const isUpvoted = await checkUserUpvoted(id, userId);
  const eventOrders = await getOrdersByEventId(id);
  const participants = await getParticipantsByEvent(id);
  console.log("Participants::", participants);
  const hasOrdered = eventOrders.filter((e: any) => e.buyer === userId) > 0;
  const hasParticipated =
    participants.filter((e: any) => e.userId === userId) > 0;
  return (
    <>
      <section
        className={
          "flex justify-center bg-primary-50 bg-dotted-pattern bg-contain"
        }
      >
        <div className={"grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl"}>
          <Image
            src={event.imageUrl}
            alt={"hero image"}
            width={1000}
            height={1000}
            className={"h-full min-h-[300px] object-cover object-center"}
          />
          <div className={"flex w-full flex-col gap-8 p-5 md:p-10"}>
            <div className={"flex flex-col gap-6"}>
              <h2 className={"h2-bold"}>{event.title}</h2>
              <div
                className={"flex flex-col gap-3 sm:flex-row sm:items-center"}
              >
                <div className={"flex gap-3"}>
                  <p
                    className={
                      "p-bold-20 rounded-full bg-green-500/10 px-5 py-2 text-green-700"
                    }
                  >
                    {event.isFree ? "FREE" : `$${event.price}`}
                  </p>
                  <p
                    className={
                      "p-medium-16 rounded-full bg-grey-500/10 px-4 py-2.5 text-grey-500"
                    }
                  >
                    {event.category.name}
                  </p>
                </div>
                <p className={"p-medium-18 ml-2 mt-2 sm:mt-0"}>
                  by{" "}
                  <span className={"text-primary-500"}>
                    {event.organizer.firstName} {event.organizer.lastName}
                  </span>
                </p>
              </div>
            </div>
            <div className={"flex flex-row justify-start items-center"}>
              <HeartButton eventId={id} userId={userId} isUpvoted={isUpvoted} />
              <CheckOutButton
                event={event}
                participants={[eventOrders]}
                hasPurchased={hasOrdered}
                hasParticipated={hasParticipated}
              />
            </div>

            <div className={"flex flex-col gap-5"}>
              <div className={"flex gap-2 md:gap-3"}>
                <Image
                  src={"/assets/icons/calendar.svg"}
                  alt={"calendar"}
                  width={32}
                  height={32}
                />
                <div
                  className={
                    "p-medium-16 lg:p-regular-20 flex flex-wrap items-center"
                  }
                >
                  <p>
                    {formatDateTime(event.startDate).dateOnly} -{" "}
                    {formatDateTime(event.startDate).timeOnly}
                  </p>
                  <p>
                    {formatDateTime(event.endDateTime).dateOnly} -{" "}
                    {formatDateTime(event.endDateTime).timeOnly}
                  </p>
                </div>
              </div>
              <div className={"p-regular-20 flex items-center gap-3 "}>
                <Image
                  src={"/assets/icons/location.svg"}
                  alt={"location"}
                  width={32}
                  height={32}
                />
                <p className={"p-medium lg:p-regular-20"}>{event.location}</p>
              </div>
            </div>
            <div className={"flex flex-col gap-2"}>
              <p className={"p-bold-20 text-grey-600"}>
                What You&apos;ll Learn:
              </p>
              <p className={"p-medium-16 lg:p-regular-18"}>
                {event.description}
              </p>
              <p
                className={
                  "p-medium-16 lg:p-regular-18 truncate text-primary-500 underline"
                }
              >
                {event.url}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className={"wrapper my-8 flex flex-col gap-8 md:gap-12"}>
        <h2 className={"h2-bold"}>Related Events</h2>
        {eventOrders && <DataTable columns={columns} data={eventOrders} />}
      </section>
      <section className={"wrapper my-8 flex flex-col gap-8 md:gap-12"}>
        <h2 className={"h2-bold"}>Related Events</h2>
        <Collection
          data={relatedEvents?.data}
          emptyTitle="No events found"
          emptyStateSubtext="Coome back later"
          collectionType={"All_Events"}
          limit={3}
          page={searchParams.page as string}
          totalPages={relatedEvents?.totalPages || 1}
        />
      </section>
    </>
  );
};
export default EventDetails;
