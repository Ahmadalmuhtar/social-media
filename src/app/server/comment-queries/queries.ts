"use server";

import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
import { CreateCommentPayload, DeleteCommentPayload } from "./types";

export const createComment = async (payload: CreateCommentPayload) => {
  try {
    await prisma.comment.create({
      data: payload,
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

export const deleteCommentById = async (payload: DeleteCommentPayload) => {
  try {
    await prisma.comment.delete({
      where: {
        id: Number(payload.commentId),
        userEmail: payload.userEmail,
      },
    });
    revalidatePath("/feeds");
  } catch (error) {
    console.log(error);
  }
};
