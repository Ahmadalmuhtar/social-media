"use server";
import { prisma } from "../../lib/prisma";
import { CreateUserPayload } from "./types";
export async function createUser(payload: CreateUserPayload) {
  try {
    await prisma.user.create({
      data: payload,
    });
  } catch (error) {
    console.error(error);
  }
}

export async function getUsers() {
  const users = await prisma.user.findMany();
  return users;
}

export async function getUserById(userId: number) {
  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    return user;
  } catch (error) {
    console.error("Error: ", error);
    throw new Error("Failed fetching the user with ID");
  }
}

export async function deleteUserById(userId: number) {
  await prisma.user.delete({
    where: {
      id: userId,
    },
  });
}
