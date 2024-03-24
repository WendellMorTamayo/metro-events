import React from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const NotificationIcon = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button
          asChild
          variant="outline"
          size="icon"
          className={"rounded-full hover:bg-primary-100 w-15 h-15"}
        >
          <Bell className="h-10 w-10 p-1" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>Place content for the popover here.</PopoverContent>
    </Popover>
  );
};
export default NotificationIcon;
