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

export default function CourseTable() {
  const courses = api.course.findMany.useQuery(undefined, {
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  return (
    <Table className="mt-3 border">
      <TableHeader>
        <TableRow>
          <TableHead>Regulation</TableHead>
          <TableHead>Semester</TableHead>
          <TableHead>Department</TableHead>
          <TableHead>TotalStudent</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="">
        {courses.data?.map((course) => (
          <TableRow key={course.id}>
            <TableCell>{course.Regulation.name}</TableCell>
            <TableCell>{course.semester}</TableCell>
            <TableCell>{course.Department.shortName}</TableCell>
            <TableCell>{course.totalStudents}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
