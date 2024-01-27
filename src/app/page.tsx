"use client"

import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";

export default function Home() {
  const {data} = api.course.findMany.useQuery();
  console.log(data);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <Button>shadcn</Button>
    </main>
  );
}
