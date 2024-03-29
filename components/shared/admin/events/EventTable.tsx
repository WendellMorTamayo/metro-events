"use client";
import { DataTable } from "@/components/shared/admin/events/data-table";
import { columns as userColumns } from "@/components/shared/admin/events/columns";
import { useMemo, useEffect, useState } from "react";
import {
  getAllEvents,
  getNotApprovedEvents,
} from "@/lib/mongodb/actions/event.actions";

export default function UserTable({ adminId }: { adminId: string }) {
  const [data, setData] = useState([]);
  const columns = useMemo(() => userColumns({ adminId }), [adminId]);

  useEffect(() => {
    const fetchData = async () => {
      const events = await getNotApprovedEvents();
      setData(events);
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
