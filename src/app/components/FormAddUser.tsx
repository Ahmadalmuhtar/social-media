import { useState } from "react";
import { CreateUserPayload, createUser } from "../server/queries";
import Button from "./Button";

type FormProps = {};

export default function AddUserForm() {
  const [userData, setUserData] = useState<CreateUserPayload>({
    name: "",
    email: "",
  });

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    await createUser(userData);
    setUserData({ name: "", email: "" });
  };

  return (
    <>
      <form onSubmit={handleAddUser} className="flex flex-col space-y-6">
        <div>
          <label htmlFor="userName">User name:</label>
          <input
            id="userName"
            placeholder="Enter a new username"
            className="border m-2"
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, name: e.target.value }))
            }
            type="text"
          />
        </div>
        <div>
          <label htmlFor="email">Email address:</label>
          <input
            id="email"
            placeholder="Enter your Email"
            className="border m-2"
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, email: e.target.value }))
            }
            type="email"
          />
        </div>
        <Button type="submit" text="Add user" />
      </form>
    </>
  );
}
