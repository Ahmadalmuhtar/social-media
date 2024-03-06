"use client";

import { useState } from "react";
import { prisma } from "./lib/prisma";
import { getUserById, getUsers } from "./server/queries";

export default function Home() {
  const [openAddForm, setOpenAddForm] = useState(false);
  const [userName, setUserName] = useState({});
  const [userEmail, setUserEmail] = useState({});
  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <>
      <div className="flex py-24 justify-center">
        {openAddForm === true ? (
          <form
            onSubmit={handleAddUser}
            className="grid grid-cols-2 space-x-10"
          >
            <button className="border border-spacing-3" type="submit">
              Add user
            </button>
            <label>
              User name:
              <input
                onChange={(e) => setUserName(e.target.value)}
                type="text"
              />
            </label>
            <label>
              Emailaddress:
              <input
                onChange={(e) => setUserEmail(e.target.value)}
                type="text"
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
          <button
            className="border border-spacing-3"
            onClick={() => setOpenAddForm((prev) => !prev)}
          >
            Add User
          </button>
        )}
      </div>
    </>
  );
}
