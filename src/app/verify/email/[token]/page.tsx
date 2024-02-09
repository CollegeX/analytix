import Link from "next/link";

import { Button } from "@/components/ui/button";
import { api } from "@/trpc/server";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";

interface Props {
  params: {
    token: string;
  };
}

export default async function VerifyCustomerEmailPage({ params }: Props) {

  const verified = await api.user.verifyEmail.mutate({
    token: params.token,
  });

  return (
    <main className="flex h-full min-h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center gap-3 rounded border p-4">
        <p className="font-display text-2xl">{verified.message}</p>
        <Link href={"/"}>
          <Button>Go home</Button>
        </Link>
      </div>
    </main>
  );
}
