"use server";
import { Post } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { revalidatePath } from "next/cache";

export type CreateUserPayload = {
  name: string;
  email: string;
};
export type CreatePostPayload = {
  title: string;
  content: string | null;
  published: boolean;
};

export async function createPost(payload: CreatePostPayload) {
  try {
    const post = await prisma.post.create({
      data: {
        title: payload.title,
        content: payload.content,
        published: payload.published,
      },
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

export async function getPosts() {
  const posts = await prisma.post.findMany();
  return posts;
}

export async function getUserById(userId: number) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  return user;
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
  const user = await prisma.user.delete({
    where: {
      id: userId,
    },
  });
}

export async function deletePostById(postId: number) {
  await prisma.post.delete({
    where: {
      id: postId,
    },
  });
  revalidatePath("/posts");
}
