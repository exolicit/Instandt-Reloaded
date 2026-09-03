import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Instandt Reloaded",
  description: "Instandt Reloaded – Web-App",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
