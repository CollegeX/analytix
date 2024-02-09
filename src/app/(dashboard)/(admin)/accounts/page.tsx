import AccountTable from "@/components/tables/AccountTable";

export default async function AdminPage() {
  return (
    <main className="mx-6 mt-6">
      <p className="font-display text-2xl text-primary">Account Page</p>
      <AccountTable />
    </main>
  );
}
