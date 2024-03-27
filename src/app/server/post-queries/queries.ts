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

// export async function getPosts() {
//   const posts = await prisma.post.findMany({
//     include: {
//       comments: {
//         include: {
//           user: true,
//           replies: {
//             include: {
//               user: true,
//             },
//           },
//         },
//       },
//       likes: true,
//       author: true,
//     },
//   });

//   // console.log("Posts: ", posts);
//   return posts;
// }

export async function getPosts() {
  // Define the maximum depth for replies
  const maxDepth = 10;

  // Dynamically construct the include object for replies
  function constructRepliesInclude(depth) {
    if (depth === 0) {
      return {
        user: true, // Assuming you want to include the user of the last level of replies
      };
    } else {
      return {
        user: true,
        replies: {
          include: constructRepliesInclude(depth - 1),
        },
      };
    }
  }

  // Construct the include object for comments, starting the recursion
  const commentsInclude = {
    user: true,
    replies: {
      include: constructRepliesInclude(maxDepth),
    },
  };

  // Use the constructed include object in the main query
  const posts = await prisma.post.findMany({
    include: {
      comments: {
        include: commentsInclude,
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
