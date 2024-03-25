"use server";

import prisma from "@/app/lib/prisma";
import { CreateLikePayload } from "./types";
import { revalidatePath } from "next/cache";

export async function allLikes() {
  return await prisma.like.count({});
}

export async function createLike(payload: CreateLikePayload) {
  try {
    await prisma.like.create({
      data: {
        postId: payload.postId,
        userEmail: payload.userEmail,
      },
    });
    revalidatePath("/feeds");
  } catch (error) {
    console.log(error);
  }
}

export async function getLikesCountPerPost(postId: number) {
  try {
    return await prisma.like.count({
      where: {
        postId,
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export async function dislikePostPerId(payload: CreateLikePayload) {
  try {
    await prisma.like.delete({
      where: {
        likeId: {
          postId: payload.postId,
          userEmail: payload.userEmail,
        },
      },
    });
    revalidatePath("/feeds");
  } catch (error) {
    console.log(error);
  }
}
