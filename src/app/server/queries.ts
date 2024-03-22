"use server";
import { Post, User } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { revalidatePath } from "next/cache";

export type CreateUserPayload = {
  username: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
};
export type CreatePostPayload = {
  title: string;
  content: string | null;
};

export async function createPost(
  payload: CreatePostPayload,
  authorEmail: string
) {
  try {
    const post = await prisma.post.create({
      data: { ...payload, author: { connect: { email: authorEmail } } },
    });
    revalidatePath("/posts");
    return post;
  } catch (error) {
    console.error(error);
  }
}

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

export async function getPosts() {
  const posts = await prisma.post.findMany();
  return posts;
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

export async function getPostById(postId: number): Promise<Post | null> {
  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });
    if (!post) {
      return null;
    }
    return post;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function deleteUserById(userId: number) {
  try {
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });
    revalidatePath("/users");
  } catch (error) {
    console.log(error);
  }
}

export async function deletePostById(postId: number) {
  try {
    await prisma.post.delete({
      where: {
        id: postId,
      },
    });
    revalidatePath("/posts");
  } catch (error) {
    console.log(error);
  }
}
