import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css";
import { getCurrentSession } from "@/lib/server/session";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "MediMatch",
  description: "Find your Doctor",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await getCurrentSession();
  return (
    <html lang="en">
      <body
        className="antialiased"
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar data={data} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
