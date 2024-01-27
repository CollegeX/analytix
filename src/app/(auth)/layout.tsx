import Image from "next/image";
import Link from "next/link";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex flex-col md:h-screen md:flex-row">
        <div className="w-full  overflow-hidden bg-primary p-8 md:h-screen md:w-1/2">
          <div className="flex flex-row gap-2 ">
            <Link
              href="/"
              className="font-display text-4xl font-bold text-accent"
            >
              Analytix
            </Link>
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-center overflow-auto md:w-1/2">
          {children}
        </div>
      </div>
    </div>
  );
}
