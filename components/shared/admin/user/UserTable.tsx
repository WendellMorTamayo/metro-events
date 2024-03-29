"use client";
import { DataTable } from "@/components/shared/admin/user/data-table";
import { columns as userColumns } from "@/components/shared/admin/user/columns";
import { getAllUsers } from "@/lib/mongodb/actions/user.actions";
import { useMemo, useEffect, useState } from "react";

export default function UserTable({ adminId }: { adminId: string }) {
  const [data, setData] = useState([]);
  const columns = useMemo(() => userColumns({ adminId }), [adminId]);

  useEffect(() => {
    const fetchData = async () => {
      const users = await getAllUsers();
      setData(users);
    };

    fetchData();
    console.log("::", adminId);
  }, []);

  return (
    <section className={"items-start"}>
      <div className={"wrapper"}>
        <DataTable columns={columns} data={data} />
      </div>
    </section>
  );
}
