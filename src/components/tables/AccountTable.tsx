"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { api } from "@/trpc/react";
import { Button } from "@react-email/button";

export default function AccountTable() {
  const users = api.user.findUnassigned.useQuery();

  return (
    <Table className="mt-3 border">
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Requested Role</TableHead>
          <TableHead>Actions</TableHead>
          <TableHead>Conform</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="">
        {users.data?.map((user) => (
          <TableRow key={user.id}>
            <TableCell>
              {user.firstName} {user.lastName}
            </TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.requestedRole}</TableCell>
            <TableCell>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select role">Actions</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={"ece"}>ADMIN</SelectItem>
                  <SelectItem value={"cse"}>PRINCIPAL</SelectItem>
                  <SelectItem value={"me"}>DEPT_STAFF</SelectItem>
                  <SelectItem value={"ce"}>HOD</SelectItem>
                </SelectContent>
              </Select>
            </TableCell>
            <TableCell>
              <Button className="">Conform</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
