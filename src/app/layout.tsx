"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Navbar } from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  return (
    <SessionProvider>
      <html lang="en">
        <body className="bg-gradient-to-r from-cyan-700 via-indigo-600 to-slate-600 text-white">
          <Navbar />
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
