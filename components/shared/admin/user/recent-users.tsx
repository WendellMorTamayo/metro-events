import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  getAllUsers,
  getLatestUsers,
} from "@/lib/mongodb/actions/user.actions";
import { Key } from "react";

export async function RecentUsers() {
  const users = await getLatestUsers();
  console.log("USERSSS:", users);
  return (
    <div className="space-y-8">
      <div className="flex items-start flex-col space-y-4">
        {users.map(
          (user: {
            _id: Key | null | undefined;
            photo: string | undefined;
            firstName: string;
            lastName: string;
            email: string;
            isAdmin: boolean;
          }) => (
            <div className={"flex items-center gap-4 w-full"} key={user._id}>
              <Avatar className="h-9 w-9">
                <AvatarImage src={user.photo} alt="Avatar" />
                <AvatarFallback>
                  {user.firstName[0] + user.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div className={"flex-1 flex-between justify-between"}>
                <div className="items-start space-y-1">
                  <p className="text-sm text-start font-medium leading-none">
                    {user.firstName + " " + user.lastName}
                  </p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
                <div className="font-medium right-20">
                  {user.isAdmin ? (
                    <div className={"p-1 w-24 bg-red-50 rounded-full"}>
                      <p className={"text-center text-red-500 p-bold-16"}>
                        Admin
                      </p>
                    </div>
                  ) : (
                    <div className={"p-1 bg-blue-50 w-24 rounded-full"}>
                      <p className={"text-center text-blue-800 p-bold-16"}>
                        User
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
}
