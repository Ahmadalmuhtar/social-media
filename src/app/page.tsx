"use client";

import { useEffect, useState } from "react";
import {
  CreatePostPayload,
  CreateUserPayload,
  createPost,
  createUser,
  deleteUserById,
  getUsers,
} from "./server/queries";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";

export default function Home() {
  const [openAddForm, setOpenAddForm] = useState(false);
  const [users, setUsers] = useState<User[]>();
  const [stateChanged, setStateChanged] = useState(false);
  const [openFormPost, setOpenFormPost] = useState(true);
  const [userData, setUserData] = useState<CreateUserPayload>({
    name: "",
    email: "",
  });
  const [postData, setPostData] = useState<CreatePostPayload>({
    title: "",
    content: "",
    published: false,
  });
  const { data: session, status } = useSession();

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
    console.log(session?.user);
    setPostData({ title: "", content: "", published: false });
    setOpenFormPost(false);
  };

  return (
    <>
      <div className="flex py-24 justify-center">
        {openAddForm === true ? (
          <form
            onSubmit={handleAddUser}
            className="flex grid-cols-2 space-x-10"
          >
            <button className="border border-spacing-3" type="submit">
              Add user
            </button>
            <label>
              User name:
              <input
                placeholder="Entetr a new username"
                className="border m-2"
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, name: e.target.value }))
                }
                type="text"
              />
            </label>
            <label>
              Emailaddress:
              <input
                placeholder="Enter your Email"
                className="border m-2"
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, email: e.target.value }))
                }
                type="email"
              />
            </label>
            <button
              className="border border-spacing-3"
              onClick={() => setOpenAddForm((prev) => !prev)}
            >
              Close
            </button>
          </form>
        ) : (
          <div className="flex flex-col space-y-4">
            {!session && (
              <button
                className="border px-3 py-2 bg-black text-white rounded-md"
                onClick={() => setOpenAddForm((prev) => !prev)}
              >
                Add User
              </button>
            )}
            {status === "loading" && "Loading..."}
            {session ? (
              <>
                <a
                  href="/api/auth/signout"
                  className="border px-3 py-2 bg-black text-white rounded-md text-center"
                >
                  Logout
                </a>
                <button
                  onClick={() => setOpenFormPost((prev) => !prev)}
                  className="border px-3 py-2 bg-black text-white rounded-md text-center"
                >
                  Create Post
                </button>
                {openFormPost && (
                  <form
                    onSubmit={handleAddPost}
                    className="flex grid-cols-4 space-x-10"
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
                      className="text-center col-span-4 border-black"
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
                      className="text-center col-span-4 border-black"
                    />
                    <button
                      className="border px-3 py-2 bg-black text-white rounded-md text-center"
                      type="submit"
                    >
                      Submit
                    </button>
                  </form>
                )}
                <div className="text-center py-8">
                  <p>Wlecome {session?.user?.name}</p>
                  <p>Here you can find your Posts</p>
                </div>
              </>
            ) : (
              <a
                href="/api/auth/signin"
                className="border px-3 py-2 bg-black text-white rounded-md text-center"
              >
                Login
              </a>
            )}
            <ul>
              {users?.map((user) => (
                <li
                  key={user.id}
                  onClick={() => handleDelete(user.id)}
                  className="cursor-pointer"
                >
                  {user.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
