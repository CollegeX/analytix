"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { api } from "@/trpc/react";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Account {
  id: string;
  name: string;
  email: string | null;
  role: string;
  requestedRole: string;
}



const columns: ColumnDef<Account>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "requestedRole",
    header: "Requested Role",
  },
];

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable() {
  


  // Data fetching
  const users = api.user.findMany.useQuery(undefined, {
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const data = users.data?.map((user) => ({
    id: user.id,
    name: `${user.firstName} ${user.lastName}`,
    email: user.email,
    role: user.role,
    requestedRole: user.requestedRole ?? "NO REQUEST",
  })) ?? [];

  const assignRole = api.user.changeRole.useMutation();
  
  // State
  const [isPending, startTransition] = useTransition();
  const [roles, setRoles] = useState<Record<string, string>[]>([]);

  // Handler functions
  function changeRole(userId: string, role: string | undefined) {
    if (!role) {
      return;
    }
    startTransition(async () => {
      console.log(userId, role);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      await assignRole.mutateAsync({ userId, role: role });
      toast.success("Role changed successfully");
      await users.refetch();
    });
  }

  // Table
  const table = useReactTable({
    data: data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });


  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
