"use client";

import Link from "next/link";
import Button from "./Button";
import { Post } from "@prisma/client";
import { useState } from "react";
import { SharePostPayload, sharePostById } from "../server/queries";
import { isSharedArrayBuffer } from "util/types";

type PostCardProps = {
  post: Post;
};

export function PostCard({ post }: PostCardProps) {
  const handleShare = async (payload: SharePostPayload) => {
    await sharePostById(payload);
  };

  return (
    <div className="size-96 border ring-indigo-600 ring-2 flex flex-col justify-around">
      <div className="flex justify-center text-2xl">{post.title}</div>
      <hr className="max-w-full" />
      <div
        dangerouslySetInnerHTML={{
          __html: post.content as TrustedHTML,
        }}
        className="text-left"
      />
      <div className="flex justify-around">
        <Link href={`/posts/${post.id}`} passHref>
          <Button text="show post" />
        </Link>
        <Button
          text={post.isShared ? "unshare" : "share"}
          onClick={() => handleShare({ id: post.id, isShared: !post.isShared })}
        />
      </div>
    </div>
  );
}
