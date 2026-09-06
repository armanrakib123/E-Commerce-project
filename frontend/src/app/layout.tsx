import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/providers/AppProvider";
import { AppShell } from "@/components/layout/AppShell";

export const metadata: Metadata = {
  title: "NovaStore | Premium Tech, Audio & Lifestyle Ecommerce",
  description:
    "Discover next-gen electronics, studio-grade wireless audio, smart wearables, and ergonomic workstation gear.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen antialiased bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        <AppProvider>
          <AppShell>{children}</AppShell>
        </AppProvider>
      </body>
    </html>
  );
}
