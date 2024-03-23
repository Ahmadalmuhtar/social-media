"use server";

import { prisma } from "@/app/lib/prisma";
import { CreateLikePayload } from "./types";

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

export async function checkIfUserLiked(payload: CreateLikePayload) {
  try {
    const like = await prisma.like.findFirst({
      where: {
        postId: payload.postId,
        userEmail: payload.userEmail,
      },
    });
    if (like) {
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
  }
}

export async function dislikePostPerId(payload: CreateLikePayload) {
  try {
    return await prisma.like.delete({
      where: {
        likeId: {
          postId: payload.postId,
          userEmail: payload.userEmail,
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
}
