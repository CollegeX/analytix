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
import { Button } from "../ui/button";
import { useTransition, useState } from "react";

export default function AccountTable() {
  const users = api.user.findMany.useQuery(undefined, {
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
  const assignRole = api.user.changeRole.useMutation();
  const [isPending, startTransition] = useTransition();
  const [roles, setRoles] = useState<Record<string, string>[]>([]);

  function changeRole(userId: string, role: string | undefined) {
    if (!role) {
      return;
    }
    startTransition(async () => {
      console.log(userId, role);
      await assignRole.mutateAsync({ userId, role: role });
      await users.refetch();
    });
  }

  return (
    <Table className="mt-3 border">
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Requested Role</TableHead>
          <TableHead>Changed Role</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody className="">
        {users.data?.map((user) => (
          <TableRow key={user.id}>
            <TableCell>
              {user.firstName} {user.lastName}
            </TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>{user.requestedRole ?? "NO REQUEST"}</TableCell>
            <TableCell>
              <Select
                onValueChange={(value) => {
                  setRoles((prev) => {
                    const newRoles = prev.filter((r) => r.id !== user.id);
                    console.log([...newRoles, { id: user.id, role: value }]);
                    return [...newRoles, { id: user.id, role: value }];
                  });
                }}
                defaultValue={roles.find((r) => r.id === user.id)?.role}
                value={roles.find((r) => r.id === user.id)?.role}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={"DEPT_STAFF"}>Department Staff</SelectItem>
                  <SelectItem value={"HOD"}>Head of Department</SelectItem>
                  <SelectItem value={"PRINCIPAL"}>Principal</SelectItem>
                  <SelectItem value={"ADMIN"}>Admin</SelectItem>
                </SelectContent>
              </Select>
            </TableCell>
            <TableCell>
              <Button
                variant={"outline"}
                className="hover:bg-primary/10"
                onClick={() =>
                  changeRole(user.id, roles.find((r) => r.id === user.id)?.role)
                }
              >
                Confirm
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
