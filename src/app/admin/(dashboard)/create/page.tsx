"use client";
import type { Course } from "@prisma/client";
import { Card } from "@/components/ui/card";
import DepartmentForm from "@/components/forms/DepartmentForm";
import CreateForm from "@/components/forms/CreateForm";

export default function Course() {
  return (
    <main className="mx-8 mt-6 flex justify-center gap-12">
      {/* <Card className="min-w-[500px] p-8">
        <p className="mb-2 font-display text-3xl text-primary">Create Course</p>
        <CourseForm className="flex w-full flex-col space-y-4" />
      </Card>
      <Card className="h-full min-w-[500px] p-8">
        <p className="mb-2 font-display text-3xl text-primary">
          Create Department
        </p>
        <DepartmentForm className="items=center flex w-full flex-grow flex-col space-y-4" />
      </Card>
      
      */}
      <CreateForm className="items=center flex w-full flex-grow flex-col space-y-4" />
    </main>
  );
}
