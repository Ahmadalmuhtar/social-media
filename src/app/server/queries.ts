"use server";
import { prisma } from "../lib/prisma";

export type CreateUserPayload = {
  name: string;
  email: string;
};

export async function createUser(payload: CreateUserPayload) {
  try {
    const user = await prisma.user.create({
      data: {
        name: payload.name,
        email: payload.email,
      },
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
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  return user;
}

export async function deleteUserById(userId: number) {
  const user = await prisma.user.delete({
    where: {
      id: userId,
    },
  });
}
