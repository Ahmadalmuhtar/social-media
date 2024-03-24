"use client";

import React from "react";
import Button from "../components/Button";
import { deleteUserById, getUsers } from "../server/user-queries/queries";
import { User } from "@prisma/client";

export default function Example() {
  const [users, setUsers] = React.useState<User[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const fetchedUsers = await getUsers();
      setUsers(fetchedUsers);
    };
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    await deleteUserById(id);
    const updatedUsers = await getUsers();
    setUsers(updatedUsers);
  };

  return (
    <>
      <div className="mt-8 flow-root px-16">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-600">
              <thead>
                <tr>
                  <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-0">
                    Username
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold ">
                    Email
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold ">
                    Firstname
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold ">
                    Lastname
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium  sm:pl-0">
                      {user.username}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm ">
                      {user.email}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm ">
                      {user.firstname}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm ">
                      {user.lastname}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm ">
                      <Button
                        variant="danger"
                        text="Delete"
                        onClick={() => handleDelete(user.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
