"use client";
import CourseForm from "@/components/forms/CourseForm";
import type { Course } from "@prisma/client";
import { Card } from "@/components/ui/card";

export default function Course() {
  return (
    <main className="mx-8 mt-6">
      <Card className="p-4">
        <p className="font-display text-3xl text-primary ">Create Course</p>
        <CourseForm className="w-96 space-y-4" />
      </Card>
    </main>
  );
}
