"use server";

import { Post, Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { CreatePostPayload, SharePostPayload } from "./types";
import prisma from "@/app/lib/prisma";

export async function createPost(
  payload: CreatePostPayload,
  authorEmail: string,
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

export async function getPosts() {
  const posts = await prisma.post.findMany({
    include: {
      comments: {
        include: {
          user: true,
        },
      },
      likes: true,
      author: true,
    },
  });
  return posts;
}

export async function getSharedPosts() {
  try {
    const posts = await prisma.post.findMany({
      where: {
        isShared: true,
      },
      include: {
        author: true,
        comments: true,
        likes: true,
      },
    });
    return posts;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting posts");
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

export async function sharePostById(payload: SharePostPayload) {
  await prisma.post.update({
    where: {
      id: payload.id,
    },
    data: {
      isShared: payload.isShared,
    },
  });
  revalidatePath("/posts");
}

export async function deletePostById(postId: number) {
  await prisma.post.delete({
    where: {
      id: postId,
    },
  });
  revalidatePath("/posts");
}