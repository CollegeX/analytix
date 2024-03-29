"use client";
import type { Course } from "@prisma/client";
import CreateForm from "@/components/forms/CourseForm";

export default function CreateCoursePage() {
  return (
    <main className="mx-8 mt-6 flex justify-center gap-12">
      <CreateForm className="items=center flex w-full flex-grow flex-col space-y-4" />
    </main>
  );
}
