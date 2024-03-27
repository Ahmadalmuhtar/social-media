"use client";

import Link from "next/link";
import { Like, Post, User, Comment } from "@prisma/client";
import { SharePostPayload } from "../server/post-queries/types";
import { sharePostById } from "../server/post-queries/queries";
import moment from "moment";
import {
  ChatBubbleOvalLeftEllipsisIcon,
  HandThumbUpIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { createComment } from "../server/comment-queries/queries";
import { useSession } from "next-auth/react";
import { createLike, dislikePostPerId } from "../server/like-queries/queries";
import { HandThumbDownIcon } from "@heroicons/react/24/outline";
import CommentsSection from "./CommentsSection";

type PostCardProps = {
  post: Post & {
    author?: User;
    comments?: Array<
      Comment & { user: User; replies: Array<Comment & { user: User }> }
    >;
    likes?: Array<Like & { user: User }>;
  };
};

export function PostCard({ post }: PostCardProps) {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");

  const { data: session } = useSession();

  const mainComments = post.comments?.filter((item) => !item.parentId);

  const hasUserLiked = !!post.likes?.find(
    (item) => item.userEmail === session?.user?.email,
  );

  const handleShare = async (payload: SharePostPayload) => {
    await sharePostById(payload);
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    await createComment({
      content: newComment,
      postId: post.id,
      userEmail: session?.user?.email!,
    });
    setNewComment("");
  };

  const handleLike = async () => {
    try {
      if (!hasUserLiked)
        await createLike({
          postId: post.id,
          userEmail: session?.user?.email!,
        });
      else {
        await dislikePostPerId({
          postId: post.id,
          userEmail: session?.user?.email!,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-fit w-96 flex-col justify-around rounded-md bg-white px-4 py-3 ring-1 ring-gray-300">
      <div className="flex flex-col space-y-3">
        <div className="flex items-center space-x-4">
          <div className="m-2 flex justify-center space-x-2 text-xs">
            <img className="size-14 rounded-full" src={post.author?.picture} />
            <div className="flex flex-col justify-center">
              <Link href={`/posts/${post.id}`} passHref>
                <p className="font-semibold">{post.title}</p>
              </Link>
              <p>
                {post.author?.username}. {moment(post.createdAt).fromNow()}
              </p>
            </div>
          </div>
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: post.content as TrustedHTML,
          }}
          className="text-left text-lg"
        />
        <div
          onClick={() => setShowComments((prev) => !prev)}
          className="flex justify-between "
        >
          <p className="text-sm font-semibold text-gray-600">
            {post.likes?.length}
            {post.likes && post.likes?.length < 2 ? " like" : " likes"}
          </p>
          <p className="text-sm font-semibold text-gray-600">
            {post.comments?.length}
            {post.comments && post.comments?.length < 2
              ? " comment"
              : " comments"}
          </p>
        </div>
        <div className="grid grid-cols-3 rounded-sm border-b border-t border-gray-300">
          {!hasUserLiked ? (
            <button
              onClick={handleLike}
              className="flex justify-center space-x-1 py-2 text-gray-900 hover:rounded-md hover:bg-gray-200 hover:opacity-75 active:scale-95"
            >
              <HandThumbUpIcon className="size-6 " />
              <p>Like</p>
            </button>
          ) : (
            <button
              onClick={handleLike}
              className="flex justify-center space-x-1 py-2 text-gray-900 hover:rounded-md hover:bg-gray-200 hover:opacity-75 active:scale-95 "
            >
              <HandThumbDownIcon className="size-6 " />
              <p>Dislike</p>
            </button>
          )}

          <button
            onClick={() => setShowComments((prev) => !prev)}
            className="flex justify-center space-x-1 py-2 text-gray-900 hover:rounded-md hover:bg-gray-200 hover:opacity-75 active:scale-95"
          >
            <ChatBubbleOvalLeftEllipsisIcon className="size-6 " />
            <p>Comments</p>
          </button>
          <button
            onClick={() =>
              handleShare({ id: post.id, isShared: !post.isShared })
            }
            className="flex justify-center space-x-1 py-2 text-gray-900 hover:rounded-md hover:bg-gray-200 hover:opacity-75 active:scale-95"
          >
            <ShareIcon className="size-6 " />
            <p>Share</p>
          </button>
        </div>
        {showComments && (
          <div className="flex flex-col space-y-4">
            {mainComments?.map((comment) => (
              <div className="m-2">
                <CommentsSection
                  key={comment.id}
                  post={post}
                  comment={comment}
                />
              </div>
            ))}
            <form
              className="flex justify-center space-x-2 pl-10"
              onSubmit={handleAddComment}
            >
              <textarea
                className="min-h-12"
                placeholder="Add your comment..."
                onChange={(e) => setNewComment(e.target.value)}
                value={newComment}
              />
              <button type="submit">submit</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
