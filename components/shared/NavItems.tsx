"use client";

import { headerLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavItems = ({ isAdmin }: { isAdmin: boolean }) => {
  const pathname = usePathname();

  const filteredLinks = isAdmin
    ? headerLinks
    : headerLinks.filter((link) => link.label !== "Admin");

  return (
    <>
      <ul className="md:flex-between flex w-full flex-col items-start gap-5 md:flex-row">
        {filteredLinks.map((link) => {
          const isActive = pathname === link.route;
          return (
            <li
              key={link.route}
              className={`${
                isActive && "text-primary-500"
              } flex-center p-medium-16 whitespace-nowrap`}
            >
              <Link href={link.route}>{link.label}</Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default NavItems;
