import { getServerAuthSession } from "@/server/auth";
import Nav from "@/components/admin/Nav";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();
  if (!session) {
    return <div>Pls login to continue</div>;
  }

  if (session.user.role !== "ADMIN") {
    return (
      <div className="text-display">
        You are not authorized to view this page
      </div>
    );
  }
  return (
    <main>
      <Nav />
      {children}
    </main>
  );
}
