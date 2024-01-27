"use client"

// import { Button } from "@/components/ui/button";
// import { api } from "@/trpc/react";
import Navbar from "@/app/navbar/page";
import Hero from "./hero/page";

export default function Home() {
  // const {data} = api.course.findMany.useQuery();
  // console.log(data);
  return (
    <main >
      <Navbar/>
      <Hero/>
      HOO
    </main>
  );
}
