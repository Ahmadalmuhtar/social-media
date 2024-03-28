"use server";

import { Post } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { CreatePostPayload, FullComment, SharePostPayload } from "./types";
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

export async function fetchCommentWithReplies(commentId: number) {
  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
    include: {
      user: true, // Include the user who made the comment
      replies: true, // Include immediate replies only
    },
  });

  // If the comment has replies, recursively fetch their replies
  if (comment?.replies && comment.replies.length > 0) {
    for (let i = 0; i < comment.replies.length; i++) {
      // Recursively fetch replies for each reply
      comment.replies[i] = await fetchCommentWithReplies(comment.replies[i].id);
    }
  }

  return comment;
}

// This function fetches all posts along with their comments, but uses
// the fetchCommentWithReplies function to recursively fetch replies for each comment
export async function getPosts() {
  const posts = await prisma.post.findMany({
    include: {
      comments: true, // Initially, include only top-level comments
      likes: true,
      author: true,
    },
  });

  // Iterate over each post to fetch comments with their nested replies
  for (const post of posts) {
    if (post.comments && post.comments.length > 0) {
      for (let i = 0; i < post.comments.length; i++) {
        // Replace each top-level comment with its detailed version, including nested replies
        post.comments[i] = await fetchCommentWithReplies(post.comments[i].id);
      }
    }
  }

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
