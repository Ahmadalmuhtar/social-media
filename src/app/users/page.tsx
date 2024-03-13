import React from "react";
import { getUsers } from "../server/queries";
import Link from "next/link";
import Button from "../components/Button";

const Users = async () => {
  const users = await getUsers();
  return (
    <>
      <Link href="/" passHref>
        <Button text="Home" />
      </Link>
      <div className="text-center py-24">
        {users.map((user) => (
          <Link href={`/users/${user.id}`}>
            <p>{user.name}</p>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Users;
