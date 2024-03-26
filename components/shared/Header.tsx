import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import NavItems from "@/components/shared/NavItems";
import MobileNav from "@/components/shared/MobileNav";
import NotificationButton from "@/components/shared/NotifcationIcon";

const Header = ({ isAdmin }: { isAdmin?: boolean }) => {
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
        {!isAdmin && (
          <SignedIn>
            <nav className={"md:flex-between hidden w-full max-w-xs"}>
              <NavItems />
            </nav>
          </SignedIn>
        )}
        <div className={"flex w-32 items-center justify-end gap-3"}>
          <SignedIn>
            {!isAdmin && <NotificationButton />}
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
