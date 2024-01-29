  import "@/styles/globals.css";

  import { Inter } from "next/font/google";

  import { TRPCReactProvider } from "@/trpc/react";

  import { ThemeProvider } from "@/components/ui/theme-provider"



  const inter = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
  });

  export const metadata = {
    title: "analytix",
    description: "student and faculty analytics platform",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
  };

  export default function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (

        <html lang="en">
          <body className={`font-sans ${inter.variable}`}>
            <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            >
            <TRPCReactProvider>{children}</TRPCReactProvider>
            </ThemeProvider>
          </body>
        </html>

    );
  }
