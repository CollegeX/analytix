import Navbar from "@/components/nav/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-100 via-white to-white">
      <Navbar />
      {children}
    </main>
  );
}
