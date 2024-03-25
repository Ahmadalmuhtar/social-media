"use server";

import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export const createComment = async (payload: CreateCommentPayload) => {
  try {
    await prisma.comment.create({
      data: {
        content: payload.content,
        postId: payload.postId,
        userEmail: payload.userEmail,
      },
    });
    revalidatePath("/posts");
  } catch (error) {
    console.log(error);
  }
};

export const getAllCommentsByPost = async (postId: number) => {
  try {
    return await prisma.comment.findMany({
      where: {
        postId,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
