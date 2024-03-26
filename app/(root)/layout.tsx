import React from "react";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import { auth } from "@clerk/nextjs";
import { checkUserIsAdmin } from "@/lib/mongodb/actions/user.actions";
import AdminDashboard from "@/app/(root)/admin/page";
import Sidebar from "@/components/shared/admin/Sidebar";
import { Separator } from "@/components/ui/separator";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const isAdmin = await checkUserIsAdmin(userId);

  return (
    <div>
      {isAdmin && userId ? (
        <div className={"flex justify-between items-start"}>
          <Sidebar />
          <main className={"grid w-full h-full pl-[300px]"}>
            <Header isAdmin={true} />
          </main>
        </div>
      ) : (
        <>
          <Header />
          <main className={"flex-1"}>{children}</main>
          <Footer />
        </>
      )}
    </div>
  );
}
