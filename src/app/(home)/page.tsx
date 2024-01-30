import Hero from "@/components/common/Hero";
import { getServerAuthSession } from "@/server/auth";

export default async function Home() {
  const session = await getServerAuthSession();
  

  console.log("===============================");
  console.log(session);
  console.log("===============================");

  return (
    <main className="h-full">
      <Hero />
    </main>
  );
}
