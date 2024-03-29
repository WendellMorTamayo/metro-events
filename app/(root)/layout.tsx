import React from "react";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import { auth, currentUser } from "@clerk/nextjs";
import { checkUserIsAdmin } from "@/lib/mongodb/actions/user.actions";
import AdminDashboard from "@/app/(root)/admin/page";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const isAdmin = await checkUserIsAdmin(userId);
  const user = await currentUser();

  return (
    <div className={"h-screen w-screen flex flex-col"}>
      <Header isAdmin={isAdmin} userId={userId} />
      <main className={"flex-1"}>{children}</main>
      <Footer />
    </div>
  );
}
