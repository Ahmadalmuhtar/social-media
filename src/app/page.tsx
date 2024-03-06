"use client";

import { useState } from "react";
import { prisma } from "./lib/prisma";
import { getUserById, getUsers } from "./server/queries";

export default function Home() {
  const [openAddForm, setOpenAddForm] = useState(false);
  const [user, setUser] = useState({});
  console.log(openAddForm);
  return (
    <>
      <div className="flex py-24 justify-center">
        <button
          className="border border-spacing-3"
          onClick={() => setOpenAddForm((prev) => !prev)}
        >
          Add User
        </button>
      </div>
      <li>{}</li>
    </>
  );
}
