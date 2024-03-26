"use client";

import React, { useState } from "react";
import { BellIcon, Inbox } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import Link from "next/link";

const NotificationButton = () => {
  const [notifications, setNotifications] = useState([
    {
      title: "New Message",
      message: "You have a new message from John Doe",
      date: "02-01-2025",
      read: true,
    },
    {
      title: "New Order",
      message: "You have a new order from Jane Doe",
      date: "02-02-2025",
      read: true,
    },
    {
      title: "New Order",
      message: "You have a new order from Jane Doe",
      date: "02-02-2025",
      read: true,
    },
    {
      title: "New Order",
      message: "You have a new order from Jane Doe",
      date: "02-02-2025",
      read: true,
    },
    {
      title: "New Order",
      message: "You have a new order from Jane Doe",
      date: "02-02-2025",
      read: true,
    },
    {
      title: "New Order",
      message: "You have a new order from Jane Doe",
      date: "02-02-2025",
      read: true,
    },
    {
      title: "New Order",
      message: "You have a new order from Jane Doe",
      date: "02-02-2025",
      read: true,
    },
  ]);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={
          "border-0 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0 leading-none peer-disabled:cursor-not-allowed"
        }
        asChild
      >
        <Button
          variant="outline"
          size="icon"
          className={"relative outline outline-1 outline-gray-200"}
        >
          <div
            className={`absolute -top-2 -right-1 h-3 w-3 rounded-full my-1 ${notifications.find((x: any) => x.read === true) ? "bg-green-500" : "bg-neutral-200"}`}
          ></div>
          <BellIcon className="h-6 w-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={"end"}
        className={"h-[500px] w-96 rounded-lg shadow-lg bg-white"}
      >
        <Tabs defaultValue="all" className="w-full h-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className={"h-full w-full "}>
            {notifications.length > 0 ? (
              <ScrollArea
                className={"w-full h-full"}
                style={{ overflowY: "auto", paddingBottom: "45px" }}
              >
                {notifications.map((notification, index) => (
                  <>
                    <Link href={`/`}>
                      <Separator />
                      <Card
                        key={index}
                        className={
                          "w-full rounded-none border-0 hover:bg-slate-200"
                        }
                      >
                        <CardContent
                          className={"flex flex-col justify-center p-5"}
                        >
                          <div
                            className={`relative self-end flex h-3 w-3 rounded-full my-1 ${!notification.read ? "bg-green-500" : "bg-neutral-200"}`}
                          ></div>
                          <CardTitle className={"p-bold-16"}>
                            {notification.title}
                          </CardTitle>
                          <CardDescription className={"line-clamp-2"}>
                            {notification.message}
                          </CardDescription>
                        </CardContent>
                        <CardFooter className={"flex flex-between"}>
                          <p>{notification.date}</p>
                        </CardFooter>
                      </Card>
                      <Separator />
                    </Link>
                  </>
                ))}
              </ScrollArea>
            ) : (
              <>
                <Card
                  className={"w-full h-full justify-center items-center flex"}
                >
                  <CardContent
                    className={"flex flex-col justify-center items-center"}
                  >
                    <div
                      className={
                        "flex justify-center items-center rounded-full bg-grey-50 h-14 w-14"
                      }
                    >
                      <Inbox className="h-5 w-5" />
                    </div>
                    <p className={"p-bold-14"}>No new notifications</p>
                  </CardContent>
                </Card>
              </>
            )}
          </TabsContent>
          <TabsContent
            value="unread"
            className={"h-full w-full "}
            style={{ overflowY: "auto", paddingBottom: "45px" }}
          >
            {notifications.length < 0 ? (
              <></>
            ) : (
              <>
                <Card
                  className={"w-full h-full justify-center items-center flex"}
                >
                  <CardContent
                    className={"flex flex-col justify-center items-center"}
                  >
                    <div
                      className={
                        "flex justify-center items-center rounded-full bg-grey-50 h-14 w-14 text-center"
                      }
                    >
                      <Inbox className="h-5 w-5" />
                    </div>
                    <p className={"p-bold-14"}>No unread notifications</p>
                  </CardContent>
                </Card>
              </>
            )}
          </TabsContent>
        </Tabs>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default NotificationButton;
