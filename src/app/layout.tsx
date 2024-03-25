"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Navbar } from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <SessionProvider>
      <html lang="en">
        <body
          className={`${inter.className} bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 text-black`}
        >
          <Navbar />
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
