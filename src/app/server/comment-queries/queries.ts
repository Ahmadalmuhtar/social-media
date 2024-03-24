import { prisma } from "@/app/lib/prisma";

export const createComment = async (payload: createCommentPayload) => {
  try {
    await prisma.comment.create({
      data: {
        content: payload.content,
        postId: payload.postId,
        userEmail: payload.userEmail,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
