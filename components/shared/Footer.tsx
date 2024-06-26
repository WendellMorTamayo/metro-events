import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className={"bg-bottom border-t"}>
      <div
        className={
          "flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row"
        }
      >
        <Link href={"/"}>
          <Image
            src={"/assets/images/logo.svg"}
            alt={"logo"}
            width={"64"}
            height={"20"}
          />
        </Link>
        <p>2024 Metro Events. All Rights reserved</p>
      </div>
    </footer>
  );
};
export default Footer;
