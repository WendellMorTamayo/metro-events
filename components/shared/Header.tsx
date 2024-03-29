import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import NavItems from "@/components/shared/NavItems";
import MobileNav from "@/components/shared/MobileNav";
import NotificationButton from "@/components/shared/NotifcationIcon";
import { ModeToggle } from "@/components/shared/ModeToggle";

const Header = ({ isAdmin, userId }: { isAdmin: boolean; userId: string }) => {
  return (
    <header className={"w-full border-b"}>
      <div className={"wrapper flex items-center justify-between"}>
        <Link href={"/"} className={"w-36"}>
          <Image
            src={"/assets/images/logo.svg"}
            alt={"metro events logo"}
            width={64}
            height={20}
          />
        </Link>
        <SignedIn>
          <nav className={"md:flex-between hidden w-full max-w-xs"}>
            <NavItems isAdmin={isAdmin} />
          </nav>
        </SignedIn>
        <div className={"flex w-48 items-center justify-end gap-3"}>
          <SignedIn>
            <NotificationButton userId={userId} />
            <ModeToggle />
            <UserButton afterSignOutUrl={"/"} />

            {!isAdmin && <MobileNav />}
          </SignedIn>
          <SignedOut>
            <Button asChild className={"rounded-full"} size={"lg"}>
              <Link href={"/sign-in"}>Login</Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </header>
  );
};
export default Header;
