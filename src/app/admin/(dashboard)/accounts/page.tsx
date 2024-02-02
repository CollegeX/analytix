import { api } from "@/trpc/server";

export default async function AdminPage() {
  const users = await api.user.findMany.query();
  return (
    <main>
      <h1>Account Page</h1>
      
    </main>
  );
}
