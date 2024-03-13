"use client";

import { useSession } from "next-auth/react";
import Button from "./components/Button";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") return "Loading...";
  return (
    <div className="flex justify-center py-8">
      {session && (
        <div className="flex flex-col max-w-5xl mx-auto space-y-4">
          <Link href={"/create-post"} passHref>
            <Button text="Create Post" />
          </Link>
          <Button
            text="Posts"
            onClick={() => {
              router.push("/posts");
            }}
          />
          <Button
            text="Users"
            variant="default"
            onClick={() => router.push("/users")}
          />
        </div>
      )}
    </div>
  );
}
