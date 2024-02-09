import { getServerAuthSession } from "@/server/auth";

export default async function CreateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();
  const allowedRoles = ["ADMIN", "PRINCIPAL"];

  if (!allowedRoles.includes(session?.user?.role ?? "")) {
    return (
      <div className="font-display text-2xl text-primary">
        You are not authorised to view this page
      </div>
    );
  }

  return { children };
}
