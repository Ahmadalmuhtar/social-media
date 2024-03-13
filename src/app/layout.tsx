"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import Button from "./components/Button";
import { useRouter } from "next/navigation";

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
        <body className={inter.className}>
          <Button text="Go Back" onClick={() => router.back()} />
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
