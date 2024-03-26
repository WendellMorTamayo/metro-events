"use client";

import { ColumnDef } from "@tanstack/react-table";

export type User = {
  _id: string;
  name: string;
  email: boolean;
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "_id",
    header: "id",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
];
