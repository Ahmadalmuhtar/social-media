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

type PostCardProps = {
  post: Post & {
    author?: User;
    comments?: Array<Comment & { user: User }>;
    likes?: Like[];
  };
};

export function PostCard({ post }: PostCardProps) {
  const [showComments, setShowComments] = useState(true);

  const handleShare = async (payload: SharePostPayload) => {
    await sharePostById(payload);
  };

  return (
    <div className="flex size-96 flex-col justify-around rounded-md px-4 ring-1 ring-gray-300">
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
      <div className="flex justify-between ">
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
        <button className="flex justify-center space-x-1 py-2 text-gray-900 hover:bg-gray-200 hover:opacity-75">
          <HandThumbUpIcon className="size-6 " />
          <p>Like</p>
        </button>
        <button className="flex justify-center space-x-1 py-2 text-gray-900 hover:bg-gray-200 hover:opacity-75">
          <ChatBubbleOvalLeftEllipsisIcon className="size-6 " />
          <p>Comments</p>
        </button>
        <button className="flex justify-center space-x-1 py-2 text-gray-900 hover:bg-gray-200 hover:opacity-75">
          <ShareIcon className="size-6 " />
          <p>Share</p>
        </button>
      </div>
      {showComments &&
        post.comments?.map((comment) => (
          <div className="flex items-center space-x-2">
            <img className="size-8 rounded-full" src={comment.user.picture} />
            <div className="flex size-fit flex-col rounded-lg bg-gray-300 p-2">
              <p className="text-sm font-semibold">{comment.user?.firstname}</p>
              <p key={comment?.id!}>{comment?.content}</p>
            </div>
          </div>
        ))}
    </div>
  );
}
