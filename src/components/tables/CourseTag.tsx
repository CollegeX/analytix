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

export default function CourseTagTable() {
  const courseTags = api.courseTag.findMany.useQuery(undefined, {
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
  return (
    <Table className="mt-3 border">
      <TableHeader>
        <TableRow>
          <TableHead>Course</TableHead>
          <TableHead>Tag</TableHead>
          <TableHead>Count</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="">
        {courseTags.data?.map((courseTag) => (
          <TableRow key={courseTag.id}>
            <TableCell>{courseTag.Course.semester}</TableCell>
            <TableCell>{courseTag.Tag.name}</TableCell>
            <TableCell>{courseTag.count}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
