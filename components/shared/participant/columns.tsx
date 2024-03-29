"use client";
import { ColumnDef } from "@tanstack/react-table";
import { User } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import UserTableRowActions from "@/components/shared/admin/user/UserTableRowActions";
import { Button } from "@/components/ui/button";
import OrganizerName from "@/components/shared/admin/events/OrganizerName";
import OrganizerEmail from "@/components/shared/admin/events/OrganizerEmail";
import ParticipantRowActions from "./ParticipantRowActions";

export type Participant = {
  id: string;
  name: string;
  email: string;
  isApproved: boolean;
  buyer: string;
};

export const columns: ColumnDef<Participant>[] = [
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
    id: "name",
    header: "Name",
    cell: ({ row }) => <OrganizerName organizerId={row.original.buyer} />,
  },
  {
    id: "email",
    header: "Email",
    cell: ({ row }) => <OrganizerEmail organizerId={row.original.buyer} />,
  },
  {
    id: "isApproved",
    header: "Actions",
    cell: ({ row }) => <ParticipantRowActions user={row.original} />,
  },
];
