"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import UserTableRowActions from "@/components/shared/admin/user/UserTableRowActions";
import EventTableRowActions from "@/components/shared/admin/events/EventTableRowActions";
import OrganizerName from "@/components/shared/admin/events/OrganizerName";

export type Event = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  startDate: string;
  endDateTime: string;
  date: string;
  createdAt: string;
  participantCount: number;
  isApproved: boolean;
  category: string;
  organizer: string;
};

export const columns = ({
  adminId,
}: {
  adminId: string;
}): ColumnDef<Event>[] => [
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
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className={"flex items-center"}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const imageUrl = row.original.imageUrl;
      const title = row.original.title;
      return (
        <div className={"flex items-center gap-4"}>
          <img
            src={imageUrl}
            alt="Event Image"
            className={"h-12 w-12 rounded-lg"}
          />
          <div className={"font-medium"}>{title}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Description
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const description = row.original.description;
      return <div className={""}>{description}</div>;
    },
  },
  {
    accessorKey: "organizer",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Organizer
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <OrganizerName organizerId={row.original.organizer} />;
    },
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Event Duration
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const startDate = new Date(row.getValue("startDate"));
      const endDate = new Date(row.original.endDateTime);
      const formattedDate =
        startDate.toLocaleDateString() + " - " + endDate.toLocaleDateString();
      return <div className={"font-medium"}>{formattedDate}</div>;
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
