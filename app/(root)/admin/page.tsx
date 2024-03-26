import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import * as React from "react";
import { getAllUsers } from "@/lib/mongodb/actions/user.actions";

const AdminDashboard = async () => {
  const users = await getAllUsers();
  console.log("USERS: ", users);
  return (
    <section>
      <Tabs defaultValue="Events" className="wrapper">
        <TabsList className="grid w-full grid-cols-2 aria-selected:bg-amber-500">
          <TabsTrigger value="Events">Events</TabsTrigger>
          <TabsTrigger value="Accounts">Accounts</TabsTrigger>
        </TabsList>
        <TabsContent value="Events">
          {/*<DataTableDemo users={users} />*/}
        </TabsContent>
        <TabsContent value="Accounts">
          {/*<DataTableDemo users={users} />*/}
        </TabsContent>
      </Tabs>
    </section>
  );
};
export default AdminDashboard;
