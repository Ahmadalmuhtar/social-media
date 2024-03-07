"use client";

import { useEffect, useState } from "react";
import {
  CreateUserPayload,
  createUser,
  deleteUserById,
  getUsers,
} from "./server/queries";
import { User } from "@prisma/client";

export default function Home() {
  const [openAddForm, setOpenAddForm] = useState(false);
  const [users, setUsers] = useState<User[]>();
  const [stateChanged, setStateChanged] = useState(false);
  const [userData, setUserData] = useState<CreateUserPayload>({
    name: "",
    email: "",
  });

  const getAllUsers = async () => {
    const allUsers = await getUsers();
    setUsers(allUsers);
  };

  useEffect(() => {
    getAllUsers();
  }, [stateChanged]);

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    await createUser(userData);
    setUserData({ name: "", email: "" });
    setOpenAddForm(false);
    setStateChanged((prev) => !prev);
  };

  const handleDelete = async (id: number) => {
    await deleteUserById(id);
    setStateChanged((prev) => !prev);
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
          <>
            <button
              className="border border-spacing-3"
              onClick={() => setOpenAddForm((prev) => !prev)}
            >
              Add User
            </button>
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
          </>
        )}
      </div>
    </>
  );
}
