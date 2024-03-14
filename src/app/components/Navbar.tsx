"use client";

import { useSession } from "next-auth/react";
import Button from "./Button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <div className="flex justify-between py-2 bg-gray-200 max-w-5xl mx-auto">
      {!session ? (
        <Link href={"/api/auth/signin"} passHref>
          <Button text="Login" />
        </Link>
      ) : (
        <Link href={"/api/auth/signout"} passHref>
          <Button text="Logout" />
        </Link>
      )}
      <Button onClick={() => router.back()} text="Go Back" />
    </div>
  );
};
