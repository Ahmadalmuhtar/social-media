import React from "react";
import { getUsers } from "../server/queries";
import UsersTable from "../components/UsersTable";

export default async function Page() {
  const users = await getUsers();

  return (
    <>
      <UsersTable users={users} />
    </>
  );
}
