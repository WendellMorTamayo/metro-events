import * as React from "react";
import {
  checkUserIsAdmin,
  getAllUsers,
  getTotalUsers,
} from "@/lib/mongodb/actions/user.actions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Overview } from "@/components/shared/admin/overview/overview";
import { RecentUsers } from "@/components/shared/admin/user/recent-users";
import OverviewTab from "@/components/shared/admin/overview/OverviewTab";
import { getTotalEvents } from "@/lib/mongodb/actions/event.actions";
import UserTable from "@/components/shared/admin/user/UserTable";
import { auth } from "@clerk/nextjs";
import EventTable from "@/components/shared/admin/events/EventTable";

const AdminDashboard = async () => {
  const { sessionClaims } = auth();
  const adminId = sessionClaims?.userId as string;
  const userCount = await getTotalUsers();
  const eventCount = await getTotalEvents();

  return (
    <>
      <section
        className={
          "bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10"
        }
      >
        <h3 className={"wrapper h3-bold text-center sm:text-left"}>
          Admin Dashboard
        </h3>
      </section>
      <section className={"wrapper gap-4 space-y-4 h-full"}>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className={""}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Users
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{userCount}</div>
                  <p className="text-xs text-muted-foreground">
                    +20.1% from last month
                  </p>
                </CardContent>
              </Card>
              <Card className={""}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Events
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M8 2v4" />
                    <path d="M16 2v4" />
                    <rect width="18" height="18" x="3" y="4" rx="2" />
                    <path d="M3 10h18" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{eventCount}</div>
                  <p className="text-xs text-muted-foreground">
                    +20.1% from last month
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <Overview />
                </CardContent>
              </Card>
              <OverviewTab />
            </div>
          </TabsContent>
          <TabsContent value="users">
            <UserTable adminId={adminId} />
          </TabsContent>
          <TabsContent value="events">
            <EventTable adminId={adminId} />
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
};
export default AdminDashboard;
