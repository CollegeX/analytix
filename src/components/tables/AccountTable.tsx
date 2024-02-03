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

export default function AccountTable() {
  const users = api.user.findUnassigned.useQuery();
  return (
    <Table className="mt-3 border">
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Requested Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.data?.map((user) => (
          <TableRow key={user.id}>
            <TableCell>
              {user.firstName} {user.lastName}
            </TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.requestedRole}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
