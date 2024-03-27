import prisma from "@/app/lib/prisma";
import { CreateReplyOnACommentPayload } from "./types";

export const createReplyOnAComment = async (
  payload: CreateReplyOnACommentPayload,
) => {
  await prisma.comment.create({
    data: payload,
  });
};
