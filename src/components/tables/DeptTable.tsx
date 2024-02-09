"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { api } from "@/trpc/react";

export default function DeptTable() {
  const dept = api.department.findMany.useQuery(undefined, {
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
  return (
    <Table className="mt-3 border">
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>ShortForm</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="">
        {dept.data?.map((department) => (
          <TableRow key={department.id}>
            <TableCell>{department.name}</TableCell>
            <TableCell>{department.shortName}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
