"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import UserTableRowActions from "@/components/shared/admin/user/UserTableRowActions";
import EventTableRowActions from "@/components/shared/admin/events/EventTableRowActions";

export type User = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
};

export const columns = ({
  adminId,
}: {
  adminId: string;
}): ColumnDef<User>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "username",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className={"flex items-center"}
        >
          Username
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const firstName = row.original.firstName;
      const lastName = row.original.lastName;
      return (
        <div className={"font-medium"}>
          {firstName} {lastName}
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      const formattedDate = date.toLocaleDateString();
      return <div className={"font-medium"}>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "isAdmin",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Admin
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const isAdmin = row.getValue("isAdmin");
      return isAdmin ? (
        <div className={"p-1 w-24 bg-red-50 rounded-full"}>
          <p className={"text-center text-red-500 p-bold-16"}>Admin</p>
        </div>
      ) : (
        <div className={"p-1 bg-blue-50 w-24 rounded-full"}>
          <p className={"text-center text-blue-800 p-bold-16"}>User</p>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className={"font-medium"}>Actions</div>,
    cell: ({ row }) => (
      <div className={"flex flex-row"}>
        <EventTableRowActions event={row.original} adminId={adminId} />
      </div>
    ),
  },
];
