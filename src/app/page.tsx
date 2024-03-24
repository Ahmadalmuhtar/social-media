"use client";

import { useSession } from "next-auth/react";
import Button from "./components/Button";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session, status } = useSession();

  const router = useRouter();

  if (status === "loading") {
    <motion.div />;
  }

  return (
    <>
      <div className="flex justify-center px-6 py-8">
        {session && (
          <div className=" grid max-w-5xl grid-cols-2 gap-3 gap-x-3">
            <div>
              <Link href={"/create-user"} passHref>
                <Button text="Create user" />
              </Link>
            </div>
            <div>
              <Link href={"/create-post"} passHref>
                <Button text="Create Post" />
              </Link>
            </div>
            <div className="col-span-2">
              <Button
                text="Posts"
                onClick={() => {
                  router.push("/posts");
                }}
              />
            </div>
            <div className="col-span-2">
              <Button
                text="Users"
                variant="default"
                onClick={() => router.push("/users")}
              />
            </div>
            <div className="col-span-2">
              <Button
                text="Feeds"
                variant="default"
                onClick={() => router.push("/feeds")}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
