import CourseTagTable from "@/components/tables/CourseTag";

export default async function CourseTagPage() {
  return (
    <main className="mx-6 mt-6">
      <p className="font-display text-2xl text-primary">Course Tag</p>
      <CourseTagTable />
    </main>
  );
}
