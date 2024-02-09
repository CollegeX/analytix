import DeptTable from "@/components/tables/DeptTable";

export default async function DeptPage() {
    return (
      <main className="mx-6 mt-6">
        <p className="font-display text-2xl text-primary">Course Tag</p>
        <DeptTable/>
      </main>
    );
  }
  