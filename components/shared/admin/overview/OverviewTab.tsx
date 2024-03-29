import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RecentUsers } from "@/components/shared/admin/user/recent-users";

const OverviewTab = () => {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Recently created users</CardTitle>
        <CardDescription>
          The most recent users to join your platform.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RecentUsers />
      </CardContent>
    </Card>
  );
};
export default OverviewTab;
