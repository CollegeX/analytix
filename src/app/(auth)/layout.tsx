import Image from "next/image";
import Link from "next/link";
import { BarChart4 } from "lucide-react";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex flex-col md:h-screen md:flex-row">
        <div className="hidden md:block h-screen w-full overflow-hidden bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-sky-400 to-indigo-900 p-8 md:w-1/2">
          <div className="flex min-h-screen flex-col items-center justify-center gap-2 text-accent">
            <div className="flex gap-2">
              <Link href="/" className="font-display text-4xl font-bold">
                Analytix
              </Link>
              <BarChart4 className="h-10 w-10 stroke-accent" />
            </div>
            <p className="text-lg text-neutral-200">Statistics for students and faculty</p>
            <div className="mb-20" />
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-center overflow-auto md:w-1/2">
          {children}
        </div>
      </div>
    </div>
  );
}
