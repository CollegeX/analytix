import { UserAuthForm } from "@/components/forms/UserAuthForm";

export default function page() {
  return (
    <main className="flex min-h-screen items-center">
      <UserAuthForm admin />
    </main>
  );
}
