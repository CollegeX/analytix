"use client";
import CourseForm from "@/components/forms/CourseForm";
import type { Course } from "@prisma/client";

export default function Course() {
  return (
    <main className="mx-8">
      <p className="mt-6 font-display text-3xl text-primary ">Create Course</p>
        <CourseForm />
    </main>
  );
}
