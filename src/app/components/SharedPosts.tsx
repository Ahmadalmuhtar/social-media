"use client";

import { Like, Post, User, Comment } from "@prisma/client";
import Button from "./Button";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import { createComment } from "../server/comment-queries/queries";
import { createLike, dislikePostPerId } from "../server/like-queries/queries";
import { HeartIcon as HeartIconOutlined } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/16/solid";
import { motion } from "framer-motion";

export type SharedPostProps = {
  post: Post & {
    author?: User;
    comments?: Comment[];
    likes?: Like[];
  };
};

export function SharedPost({ post }: SharedPostProps) {
  const { data: session } = useSession();
  const [buttonText, setButtonText] = useState("");
  const [commentContent, setCommentContent] = useState("");
  const [comments, setComments] = useState<Comment[] | undefined>(
    post.comments,
  );

  const handleCreateComment = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const comment = await createComment({
        content: commentContent,
        postId: post.id,
        userEmail: session?.user?.email!,
      });
      setCommentContent("");
      if (comment && Array.isArray(comments)) {
        setComments([...comments, comment]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const hasUserLiked = !!post.likes?.find(
    (item) => item.userEmail === session?.user?.email,
  );

  const numberOfLikes = post.likes?.length;

  const handleLike = async () => {
    if (hasUserLiked) {
      await dislikePostPerId({
        postId: post.id,
        userEmail: session?.user?.email!,
      });
    } else {
      await createLike({
        postId: post.id,
        userEmail: session?.user?.email!,
      });
    }
  };

  return (
    <>
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center space-y-3 border">
        <div>{post.title}</div>
        <div className="flex items-center space-x-4">
          <img className="size-12 rounded-xl" src={post.author?.picture} />
          {post.author?.firstname}
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: post.content as TrustedHTML }}
        />
        <div className="flex items-center justify-center space-x-2">
          <form
            className="flex items-center space-x-3"
            onSubmit={handleCreateComment}
          >
            <label htmlFor="comment">Comment:</label>
            <textarea
              className="h-12 min-h-12 w-80 text-black ring-1"
              name="comment"
              id="comment"
              placeholder="Type a comment..."
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
            ></textarea>
            <Button text="Comment" type="submit" />
          </form>
        </div>
        <div className="flex items-center space-x-2">
          <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
            {hasUserLiked ? (
              <HeartIconSolid
                onClick={() => handleLike()}
                className="size-10 text-red-500"
              />
            ) : (
              <HeartIconOutlined
                onClick={() => handleLike()}
                className="size-10 text-red-500"
              />
            )}
          </motion.div>
          <div>{numberOfLikes}</div>
        </div>
        <div className="flex flex-col">
          {comments?.map((comment, index) => (
            <p key={index}>{comment?.content}</p>
          ))}
        </div>
      </div>
    </>
  );
}
