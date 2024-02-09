import { getServerAuthSession } from "@/server/auth";
import Nav from "@/components/admin/Nav";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();
  if (!session) {
    return (
      <div className="mt-24 flex flex-col items-center justify-center gap-4 font-display text-2xl text-primary">
        <p>Login to Continue</p>
        <Link href={"/login"}>
          <Button>Login Page</Button>
        </Link>
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
