"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Button from "./components/Button";
import { useRouter } from "next/navigation";
import AddUserForm from "./components/FormAddUser";
import AddPostForm from "./components/FormAddPost";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const [openFormPost, setOpenFormPost] = useState(false);
  const [openAddForm, setOpenAddForm] = useState(false);
  const { data: session, status } = useSession();

  return (
    <>
      <div className="bg-red-400 py-48">TEST</div>

      <div className="grid py-24 justify-center">
        <div className="grid grid-col space-y-4">
          {session && (
            <Link href={"/add-user"} passHref>
              <Button text="Add User" />
            </Link>
          )}
          {status === "loading" && "Loading..."}
          {session ? (
            <div className="grid-cols-2">
              <Button
                onClick={() => router.push("/api/auth/signout")}
                text="Logout"
              />
              <Button
                onClick={() => setOpenFormPost((prev) => !prev)}
                text="Create Post"
              />
              {openFormPost && (
                <>
                  <AddPostForm setOpenFormPost={setOpenAddForm} />
                  <Button
                    text="Close"
                    onClick={() => setOpenFormPost((prev) => !prev)}
                  />
                </>
              )}
              <div className="text-center py-8">
                <p>Welcome {session?.user?.name}</p>
              </div>
              {status === "authenticated" && (
                <div className="grid-cols-2">
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
          ) : (
            <a
              href="/api/auth/signin"
              className="border px-3 py-2 bg-black text-white rounded-md text-center"
            >
              Login
            </a>
          )}
        </div>
      </div>
    </>
  );
}
