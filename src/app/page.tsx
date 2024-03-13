"use client";

import React, { useState, useEffect } from "react";
import {
  CreatePostPayload,
  CreateUserPayload,
  createPost,
  createUser,
  deleteUserById,
  getPosts,
  getUsers,
} from "./server/queries";
import { Post, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import Button from "./components/Button";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const router = useRouter();

  const [openAddForm, setOpenAddForm] = useState(false);
  const [users, setUsers] = useState<User[]>();
  const [stateChanged, setStateChanged] = useState(false);
  const [openFormPost, setOpenFormPost] = useState(false);
  const [userData, setUserData] = useState<CreateUserPayload>({
    name: "",
    email: "",
  });

  const { data: session, status } = useSession();

  const [postData, setPostData] = useState<CreatePostPayload>({
    title: "",
    content: "",
    published: false,
  });

  const getAllUsers = async () => {
    const allUsers = await getUsers();
    setUsers(allUsers);
  };

  useEffect(() => {
    getAllUsers();
  }, [stateChanged]);

  const handleDelete = async (id: number) => {
    await deleteUserById(id);
    setStateChanged((prev) => !prev);
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    await createUser(userData);
    setUserData({ name: "", email: "" });
    setOpenAddForm(false);
    setStateChanged((prev) => !prev);
  };

  const handleAddPost = async (e: React.FormEvent) => {
    e.preventDefault();
    await createPost(postData);
    console.log(postData);
    console.log(session?.user);
    setPostData({ title: "", content: "", published: false });
    setOpenFormPost(false);
  };

  return (
    <div className="grid py-24 justify-center">
      {openAddForm ? (
        <form onSubmit={handleAddUser} className="grid grid-cols-2 space-x-10">
          <Button type="submit" onClick={() => handleAddUser} text="Add user" />
          <label>
            User name:
            <input
              placeholder="Enter a new username"
              className="border m-2"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, name: e.target.value }))
              }
              type="text"
            />
          </label>
          <label>
            Email address:
            <input
              placeholder="Enter your Email"
              className="border m-2"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, email: e.target.value }))
              }
              type="email"
            />
          </label>
          <Button
            onClick={() => setOpenAddForm((prev) => !prev)}
            text="Close"
          />
        </form>
      ) : (
        <div className="grid grid-col space-y-4">
          {!session && (
            <Button
              onClick={() => setOpenAddForm((prev) => !prev)}
              text="Add User"
            />
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
                  <form
                    onSubmit={handleAddPost}
                    className="grid grid-cols-2 space-x-10"
                  >
                    <label htmlFor="title">Title:</label>
                    <input
                      onChange={(e) =>
                        setPostData((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                      id="title"
                      type="text"
                      placeholder="Add Title"
                      className="text-center col-span-2 border-black"
                    />
                    <label htmlFor="content">Post:</label>
                    <input
                      onChange={(e) =>
                        setPostData((prev) => ({
                          ...prev,
                          content: e.target.value,
                        }))
                      }
                      id="content"
                      placeholder="Add Content"
                      className="text-center col-span-2 border-black"
                    />
                    <Button type="submit" text="Submit" />
                  </form>
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
      )}
    </div>
  );
}
