"use server";

import { prisma } from "@/app/lib/prisma";
import { Post } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { CreatePostPayload, SharePostPayload } from "./types";

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
  const posts = await prisma.post.findMany();
  return posts;
}

export async function getSharedPosts() {
  const posts = await prisma.post.findMany({
    where: {
      isShared: true,
    },
    include: {
      author: true,
    },
  });
  return posts;
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
