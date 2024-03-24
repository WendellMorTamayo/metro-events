import React from "react";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import { auth } from "@clerk/nextjs";
import { checkUserIsAdmin } from "@/lib/mongodb/actions/user.actions";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  console.log(userId);
  // const isAdmin = await checkUserIsAdmin(userId);
  // console.log("isAdmin", isAdmin);
  return (
    <div className={"flex h-screen flex-col"}>
      <Header />
      <main className={"flex-1"}>{children}</main>
      <Footer />
    </div>
  );
}
