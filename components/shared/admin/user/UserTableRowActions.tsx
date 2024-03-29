"use client";
import React, { useTransition } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CopyIcon, EditIcon, MoreHorizontal, TrashIcon } from "lucide-react";
import { DeleteUserConfirmation } from "@/components/shared/admin/user/DeleteUserConfirmation";
import { UpdateUserConfirmation } from "@/components/shared/admin/user/UpdateUserConfirmation";

export default function UserTableRowActions({ user, adminId }: any) {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(() => {
      console.log("Result", adminId);
    });
  };

  const handleUpdate = () => {
    console.log("update user");
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(user._id)}
          className={"flex items-center justify-between"}
        >
          <CopyIcon className={"w-4 h-4"} />
          <p>Copy user ID</p>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={(e) => e.preventDefault()}
          className={"flex items-center justify-between"}
        >
          <UpdateUserConfirmation user={user} adminId={adminId} />
        </DropdownMenuItem>
        <DropdownMenuItem
          className={"flex items-center justify-between text-red-500"}
          onClick={(e) => e.preventDefault()}
        >
          <DeleteUserConfirmation userId={user._id} adminId={adminId} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
