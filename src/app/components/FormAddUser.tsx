"use client";

import { useEffect, useState } from "react";
import { createUser } from "../server/user-queries/queries";
import Button from "./Button";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  username: z.string().min(5),
  email: z.string().email(),
  password: z.string().min(8),
  firstname: z.string(),
  lastname: z.string(),
});

type UserFormFields = z.infer<typeof schema>;

export default function AddUserForm() {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { isSubmitting, errors, isSubmitSuccessful },
  } = useForm<UserFormFields>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const handleAddUser: SubmitHandler<UserFormFields> = async (data) => {
    try {
      await createUser(data);
    } catch (error) {
      setError("root", { message: "Please fill the fields" });
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(handleAddUser)}
        className="mx-auto flex max-w-2xl flex-col items-center justify-center space-x-3 space-y-6 rounded-lg ring-1"
      >
        <div>
          <label htmlFor="username">User name</label>
          <input
            {...register("username")}
            id="userName"
            placeholder="Enter a new username"
            className="m-2 border"
            type="text"
          />
        </div>
        {errors.username && (
          <div className="text-sm text-red-400 opacity-95">
            {errors.username.message}
          </div>
        )}
        <div>
          <label htmlFor="email">Email address</label>
          <input
            {...register("email")}
            id="email"
            placeholder="Enter your Email"
            className="m-2 border"
            type="text"
          />
        </div>
        {errors.email && (
          <div className="text-sm text-red-400 opacity-95">
            {errors.email.message}
          </div>
        )}
        <div>
          <label htmlFor="password">password</label>
          <input
            {...register("password")}
            id="password"
            placeholder="Enter your password"
            className="m-2 border"
            type="password"
          />
        </div>
        {errors.password && (
          <div className="text-sm text-red-400 opacity-95">
            {errors.password.message}
          </div>
        )}
        <div>
          <label htmlFor="firstname">firstname</label>
          <input
            {...register("firstname")}
            id="firstname"
            placeholder="Enter your firstname"
            className="m-2 border"
            type="text"
          />
        </div>
        <div>
          <label htmlFor="lastname">lastname</label>
          <input
            {...register("lastname")}
            id="lastname"
            placeholder="Enter your lastname"
            className="m-2 border"
            type="text"
          />
        </div>
        <div>
          <Button
            type="submit"
            text={isSubmitting ? "Loading..." : "Add user"}
          />
        </div>
        {errors.root && (
          <div className="text-red-300 placeholder-opacity-85">
            {errors.root.message}
          </div>
        )}
      </form>
    </>
  );
}
